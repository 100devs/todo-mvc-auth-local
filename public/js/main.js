const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const dateSelector = document.querySelectorAll('li.day')
const hamburgerBtn = document.querySelector('.nav--hambrgBtn')


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

//hamburgerBtn.addEventListener('click', toggleNavBar)

async function toggleNavBar() {
    let header = document.querySelector('.header')
    let navList = document.querySelector('.nav--list')

    header.classList.toggle('expanded')
    navList.classList.toggle('unhide')

}

async function deleteTodo(id){
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                //passing id to make sure it deletes the task with same id
                'todoIdFromJSFile': id
            })
        })
        const data = await response.json()
        // console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}



class Calendar {
    constructor() {
        // Keeps track of day, month, year
        // Starting date is now
        const today = new Date(Date.now());
        this.day = today.getDate(); // JS Date represents days as 1-31
        this.month = today.getMonth(); // Represents months from 0-11 (Jan-Dec)
        this.year = today.getFullYear(); // Represents years as four digit years (2022)

        // Info Elements
        this.taskList = document.querySelector(".taskList");

        // Calendar Elements
        this.daysContainer = document.querySelector("#days");
        this.days = [];

        // Initialize calendar functionality
        // Add event listener to year form

        // Add event listener to month list
        this.monthSelector = document.querySelectorAll('.months li a');
        this.activate_month_selector();

        // Render calendar
        this.render_calendar();
    }  

    /*
        Creates the calendar section with the correct starting day and days in the month
        Called on calendar initialization and when a new month is selected
        If we added year selection, that would also call this function
    */
    render_calendar() {
        // Clear calendar days
        while(this.daysContainer.firstChild) {
            this.daysContainer.removeChild(this.daysContainer.firstChild);
        }
        this.days = [];

        // Calc first day of month
        let firstDay = new Date(this.year, this.month, 1) // Using 1 since we always want first day of month
        firstDay = firstDay.getDay(); // getDay() returns the day of the week Sun-Sat (0-6)

        // Since our calendar is Mon-Sun, need to subtract one to get correct starting day. Sunday needs to be set to 6, since it is 0 by default and subtracting 1 just makes it -1
        firstDay = (firstDay-1 < 0) ? 6 : firstDay-1;

        // Calc days in month
        // https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
        let daysInMonth = new Date(this.year, this.month+1, 0); // Gets a date that is set to the last day of the current month
        daysInMonth = daysInMonth.getDate();

        // Add offset lis to list
        // Offset lis are lis containing an anchor that is disabled (no pointer events), so that the month starts at the proper day
        // I tried adding empty lis, but they didnt affect anything. Needed content
        for(let i = 0; i < firstDay; ++i) {
            const offsetLi = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.classList.add("disabled");
            offsetLi.appendChild(anchor);
            this.daysContainer.appendChild(offsetLi);
        }

        // Add days to list
        for(let i = 1; i <= daysInMonth; ++i) {
            const dayLi = document.createElement("li");
            dayLi.classList.add("day");

            const a = document.createElement("a");
            a.dataset.value = i;
            a.title = i;
            a.innerText = i;

            dayLi.appendChild(a);

            this.daysContainer.appendChild(dayLi);
            this.days.push(a);
        }

        // Add select class to current day
        this.daysContainer.querySelector(`a[data-value="${this.day}"]`).classList.add("selected")

        // Actiate days
        this.activate_day_selector(); // Add event listeners to all day anchors
        this.render_day(); // Changes the info bar to current selected day
    }

    /*
        Add event listeners to each month button
    */
    activate_month_selector() {
        Array.from(this.monthSelector).forEach( (el)=> el.addEventListener('click', this.select_month.bind(this)) );
        // Note: Need to bind this to select_month since, by default, this refers to the event target. Since select_month can access this with event.target, this is not required. We want this to refer to the object, so it can still access the object properties and methods
    }

    /*
        Changes the displayed month when user clicks a different month
    */
    select_month(event) {
        // Get numeric month 
        let selectedMonth = event.target.getAttribute('title');
        selectedMonth = convert_month_to_num(selectedMonth);
        // If the user selects the current month, do nothing
        if(selectedMonth == this.month) return;

        // Save numeric month in object
        this.month = selectedMonth;

        // Clear selected class from previosuly selected month
        const months = document.getElementById('months').childNodes
        for(let i = 0; i<months.length; i++){
            if(months[i].firstChild){
            months[i].firstChild.classList.remove('selected')
            }
        }
        // Add selected class to selected month
        event.target.className= 'selected'


        // Re-render calendar with new info
        this.render_calendar();
    }

    /*
        Add event listeners to all day anchors. Want day anchors over the li since the anchors are what give hover feedback.
    */
    activate_day_selector() {
        console.log(this.days);
        this.days.forEach(x => x.addEventListener("click", this.change_day.bind(this)));
    }

    /*
        Changes tracked day in object to newly selected day, makes newly selected day appear selected, calls function to render day information section
    */
    change_day(event) {
        const selectedDay = event.target.dataset.value; // Get selected day

        if(selectedDay == this.day) {return;} // Dont do anything if the current day is reselected

        this.day = selectedDay;

        // Remove selected class from all days
        const days = document.getElementById('days').childNodes
        for(let i = 0; i<days.length; i++){
            if(days[i].firstChild){      
            days[i].firstChild.classList.remove('selected')}    
        }
        // Add selected to selected day
        event.target.classList.add("selected");

        // Now, render day info
        this.render_day();
    }

    /*
        Populates the calendar sidebar with selected date and tasks for that day
    */
    async render_day() {
        const selectedDate = new Date(this.year, this.month, this.day); // Get Date object for current object's tracked day
        // Change the day header (Monday-Sunday)
        document.querySelector(".selected-day").innerText = get_day(selectedDate.getDay());

        // Change the month and day header to currently selected month and day
        document.querySelector(".month-day").innerText = `${get_month(this.month)} ${this.day}`

        // Clear tasks from task list
        while(this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }

        // Get tasks
        const res = await fetch(`/todos/${this.month}/${this.day}`);
        const data = await res.json();

        // Append tasks to task list
        if(data.length == 0) { // If there are no tasks to display, add li saying that
            const item = document.createElement("li");
            item.innerText = "No tasks to display";
            this.taskList.appendChild(item);
        }
        else
        { // Tasks to display:
            data.forEach( x => {
                const li = document.createElement("li");
                li.classList.add("todoItem");
                li.dataset.id = x._id;

                li.innerHTML = `<span class="filteredTasks">${x.task}</span>
                                <a href="#" title="Remove note" class="removeNote animate del" onclick="deleteTodo(this.parentNode.dataset.id)">x</a>`

                // If start and end time are defined, add them
                if(x.startTime != undefined && x.endTime != undefined) {
                    li.innerHTML += `<span style="display: block">${x.startTime} - ${x.endTime}</span>`
                }

                this.taskList.appendChild(li);
            });
        }

        // Add proper dates to form
        document.querySelector(".dbDay").value = this.day; // Currently save js numeric day and month, not sure if thats what we want or not.
        document.querySelector(".dbMonth").value = this.month;
    }
}

// Class helpers
function convert_month_to_num(month) {
    month = month.toLowerCase(); // Convert 3 char month code to all lower case
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    return months.indexOf(month); // Return its index in the array (0-11)
}

// Gets the name of the day of the week from the js Date numeric representation (0 for Sunday to 6 for Saturday)
function get_day(numericDay) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[numericDay];
}

// Gets the name of the month from the js Date numeric representation (0 for January to 11 for December)
function get_month(numericMonth) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[numericMonth];
}



// Start calendar
const cal = new Calendar;
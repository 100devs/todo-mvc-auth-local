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

        this.daysContainer = document.querySelector("#days");
        this.days = [];

        // Info Elements
        this.taskList = document.querySelector(".taskList");

        // Calendar Elements

        // Initialize calendar functionality
        // Add event listener to year form

        // Add event listener to month list
        this.monthSelector = document.querySelectorAll('.months li a');
        this.activate_month_selector();

        // Render calendar
        this.render_calendar();

        this.daysContainer.querySelector(`a[data-value="${this.day}"]`).classList.add("selected")
    }  

    render_calendar() {
        // Clear calendar
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

        console.log(daysInMonth);

        // Add offset lis to list
        // Offset lis are lis containing an anchor that is disabled (no pointer events), so that the month starts at the proper day
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

        // Actiate days
        this.activate_day_selector();
        this.render_day();
    }

    activate_month_selector() {
        Array.from(this.monthSelector).forEach( (el)=> el.addEventListener('click', this.select_month.bind(this)) );
    }

    select_month(event) {
        const months = document.getElementById('months').childNodes
        for(let i = 0; i<months.length; i++){
            if(months[i].firstChild){
            months[i].firstChild.classList.remove('selected')
            }
        }
        const selectedMonth = event.target.getAttribute('title')
        event.target.className= 'selected'

        this.month = convert_month_to_num(selectedMonth);

        // Re-render calendar
        this.render_calendar();
    }

    activate_day_selector() {
        console.log(this.days);
        this.days.forEach(x => x.addEventListener("click", this.change_day.bind(this)));
    }

    change_day(event) {
        const selectedDay = event.target.dataset.value;
        this.day = selectedDay;

        const days = document.getElementById('days').childNodes
        for(let i = 0; i<days.length; i++){
            if(days[i].firstChild){      
            days[i].firstChild.classList.remove('selected')}    
        }
        event.target.classList.add("selected");

        // Now, render day info
        this.render_day();
    }

    async render_day() {
        // Change up header
        const today = new Date(this.year, this.month, this.day);
        document.querySelector(".todays-day").innerText = get_day(today.getDay());

        document.querySelector(".month-day").innerText = `${get_month(this.month)} ${this.day}`

        // Clear tasks from task list
        while(this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }

        // Get tasks
        const res = await fetch(`/todos/${this.month}/${this.day}`);
        const data = await res.json();

        // Append tasks to task list
        if(data.length == 0) {
            const item = document.createElement("li");
            item.innerText = "No tasks to display";
            this.taskList.appendChild(item);
        }
        else
        {
            data.forEach( x => {
                const li = document.createElement("li");
                li.classList.add("todoItem");
                li.dataset.id = x._id;

                li.innerHTML = `<span class="filteredTasks">${x.task}</span>
                                <a href="#" title="Remove note" class="removeNote animate del" onclick="deleteTodo(this.parentNode.dataset.id)">x</a>`

                if(x.startTime != undefined) {
                    li.innerHtml += `<span style="display: block">${x.startTime} - ${x.endTime}</span>`
                }

                this.taskList.appendChild(li);
            });
        }

        // Add proper dates to form
        document.querySelector(".dbDay").value = this.day;
        document.querySelector(".dbMonth").value = this.month;
    }
}

// Class helpers
function convert_month_to_num(month) {
    month = month.toLowerCase(); // Convert 3 char month code to all lower case
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    return months.indexOf(month); // Return its index in the array (0-11)
}

function get_day(numericDay) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[numericDay];
}

function get_month(numericMonth) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[numericMonth];
}



// Start calendar
const cal = new Calendar;
// const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const dateSelector = document.querySelectorAll('li.day')
const monthSelector = document.querySelectorAll('.months li a')


// Array.from(deleteBtn).forEach((el)=>{
//     el.addEventListener('click', deleteTodo)
// })

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(dateSelector).forEach((el)=>{
    el.addEventListener('click', selectDay)
})

Array.from(monthSelector).forEach((el)=>{
    el.addEventListener('click', selectMonth)
})


async function selectDay(){
    //calls clearDay function
    clearDay()
    const days = document.getElementById('days').childNodes
    for(let i = 1; i<days.length-1; i++){
        if(days[i].firstChild){      
            days[i].firstChild.classList.remove('selected')}    
        }
        const selectedDay = this.firstChild.getAttribute('data-value')
        this.firstChild.className = 'selected'
        //add the selected day number to the ejs
        document.querySelector(".day").innerHTML = `${selectedDay}`
        //adds the selected day to the hidden input
        document.querySelector(".dbDay").value = `${selectedDay}`
        //calls getTodosByDate function
        getTodosByDate()
}

async function selectMonth(){
    //calls clearMonth function
    clearMonth()
    const months = document.getElementById('months').childNodes
    for(let i = 0; i<months.length; i++){
        if(months[i].firstChild){
            months[i].firstChild.classList.remove('selected')
        }
    }
    const selectedMonth = this.getAttribute('title')
    //adds the selected month to ejs
    document.querySelector(".month").innerHTML = `${selectedMonth}`
    //it the innerText in the ejs matches the title of the month it becomes selected
    //only thing is the month isnt selected untill the user clicks on month
    if(document.querySelector(".month").innerText.toLowerCase() === this.getAttribute("title").toLowerCase()){
        this.className = 'selected'
    }
    //adds selectedMonth to hidden month input form
    document.querySelector(".dbMonth").value = `${selectedMonth}`
    //calls getTodosByDate function
    getTodosByDate()
}

//later function adds tasks, calls delete todo and passes in the task id from db
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

//so everytime the user changes day and month this function gets called
const getTodosByDate = async (month, day) => {
    //calls clearTasks function
    clearTasks()
    //sets month passed in to hidden input value
    month = document.querySelector(".dbMonth").value
    //sets day passed in to hidden input value
    day = document.querySelector(".dbDay").value

    //fetches all tasks from /todos/oct/10 for example
    //in the backend I made this get route that sends back json
    const url = `http://localhost:2121/todos/${month}/${day}`
    // console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    //if there are tasks for that day we map throught the data and call filteredTasks with the induvidual task as the parameter
    if(data.length > 0){
        data.map(task => {
            filteredTasks(task)
        })
        //if there isnt any data we call clearTask function to remove the tasks from the previous day
    } else {
        clearTasks()
    }
    
}
//call getTodosByDate to get the current day tasks on load
getTodosByDate()

//this functin creates li elements depending on how many there are
const filteredTasks = (task) => {
    const li = document.createElement("li")
    //the a tag is the delete button and onclick it calls deleteTodo and passes in the unique task id as parameter
    li.innerHTML = `
    <li class='todoItem' data-id=${task._id}>
    <span class="filteredTasks">${task.task}</span>
    <a href="#" title="Remove note" class="removeNote animate del" onclick="deleteTodo(this.parentNode.dataset.id)">x</a>
    <span style="display: block">${task.startTime} - ${task.endTime}</span>
    </li>
    `
        document.querySelector(".taskContainer").appendChild(li)
   
}

//these clear function just remove anything appended before displaying the new stuff 
//without them we would just keep adding stuff to the dom
function clearDay() {
    const day = document.querySelector(".day");
    while (day.firstChild) {
      day.removeChild(day.firstChild);
    }
}

function clearMonth() {
    const month = document.querySelector(".month");
    while (month.firstChild) {
      month.removeChild(month.firstChild);
    }
}

function clearTasks() {
    const taskContainer = document.querySelector(".taskContainer");
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
}
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
    clearDay()
    const days = document.getElementById('days').childNodes
    for(let i = 1; i<days.length-1; i++){
        if(days[i].firstChild){      
            days[i].firstChild.classList.remove('selected')}    
        }
        const selectedDay = this.firstChild.getAttribute('data-value')
        this.firstChild.className = 'selected'
        document.querySelector(".day").innerHTML = `${selectedDay}`
        document.querySelector(".dbDay").value = `${selectedDay}`
        getTodosByDate()
}

async function selectMonth(){
    clearMonth()
    const months = document.getElementById('months').childNodes
    for(let i = 0; i<months.length; i++){
        if(months[i].firstChild){
            months[i].firstChild.classList.remove('selected')
        }
    }
    const selectedMonth = this.getAttribute('title')
    document.querySelector(".month").innerHTML = `${selectedMonth}`
    if(document.querySelector(".month").innerText.toLowerCase() === this.getAttribute("title").toLowerCase()){
        this.className = 'selected'
    }
    document.querySelector(".dbMonth").value = `${selectedMonth}`
    getTodosByDate()
}

async function deleteTodo(id){
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': id
            })
        })
        const data = await response.json()
        console.log(data)
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

const getTodosByDate = async (month, day) => {
    clearTasks()
    month = document.querySelector(".dbMonth").value
    day = document.querySelector(".dbDay").value

    const url = `http://localhost:2121/todos/${month}/${day}`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    if(data.length > 0){
        data.map(task => {
            filteredTasks(task)
        })
    } else {
        clearTasks()
    }
    
}
getTodosByDate()

const filteredTasks = (task) => {
    const li = document.createElement("li")
    li.innerHTML = `
    <li class='todoItem' data-id=${task._id}>
    <span class="filteredTasks">${task.task}</span>
    <a href="#" title="Remove note" class="removeNote animate del" onclick="deleteTodo(this.parentNode.dataset.id)">x</a>
    <span style="display: block">${task.startTime} - ${task.endTime}</span>
    </li>
    `
        document.querySelector(".taskContainer").appendChild(li)
   
}

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
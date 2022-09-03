const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const dateSelector = document.querySelectorAll('li.day')
const monthSelector = document.querySelectorAll('.months li a')


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

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
    const days = document.getElementById('days').childNodes
    for(let i = 0; i<days.length; i++){
        if(days[i].firstChild){
        days[i].firstChild.classList.remove('selected')
        }
    }
    const selectedDay = this.firstChild.getAttribute('data-value')
    this.firstChild.className = 'selected'

}
async function selectMonth(){
    const months = document.getElementById('months').childNodes
    for(let i = 0; i<months.length; i++){
        if(months[i].firstChild){
        months[i].firstChild.classList.remove('selected')
        }
    }
    const selectedMonth = this.getAttribute('title')
    console.log(selectedMonth)
    this.className= 'selected'
}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
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



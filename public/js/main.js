const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteShow)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteShow(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteShow', {
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

const showSummary = document.getElementsByClassName('showTitle')

Array.from(showSummary).forEach((el)=>{
    el.addEventListener('click', showBio)
})


function showBio(click){
    
    const showName = this.parentNode.dataset.id
    console.log(showName)
    click.target.classList.contains(`${showName}img`)
	document.getElementById(`${showName}img`).classList.toggle('hidden')
    document.getElementById(`${showName}sum`).classList.toggle('hidden')
    
    
}

// function showSumm(click){
//     const showName = this.parentNode.dataset.id
//     console.log(showName)
//     click.target.classList.contains(`${showName}sum`)
// 	document.getElementById(`${showName}sum`).classList.toggle('hidden')
    
// }


// toggle mobile menu

const toggle = document.querySelector('.toggle')
const menu = document.querySelector('.menu')
 
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active")
        //adds menu icon
        toggle.querySelector("a").innerHTML = "<i class ='fas fa-bars'></i>"
    }else {
        menu.classList.add("active")
        //adds close icon
        toggle.querySelector("a").innerHTML = "<i class ='fas fa-times'></i>"
    }
}

//event listener
toggle.addEventListener("click", toggleMenu, false)
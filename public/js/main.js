const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
try {
    const logo = document.querySelector('#logo')
    logo.addEventListener('mouseout', stopAnimateLogo)
    logo.addEventListener('mouseover', animateLogo)
} 
catch (err) {
    console.error(err)
}

try {
    const biglogo = document.querySelector('#biglogo')
    biglogo.addEventListener('mouseout', stopAnimateLogo)
    biglogo.addEventListener('mouseover', animateLogo)
}
catch (err) {
    console.error(err)
}

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

function animateLogo(event) {
    console.log('moved in!')
    const imageElement = event.target;
    imageElement.src = '/images/logoanimate.gif'
}

function stopAnimateLogo(event) {
    const imageElement = event.target;
    imageElement.src = '/images/staticlogo.png'
}

function confirmDelete(event) {
    console.log('are you sure?')
    const dialog = confirm("Are you sure you want to delete this post?")
    return dialog
}

//change to handle deletes
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
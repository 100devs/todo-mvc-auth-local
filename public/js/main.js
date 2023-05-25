//deleteBtn for the .del button
const deleteBtn = document.querySelectorAll('.del')
    //todoItem for the span.not item
const todoItem = document.querySelectorAll('span.not')
    //todoComplete for the span.complete item
const todoComplete = document.querySelectorAll('span.completed')

//moves to the deleteTodo function when the 
//button is clicked
Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteTodo)
})

//moves to the markComplete function when the 
//item is clicked
Array.from(todoItem).forEach((el) => {
    el.addEventListener('click', markComplete)
})

//moves to the markIncomplete function when the 
//item is clicked
Array.from(todoComplete).forEach((el) => {
    el.addEventListener('click', markIncomplete)
})

//deleteTodo function 
async function deleteTodo() {
    const todoId = this.parentNode.dataset.id
    try {
        //used the 'todos/deleteTodo' function
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

//markComplete
async function markComplete() {
    const todoId = this.parentNode.dataset.id
    try {
        //used the 'todos/markComplete' 
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

//markIncomplete function
async function markIncomplete() {
    const todoId = this.parentNode.dataset.id
    try {
        //uses the 'todos/markIncomplete'
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}
//deleteBtn holds all of the .del clicks
const deleteBtn = document.querySelectorAll('.del')
    //todoItem holds all of the span.not clicks
const todoItem = document.querySelectorAll('span.not')
    //todoComplete holds all of the span.completed clicks
const todoComplete = document.querySelectorAll('span.completed')

//goes to the deleteTodo function
Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteTodo)
})

//goes to the markComplete function
Array.from(todoItem).forEach((el) => {
    el.addEventListener('click', markComplete)
})

//goes to the markIncomplete function
Array.from(todoComplete).forEach((el) => {
    el.addEventListener('click', markIncomplete)
})

//deleteTodo function
async function deleteTodo() {
    const todoId = this.parentNode.dataset.id
    try {
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

//markComplete function
async function markComplete() {
    const todoId = this.parentNode.dataset.id
    try {
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
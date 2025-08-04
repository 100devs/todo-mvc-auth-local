const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('.check')
// const todoComplete = document.querySelectorAll('span.completed')
const todoPriority = document.querySelectorAll('.flag')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('change', markComplete)
})

// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

Array.from(todoPriority).forEach((el) => {
    el.addEventListener('click', markPriority)
})

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
    const isChecked = this.checked
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'completed': isChecked
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

async function markPriority() {
    const todoId = this.parentNode.dataset.id
    try {
        const response = await fetch('todos/markPriority', {
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
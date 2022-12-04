const deleteBtn = document.querySelectorAll('.fa-square-xmark')
const todoItem = document.querySelectorAll('span.not, span.completed')
const taskCheckbox = document.querySelectorAll('input[name=taskCheckbox]')

// Delete task
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

// Change status (move right)
Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', changeStatus)
})

// Mark Completed using checkbox
Array.from(taskCheckbox).forEach(el => {
    let boxStatus = el.checked
    el.addEventListener('click', boxStatus ? changeStatus : markComplete)
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

async function changeStatus(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/changeStatus', {
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
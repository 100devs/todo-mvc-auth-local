const deleteBtn = [...document.querySelectorAll('.del')]
const todoItem = [...document.querySelectorAll('span.not')]
const todoComplete = [...document.querySelectorAll('span.completed')]
const procrastinateBtn = [...document.querySelectorAll('span.procrastinate')]
const unprocrastinateBtn = [...document.querySelectorAll('span.unprocrastinate')]

deleteBtn.forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

todoItem.forEach((el)=>{
    el.addEventListener('click', markComplete)
})

todoComplete.forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

procrastinateBtn.forEach(el => el.addEventListener('click', markProcrastinated))

unprocrastinateBtn.forEach(el => el.addEventListener('click', markUnprocrastinated))

async function deleteTodo(){
    const todoId = this.parentNode.parentNode.dataset.id
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

async function markProcrastinated() {
    console.log(this);
    const todoId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('todos/markProcrastinated', {
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

async function markUnprocrastinated() {
    console.log(this);
    const todoId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('todos/markUnprocrastinated', {
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
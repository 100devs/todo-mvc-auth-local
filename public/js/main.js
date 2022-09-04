const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const todoWorkingOn = document.querySelectorAll('span.workingOn')
const todoUnmarkComplete = document.querySelectorAll('span.incomplete')
const todoArchive = document.querySelectorAll('span.archive')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})


Array.from(todoWorkingOn).forEach((el)=>{
    el.addEventListener('click', markWorkingOn)
})

Array.from(todoUnmarkComplete).forEach((el)=>{
    el.addEventListener('click', unmarkComplete)
})


Array.from(todoArchive).forEach((el)=>{
    el.addEventListener('click', markArchive)
})


Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
    
// })

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

async function markWorkingOn(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markWorkingOn', {
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


async function unmarkComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/unmarkComplete', {
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

async function markArchive(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markArchive', {
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
    console.log(todoId)
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
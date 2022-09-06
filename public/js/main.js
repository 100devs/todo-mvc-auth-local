const deleteBtn = document.querySelectorAll('.del')
//const todoItem = document.querySelectorAll('span.not')
const entryItem = document.querySelectorAll('span.not')
//const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteEntry)
})

// Array.from(entryItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

//Array.from(todoComplete).forEach((el)=>{
//    el.addEventListener('click', markIncomplete)
//})

//async function deleteTodo(){
async function deleteEntry(){
    const entryId = this.parentNode.dataset.id

    try{ 
        const response = await fetch('entries/deleteEntry', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'entryIdFromJSFile': entryId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log('you got an error, sucka!' + err)
    }
}

// async function markComplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markComplete', {
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
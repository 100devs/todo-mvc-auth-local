const deleteBtn = document.querySelectorAll('.del')
// const todoItem = document.querySelectorAll('div.not')
// const todoComplete = document.querySelectorAll('div.completed')
const todoItemCompleteIncomplete = document.querySelectorAll('div.compIncomp')


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})
// Array.from(todoItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })
// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })
Array.from(todoItemCompleteIncomplete).forEach((el)=>{
    el.addEventListener('click', markCompleteIncomplete)
})


async function deleteTodo(){
    const todoId = this.dataset.id

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

async function markCompleteIncomplete(){
    const todoId = this.dataset.id  
    try{
        const response = await fetch('todos/markCompleteIncomplete', {
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

// const loginButton = document.querySelector(".frontLoginButton")
// loginButton.addEventListener("click", () => {
//     let loginContainer = document.querySelector(".loginContainer")
//     loginContainer.classList.toggle("displayNone")
//     loginContainer.classList.toggle("scale-out")
//     loginContainer.classList.toggle("scale-in")
// })

// const signupButton = document.querySelector(".frontSignupButton")
// signupButton.addEventListener("click", () => {
//     let signupContainer = document.querySelector(".signupContainer")
//     signupContainer.classList.toggle("displayNone")
//     signupContainer.classList.toggle("scale-out")
//     signupContainer.classList.toggle("scale-in")
// })
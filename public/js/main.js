const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const taskEdit = document.querySelectorAll('button.edit')
const editBtn = document.querySelectorAll('.editbtn')



Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(taskEdit).forEach(el => {
    el.addEventListener('click', submitEdit) //"EDIT" Button 
} )

Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', hideEditBox)
})

async function submitEdit(e) {
    e.preventDefault() //what does this do? -- before using this method, fetch was causing networkError
    const newTask = e.target.parentNode.children[0].value.trim() // this variable takes the new value of the element INSIDE the textbox to update the database with
    const taskId = e.target.parentNode.parentNode.dataset.id // this variable takes the taskId
    // console.log(newTask)
    //console.log(taskId)
    try{
        const response = await fetch('todos/editTodo', { //sending the variable information to the router
            method: 'put',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {'Content-type': 'application/json'},
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                'todoIdFromJSFile': taskId, //sending taskID for the database to use as filter
            
                'newTask': newTask, //sending updated task to database 
               
            })
        })
        const data = await response.json() //before reloading.. AWAIT the new information from backend
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}


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

function hideEditBox(e) { //this function will hide/show the text-edit box by toggling the active/hidden class
    //the TASK will toggle between active/hidden
    //the EDIT TEXT BOX FORM will toggle between active/hidden
    if (Array.from(e.target.classList).includes('editbtn')) {
        const taskList = Array.from(
          e.target.parentNode.children
        ) 
        console.log(taskList)
        console.log(e.target.parentNode.children)
       
        taskList[0].classList.toggle('hidden')
        taskList[1].classList.toggle('hidden')
        taskList[2].classList.toggle('hidden')
        taskList[2].classList.toggle('active')
      }
}


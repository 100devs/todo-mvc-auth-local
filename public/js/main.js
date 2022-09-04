const deleteBtn = document.querySelectorAll('.del')
const priorityBtn = document.querySelectorAll('.priority')
const todoItem = document.querySelectorAll('.todoItem.incomplete')
const todoComplete = document.querySelectorAll('.todoItem.complete')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})
priorityBtn.forEach(el => el.addEventListener('click', changePriority))

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('change', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('change', markIncomplete)
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
    const todoId = this.dataset.id;
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

async function markIncomplete() {
    const todoId = this.dataset.id;
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

async function changePriority() {
    const todoId = this.parentNode.dataset.id;
    const priority = (Number(this.dataset.priority) + 1) % 4;
    try {
        const response = await fetch('todos/priority', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'priority': priority
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

function validateEmail(email) {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}


    /**
     * Display a message if error append before the form is submitted to the server
     * @params { string } classInfo : class to use with the error message ( alert-danger, alert-success, alert-info with bootstrap)
     * @params { string } message : Message to display to inform the user about what append
     * */
      const showInformation = (classInfo, message) => {

        // show the message
        formInfo.classList.add(classInfo)
         formInfo.classList.remove('hidden')
         formInfo.textContent = message

         // hide the div 3 sec later and clear the content;
          setTimeout(function () {
            formInfo.classList.remove(classInfo);
            formInfo.classList.add('hidden');
           formInfo.textContent = ''
                }, 3000);
      }


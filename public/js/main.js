const deleteBtn = document.querySelectorAll('.del')
const priorityBtn = document.querySelectorAll('.priority')
const todoItem = document.querySelectorAll('.todoItem.incomplete .form-check-input')
const todoComplete = document.querySelectorAll('.todoItem.complete .form-check-input')
const addTagBtn = document.querySelectorAll('.addTag i');
const deleteTagBtn = document.querySelectorAll('.tag i');
const addTagForm = document.querySelectorAll('.addTag form');
const addTodoForm = document.getElementById('addTodo');

if(addTodoForm) {

addTodoForm.addEventListener('submit', addTodo);

priorityBtn.forEach(el => el.addEventListener('click', changePriority));
addTagBtn.forEach(el => el.addEventListener('click', toggleTagForm));
addTagForm.forEach(el => el.addEventListener('submit', addTag));
deleteTagBtn.forEach(el => el.addEventListener('click', deleteTag));

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('change', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('change', markIncomplete)
})

async function addTodo(e) {
    const filtersAddTodo = document.getElementById('filtersAddTodo');
    const action = document.getElementById('addTodo-addTags');
    const todoItem = addTodoForm.querySelector('[name="todoItem"]').value;
    if (!filtersAddTodo || !action.checked) return;
    e.preventDefault();
    const params = (new URL(document.location)).searchParams;
    let tags = params.get("tags").split(',');
    console.log(tags)
    try {
        const response = await fetch('todos/createTodoWithTags', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoItem': todoItem,
                'tags': tags
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/todos/deleteTodo', {
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
    const todoId = this.parentNode.parentNode.dataset.id;
    try {
        const response = await fetch('/todos/markComplete', {
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
    const todoId = this.parentNode.parentNode.dataset.id;
    try{
        const response = await fetch('/todos/markIncomplete', {
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
    console.log('changed priority')
    const todoId = this.parentNode.dataset.id;
    const priority = (Number(this.dataset.priority) + 1) % 4;
    try {
        const response = await fetch('todos/priority', {
            method: 'put',
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

function toggleTagForm() {
    const form = this.parentNode.querySelector('form');
    if (form.style.display === "none") {
        form.style.display === "show";
        this.classList.remove('fa-plus');
        this.classList.add('fa-minus');

    } else {
        form.style.display === "show";
        this.classList.remove('fa-minus');
        this.classList.add('fa-plus');
    }
    form.style.display = form.style.display === "none" ? "block" : "none";

}

async function addTag(e) {
    e.preventDefault();
    const tag = this.querySelector('[name="tag"]').value.trim();
    const todoId = this.parentNode.parentNode.parentNode.dataset.id;
    try {
        const response = await fetch('todos/addTag', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'tag': tag
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function deleteTag() {
    const tag = this.parentNode.innerText.trim();
    const todoId = this.parentNode.parentNode.parentNode.dataset.id;
    try {
        const response = await fetch('/todos/deleteTag', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'tag': tag
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }

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
     * @params { HtmlElement } button : button used to submit the form, disable it to now allow multiple form sending
     * */
      const showInformation = (classInfo, message, button = null) => {

        // show the message
        formInfo.classList.add(classInfo)
         formInfo.classList.remove('hidden')
         formInfo.textContent = message

         // hide the div 3 sec later and clear the content;
          setTimeout(function () {
            formInfo.classList.remove(classInfo);
            formInfo.classList.add('hidden');
           formInfo.textContent = ''
           button.disabled = false;

                }, 3000);
      }


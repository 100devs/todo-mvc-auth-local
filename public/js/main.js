const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const editBtn = document.querySelectorAll('.edit')
const filterBtn = document.querySelector('.label-filter')
const whiteSpace = document
const destressBtn = document.querySelector('#delete-all-button')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', editTodo)
})

filterBtn.addEventListener('click', labelListToggle)
whiteSpace.addEventListener('click', closeDrawer)
destressBtn.addEventListener('click', clearTodoList)


async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    const urlParams = new URLSearchParams(window.location.search)
    const filter = urlParams.get('filter')

    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'activeFilter': filter
            })
        })
        const data = await response.json()
        console.log(data)
        if (filter) {
            window.location.href = `/todos?filter=${filter}`
        } else {
            window.location.href = '/todos'
        }
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    const urlParams = new URLSearchParams(window.location.search)
    const filter = urlParams.get('filter')
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'activeFilter': filter
            })
        })
        const data = await response.json()
        console.log(data)
        if (filter) {
            window.location.href = `/todos?filter=${filter}`
        } else {
            window.location.href = '/todos'
        }
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    const urlParams = new URLSearchParams(window.location.search)
    const filter = urlParams.get('filter')
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'activeFilter': filter
            })
        })
        const data = await response.json()
        console.log(data)
        if (filter) {
            window.location.href = `/todos?filter=${filter}`
        } else {
            window.location.href = '/todos'
        }
    }catch(err){
        console.log(err)
    }
}

function editTodo (){
    const todoItem = this.parentNode;
    const form = todoItem.querySelector('.inline-form');
    const editIcon = todoItem.querySelector('.edit');
    const input = todoItem.querySelector('.inline-input');
    const todoText = todoItem.querySelector('span')

    form.classList.remove('hidden');
    editIcon.classList.add('hidden');
    todoText.classList.add('hidden');
    input.focus();
}

function labelListToggle () {
    document.querySelector('.filter-drawer').classList.toggle('hidden')
}

function closeDrawer (event) {
    const icon = document.querySelector('.label-filter')
    const drawer = document.querySelector('.filter-drawer')
    if (!icon.contains(event.target) && !drawer.contains(event.target)){
        document.querySelector('.filter-drawer').classList.add('hidden')
    }
}

async function clearTodoList () {
    const allTodos = document.querySelectorAll('li.clickable')

    Array.from(allTodos).forEach((el)=>{
    el.classList.add('fade-out-up')
    })
    
    setTimeout(async () => {
        try{
            const response = await fetch('todos/clearTodos', {
                method: 'delete',
                headers: {'Content-type': 'application/json'},
            })
            const data = await response.json()
            console.log(data)
            window.location.href = '/todos'
        }catch(err){
            console.log(err)
        }
    }, 2500)
}
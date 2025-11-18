const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const editBtns = document.querySelectorAll('.edit');
const completedTasks = document.getElementById('completedTasks');  // Get the completed tasks element
const prioritySelects = document.querySelectorAll('.priority-select');

// Event listeners
Array.from(deleteBtn).forEach((el) => {  
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el) => {
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el) => {
    el.addEventListener('click', markIncomplete)
})

Array.from(editBtns).forEach((el) => { 
    el.addEventListener('click', editTodo); 
});

// Delete todo
async function deleteTodo(){
    const li = this.closest('li'); // get the <li> element
    const todoId = li.dataset.id;
    try {
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ 'todoIdFromJSFile': todoId })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(err) {
        console.log(err);
    }
}

// Mark as complete
async function markComplete(){
    const li = this.closest('li');
    const todoId = li.dataset.id;
    try {
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ 'todoIdFromJSFile': todoId })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(err) {
        console.log(err);
    }
}

// Mark as incomplete
async function markIncomplete(){
    const li = this.closest('li');
    const todoId = li.dataset.id;
    try {
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ 'todoIdFromJSFile': todoId })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(err) {
        console.log(err);
    }
}

// Edit todo
async function editTodo() {
    const li = this.closest('li');  // fixed to get the <li>
    const span = li.querySelector('span.not, span.completed'); 
    const oldText = span.innerText;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldText;
    span.replaceWith(input);
    input.focus();

    const saveEdit = async () => {
        const newText = input.value.trim();
        if (newText && newText !== oldText) {
            try {
                const response = await fetch('todos/editTodo', {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        todoIdFromJSFile: li.dataset.id,
                        newTodoText: newText
                    })
                });
                const data = await response.json();
                console.log(data);
                location.reload();
            } catch (err) {
                console.error(err);
            }
        } else {
            input.replaceWith(span);
        }
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEdit();
    });
}

// Update completed message
function updateMessage(){
    const todos = document.querySelectorAll('span.not, span.completed');
    const completed = document.querySelectorAll('span.completed');
    const total = todos.length;
    const done = completed.length;
    
    if(done === total && total > 0){
        completedTasks.style.display = 'block';
    } else {
        completedTasks.style.display = 'none';
    }
}
updateMessage();

// Priority change
prioritySelects.forEach(sel => sel.addEventListener('change', async function() {
    const li = this.closest('li');
    const todoId = li.dataset.id;
    const newPriority = this.value;

    try {
        const response = await fetch('/todos/updatePriority', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ todoIdFromJSFile: todoId, newPriority })
        });
        await response.json();

        // Remove old priority class
        li.classList.remove('high','normal','low');
        li.classList.add(newPriority);

        // Move li to the correct ul
        document.getElementById(newPriority).appendChild(li);

    } catch(err) {
        console.log(err);
    }
}));

const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTodo);
});

Array.from(todoItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(todoComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

async function deleteTodo() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/deleteTodo', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList.add(savedTheme);
}

// Toggle dark mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', toggleTheme);
function toggleTheme() {
  const currentTheme = document.body.classList.contains('dark')
    ? 'dark'
    : 'light';

  // Toggle theme
  if (currentTheme === 'dark') {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    darkModeToggle.textContent = '🌙'; // Change button text for light mode
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    darkModeToggle.textContent = '🌞'; // Change button text for dark mode
    localStorage.setItem('theme', 'dark');
  }
}

// toggle show todos container
document.addEventListener('DOMContentLoaded', () => {
  const todoPaper = document.getElementById('todoPaper');
  const todoContent = document.getElementById('todoContent');
  const todoItems = document.querySelectorAll('.todoItem');
  const todoCompletes = document.querySelectorAll('.todoComplete');

  if (todoPaper) {
    if (todoItems.length === 0 && todoCompletes.length === 0) {
      todoPaper.classList.add('hidden');
      todoContent.classList.add('hidden');
    } else {
      todoPaper.classList.remove('hidden');
      todoContent.classList.remove('hidden');
    }
  }
});

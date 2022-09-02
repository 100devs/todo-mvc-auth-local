const createBtn = document.querySelector('#create');

createBtn.addEventListener('click', sendData);

async function sendData() {
  // Grab input values from form
  const date = document.querySelector('#date').value;
  const mealType = document.querySelector('#mealType').value;
  const foodItems = document.getElementById('foodItems').value;
  console.log(date, mealType, foodItems);

  const existingEntries = document.querySelectorAll('.entry');
  const existingDays = Array.from(existingEntries);

  // Check if date exists - if so, make a PUT request to update, and if not, make a POST request to create
  let httpRequest;
  if (existingDays.some((day) => day.dataset.date === date)) {
    console.log('HEY');
    httpRequest = 'put';
  } else {
    httpRequest = 'post';
  }

  try {
    const response = await fetch('/dates', {
      method: httpRequest,
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        date: date,
        mealType: mealType,
        foodItems: foodItems,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// Code from Todo project that can be reused

const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteDate);
});

async function deleteDate() {
  const dateId = this.parentNode.dataset.id;
  try {
    const response = await fetch('/date', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        dateId: dateId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

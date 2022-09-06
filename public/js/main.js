const deleteBtn = document.querySelectorAll('.del');
// const todoItem = document.querySelectorAll('span.not');
// const todoComplete = document.querySelectorAll('span.completed');
const incrementor = document.querySelectorAll('.addShame');

const options = {
  valueNames: ['todont', 'timesDone'],
};

const todoList = new List('todontList', options);

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTodo);
});

// Array.from(todoItem).forEach((el) => {
//   el.addEventListener('click', markComplete);
// });

// Array.from(todoComplete).forEach((el) => {
//   el.addEventListener('click', markIncomplete);
// });

Array.from(incrementor).forEach((el) => {
  el.addEventListener('click', addShame);
});

// isItTime()

async function deleteTodo() {
  const todoElem = this.parentNode;
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
    // location.reload();
    todoElem.remove();
    confettiShower();
  } catch (err) {
    console.log(err);
  }
}

async function addShame() {
  const todoId = this.parentNode.dataset.id;
  const shameMsg = this.previousElementSibling;
  let shame = Number(this.previousElementSibling.textContent);
  const newShame = (shame += 1);
  try {
    const response = await fetch('todos/addShame', {
      //add shame route
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
        timesDoneFromJSFile: newShame,
      }),
    });
    const data = await response.json();
    // location.reload();
    // shame = newShame
    // const placeToShame = document.querySelector('#shaming');
    // placeToShame.textContent = 'test';
    shameMsg.textContent = newShame;
    isItTime(newShame);
  } catch (err) {
    console.log(err);
  }
}

// async function markComplete() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch('todos/markComplete', {
//       method: 'put',
//       headers: { 'Content-type': 'application/json' },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function markIncomplete() {
//   const todoId = this.parentNode.dataset.id;
//   try {
//     const response = await fetch('todos/markIncomplete', {
//       method: 'put',
//       headers: { 'Content-type': 'application/json' },
//       body: JSON.stringify({
//         todoIdFromJSFile: todoId,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// }

function isItTime(toDontAmount = null) {
  // const toDontAmount = document.querySelectorAll('#shame').length;
  const placeToShame = document.querySelector('#shaming');
  // let timesDoneAmount = 0;
  for (let i = 0; i < toDontAmount; i++) {
    // took out timesDoneAmount and turned into toDontAmount
    // timesDoneAmount += Number(
    //   document.querySelectorAll('#shame')[i].textContent
    // );
  }
  if (toDontAmount >= 20) {
    placeToShame.textContent =
      "Yup, now you have really done it. Forget that specialist, they clearly won't have any power here.";
  } else if (toDontAmount >= 15) {
    placeToShame.textContent =
      "And here I thought I had no self-control.. I think it might be time to see a specialist before it's too late.";
  } else if (toDontAmount >= 10) {
    placeToShame.textContent =
      "I mean, really? You decided to just go at it today, didn't you?";
  } else if (toDontAmount >= 5) {
    placeToShame.textContent = 'Wow.. maybe you should stop doing that.';
  }
}

// for starting the confetti

function start() {
  setTimeout(function () {
    confetti.start();
  }, 0); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
}

//  for stopping the confetti

function stop() {
  setTimeout(function () {
    confetti.stop();
  }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
}
// after this here we are calling both the function so it works
// start();
// stop();

function confettiShower() {
  const placeToShame = document.querySelector('#shaming');
  placeToShame.textContent =
    'Congratulations on giving up your bad habit!!!!!!!';
  start();
  stop();
}

// if you dont want to make it stop and make it infinite you can just remove the stop function

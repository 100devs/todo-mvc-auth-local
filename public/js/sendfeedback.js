// TODO: Consider creating a util/api.js

const deleteBtn = document.querySelectorAll(".del");

Array.from(deleteBtn).forEach((el) => {
  // el.addEventListener('click', whatIsThisFunction)
  el.addEventListener("click", deleteSendfeedback);
});

// How did I find the node?
// I then replaced the function deleteSendfeedback on line 6
// and used the browser's dev tools console to locate the target
async function whatIsThisFunction() {
  const whatIsThis = this.parentNode.dataset.id;
  console.log(whatIsThis);
}

async function deleteSendfeedback() {
  const sendfeedbackUserId = this.parentNode.dataset.id;
  try {
    const response = await fetch("sendfeedback", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: sendfeedbackUserId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

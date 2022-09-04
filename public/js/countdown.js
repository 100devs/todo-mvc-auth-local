// **** SELECTORS ****
const deadline = document.querySelector(".deadline");
const deadlineFormat = document.querySelectorAll(".deadline-format span");

// **** get the current year ****
const tempDate =  new Date();
const getYear = tempDate.getFullYear();

const xmasDate = new Date(getYear, 11, 25, 00, 00);
const xmasTime = xmasDate.getTime();

// **** FUNCTION ****
function getRemainingTime() {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const timeDifference = xmasTime - currentTime;

  // NOTE: time difference is in milliseconds (ms)
  // 1 secs = 1000ms
  // 60 secs = 1 minute
  // 60 minutes = 1 hour
  // 24 hours = 1 day

  // values in ms
  const oneSec = 1000;
  const oneMin = 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;

  // calculate all values
  const days = Math.floor(timeDifference / oneDay);
  const hours = Math.floor((timeDifference % oneDay) / oneHour);
  const mins = Math.floor((timeDifference % oneHour) / oneMin);
  const secs = Math.floor((timeDifference % oneMin) / oneSec);

  //compute all values in an array
  const arr = [days, hours, mins, secs];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  deadlineFormat.forEach(function (item, index) {
    item.textContent = format(arr[index]);
  });

  //display this text when Christmas is over
  if (timeDifference < 0) {
    clearInterval(countdown);
    deadline.classList.add("cover");
    deadline.innerHTML = `<h3>Hey, Merry Christmas & Happy Prosperous New Year!!!</h3>`;
  }
}
// countdown
const countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
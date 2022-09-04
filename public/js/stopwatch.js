//AW added
const completedOnTime = document.querySelector('#onTime')
const completedTooSlow = document.querySelector('#tooSlow')

var sw = {
    // (A) PROPERTIES
    erst : null, // html reset button
    ego : null, // html start/stop button
    timer : null, // timer object
    now : 0, // current elapsed time
    estimate : document.getElementById("sw-est"), //AW added
  
    // (B) INITIALIZE
    init : () => {
      // (B1) GET HTML ELEMENTS
      sw.erst = document.getElementById("sw-rst");
      sw.ego = document.getElementById("sw-go");
      
  
      // (B2) ENABLE BUTTON CONTROLS
      sw.erst.onclick = sw.reset;
      sw.ego.onclick = sw.start;
      sw.erst.disabled = false;
      sw.ego.disabled = false;
    },
  
    // (C) START!
    start : () => {
      sw.timer = setInterval(sw.tick, 1000);
      sw.ego.value = "Stop";
      sw.ego.onclick = sw.stop;
    },
  
    // (D) STOP
    stop : () => {
      clearInterval(sw.timer);
      sw.timer = null;
      sw.ego.value = "Start";
      sw.ego.onclick = sw.start;
      //AW code to just get the value
      console.log(sw.now)
      console.log(sw.estimate)
    },
  
    // (E) TIMER ACTION
    tick : () => {
      // (E1) CALCULATE HOURS, MINS, SECONDS
      sw.now++;
      let hours = 0, mins = 0, secs = 0,
      remain = sw.now;
      hours = Math.floor(remain / 3600);
      remain -= hours * 3600;
      mins = Math.floor(remain / 60);
      remain -= mins * 60;
      secs = remain;
    },
   
  
    // (F) RESET
    reset : () => {
      if (sw.timer != null) { sw.stop(); }
      sw.now = -1;
      sw.tick();
    },

    completedOnTime : () => {
        if (Number(sw.now) > sw.estimate) {
            completedTooSlow.classList.toggle('hidden')
        } else {
            completedOnTime.classList.toggle('hidden')
        }
    }


  };
  window.addEventListener("load", sw.init);



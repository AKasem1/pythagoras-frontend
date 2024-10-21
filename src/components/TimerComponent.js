import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(10);

  const startTimer = () => {
    setInterval(() => {
      setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
    }, 1000);
  }

  return (
    <div>
      <button onClick={startTimer}>Start Timer</button>
      <h1>Timer: {seconds} seconds</h1>
    </div>
  );
};

export default Timer;
// import React, { useState, useEffect } from "react";

// function TimerWithPersistence() {
//   const [isRunning, setIsRunning] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(null);

//   useEffect(() => {
//     // Check if there's an existing timer in local storage
//     const savedTimer = localStorage.getItem("timerEndTime");
//     if (savedTimer) {
//       const currentTime = Date.now();
//       const timeLeft = parseInt(savedTimer, 10) - currentTime;

//       if (timeLeft > 0) {
//         setIsRunning(true);
//         setRemainingTime(timeLeft);

//         // Continue the countdown based on the remaining time
//         setTimeout(() => {
//           onTimerEnd();
//         }, timeLeft);
//       }
//     }
//   }, []);

//   const startTimer = () => {
//     const duration = 5000; // Timer for 5 seconds
//     const endTime = Date.now() + duration; // Calculate end time

//     // Save the end time in local storage
//     localStorage.setItem("timerEndTime", endTime);

//     setIsRunning(true);
//     setRemainingTime(duration);

//     // Start the timer
//     setTimeout(() => {
//       onTimerEnd();
//     }, duration);
//   };

//   const onTimerEnd = () => {
//     console.log("Timer finished!");
//     setIsRunning(false);
//     setRemainingTime(null);

//     // Clear the timer from local storage
//     localStorage.removeItem("timerEndTime");
//   };

//   return (
//     <div>
//       <button onClick={startTimer} disabled={isRunning}>
//         Start Timer
//       </button>
//       {isRunning && <p>Time remaining: {remainingTime / 1000} seconds</p>}
//     </div>
//   );
// }

// export default TimerWithPersistence;

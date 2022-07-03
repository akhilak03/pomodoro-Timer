import React, { useState } from "react";
import Todo from '../components/Todo'
import "../components/Timer.css";
function Timer() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnbreak] = useState(false);
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };
  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };
  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => prev - 1);
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };
  return (
    <div>
      <h1 className="text-center p-4">Pomodoro Clock</h1>
      <div className="dual-container">
        <Length
          title={"Break Length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Length
          title={"Session Length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>

      <h1 className="text-center dplay">{formatTime(displayTime)}</h1>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn  btn-outline-secondary m-2"
          onClick={controlTime}
        >
          {timerOn ? (
            <i className="fa-solid fa-circle-pause fa-2x "></i>
          ) : (
            <i className="fa-solid fa-circle-play  fa-2x"></i>
          )}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary m-2"
          onClick={resetTime}
        >
          <i class="fa-solid fa-rotate fa-2x"></i>
        </button>
      </div>
      <>
        <Todo/>
        </>
    </div>
  );
  function Length({ title, changeTime, type, time, formatTime }) {
    return (
      <div className="container">
        <h3 className="text-center p-2 lead">{title}</h3>
        <div className="time-set ">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => changeTime(-60, type)}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
          <h3>{formatTime(time)}</h3>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => changeTime(60, type)}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
        
      </div>
    );
  }
}

export default Timer;

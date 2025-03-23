import { useEffect, useRef, useState } from "react";
import "./stopwatch.css";

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [secTimer, setSecTimer] = useState(0);
  const [isPaused, setPaused] = useState(true);

  useEffect(() => {
    if (isPaused) return;
    const timeout = setTimeout(() => {
      if (timer >= 100) {
        setSecTimer(secTimer + 1);
        setTimer(0);
      } else {
        setTimer(timer + 1);
      }
    }, 10);
    return () => clearTimeout(timeout);
  }, [timer, isPaused]);

  return (
    <div className="timer-main">
      <Timer timeMs={timer} timeS={secTimer} />
      <div className="control-center">
        <button onClick={() => (setTimer(0), setPaused(true), setSecTimer(0))}>
          Reset
        </button>
        <button onClick={() => setPaused(!isPaused)}>
          {isPaused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
};

const Timer = ({ timeMs = 0, timeS = 0 }) => {
  return (
    <div className="timer-box">
      <p className="timer">{timeS < 10 ? `0${timeS}` : timeS}</p>
      <p>s</p>
      <p className="timer">{timeMs < 10 ? `0${timeMs}` : timeMs}</p>
      <p>ms</p>
    </div>
  );
};

export default Stopwatch;

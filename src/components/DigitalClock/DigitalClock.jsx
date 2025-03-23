import { useEffect, useState } from "react";
import "./digitalclock.css";
const DigitalClock = () => {
  const date = new Date();
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    sec: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime((prevTime) => {
        const newTime = { ...prevTime };
        newTime.hour = date.getHours();
        newTime.minute = date.getMinutes();
        newTime.sec = date.getSeconds();
        return newTime;
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [time]);

  return (
    <div>
      <ClockFace hour={time.hour} minute={time.minute} sec={time.sec} />
    </div>
  );
};

const ClockFace = ({ hour = 0, minute = 0, sec = 0 }) => {
  return (
    <div className="clockface">
      <div className="clock">
        <p>{hour < 10 ? `0${hour}` : hour}</p>
        <p>:</p>
        <p>{minute < 10 ? `0${minute}` : minute}</p>
        <p>:</p>
        <p>{sec < 10 ? `0${sec}` : sec}</p>
      </div>
      <div className="clock-text">
        <p>HH</p>
        <p>:</p>
        <p>MM</p>
        <p>:</p>
        <p>SS</p>
      </div>
    </div>
  );
};

export default DigitalClock;

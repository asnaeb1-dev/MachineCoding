import { useEffect, useState } from "react";
import "./trafficlight.css";

const TrafficLight = () => {
  const [currentColor, setCurrentColor] = useState("red");

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (currentColor === "red") {
          setCurrentColor("yellow");
        } else if (currentColor === "yellow") {
          setCurrentColor("green");
        } else {
          setCurrentColor("red");
        }
      },
      currentColor === "red" ? 3000 : currentColor === "yellow" ? 1000 : 2000
    );
    return () => clearTimeout(timeout);
  }, [currentColor]);

  return (
    <div className="trafficlight">
      <TrafficColor color="red" isActive={currentColor === "red"} />
      <TrafficColor color="yellow" isActive={currentColor === "yellow"} />
      <TrafficColor color="green" isActive={currentColor === "green"} />
    </div>
  );
};

const TrafficColor = ({ isActive = false, color = "red" }) => {
  const [timer, setTimer] = useState(1);
  useEffect(() => {
    if (!isActive) {
      setTimer(1);
      return;
    }
    const timeout = setTimeout(() => {
      setTimer(() => timer + 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isActive, timer]);
  return (
    <div
      style={{ background: `${isActive ? color : "white"}` }}
      className="traffic-color"
    >
      {isActive && <p>{timer}</p>}
    </div>
  );
};

export default TrafficLight;

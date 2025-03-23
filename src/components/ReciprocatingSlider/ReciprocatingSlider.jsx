import { useEffect, useRef, useState } from "react";
import "./reciprocatingslider.css";

const ReciprocatingSlider = () => {
  return (
    <div className="window-main">
      <div className="slider-box">
        <Slider />
      </div>
    </div>
  );
};

const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isCaptureStarted, setIsCaptureStarted] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    console.log((sliderPosition / sliderRef.current.offsetWidth) * 100);
  }, [sliderPosition]);

  return (
    <div ref={sliderRef} className="slider-container">
      {/* <div className="left-progress"></div> */}
      <div
        onMouseDown={() => setIsCaptureStarted(true)}
        onMouseOut={() => setIsCaptureStarted(false)}
        onMouseUp={() => setIsCaptureStarted(false)}
        onMouseMove={(e) => isCaptureStarted && setSliderPosition(e.clientX)}
        style={{
          left: `${(sliderPosition / sliderRef.current.offsetWidth) * 100}%`,
          transition: "left 0.2s ease-in-out",
        }}
        className="centre-grab-rail"
      ></div>
      {/* <div className="right-progress"></div> */}
    </div>
  );
};

export default ReciprocatingSlider;

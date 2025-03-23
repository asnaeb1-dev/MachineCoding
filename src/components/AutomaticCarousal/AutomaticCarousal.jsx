import { useState } from "react";
import "./automaticcarousal.css";

const AutomaticCarousal = () => {
  const images = [
    {
      src: "https://picsum.photos/id/600/600/400",
      alt: "Forest",
    },
    {
      src: "https://picsum.photos/id/100/600/400",
      alt: "Beach",
    },
    {
      src: "https://picsum.photos/id/200/600/400",
      alt: "Yak",
    },
    {
      src: "https://picsum.photos/id/300/600/400",
      alt: "Hay",
    },
    {
      src: "https://picsum.photos/id/400/600/400",
      alt: "Plants",
    },
    {
      src: "https://picsum.photos/id/500/600/400",
      alt: "Building",
    },
  ];
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="display">
      <div className="auto-carousal">
        <img
          src={`${images[currentImage].src}`}
          alt={`${images[currentImage].alt}`}
          className="atc-image"
        />
				<div>
					
				</div>
      </div>
    </div>
  );
};

export default AutomaticCarousal;

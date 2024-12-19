import React, { useEffect, useState } from "react";
import image1 from "../../../../helper/staticImage/homePage/animated-banner/left-t.webp";
import image2 from "../../../../helper/staticImage/homePage/animated-banner/center-1.webp";
import image3 from "../../../../helper/staticImage/homePage/animated-banner/right-t.webp";
import image4 from "../../../../helper/staticImage/homePage/animated-banner/left-b.webp";
import image5 from "../../../../helper/staticImage/homePage/animated-banner/right-b.webp";
import "./Graphs.css";

const imageConfig = [
  { src: image1, className: "image-first" },
  { src: image2, className: "image-second" },
  { src: image3, className: "image-third" },
  { src: image4, className: "image-four" },
  { src: image5, className: "image-five" },
];

const Graphs = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(5);

  //   useEffect(() => {
  //     let currentIndex = 0;

  //     const intervalId = setInterval(() => {
  //       setActiveImageIndex(currentIndex);
  //       currentIndex = (currentIndex + 1) % imageConfig.length;

  //       if (currentIndex === 0) {
  //         setTimeout(() => {
  //           setActiveImageIndex(-1);
  //         }, 500);
  //       }
  //     }, 2000);

  //     return () => clearInterval(intervalId);
  //   }, []);
  return (
    <div className="graph-banner">
      {imageConfig.map((image, index) => (
        <div
          key={index}
          className={`image-container ${image.className} ${
            index <= activeImageIndex ? "active" : ""
          }`}
        >
          <img src={image.src} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Graphs;

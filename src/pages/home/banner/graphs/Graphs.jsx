import React, { useEffect, useState, useRef } from "react";
import image1 from "../../../../helper/staticImage/homePage/animated-banner/left-t.webp";
import image2 from "../../../../helper/staticImage/homePage/animated-banner/center-1.webp";
import image3 from "../../../../helper/staticImage/homePage/animated-banner/right-t.webp";
import image4 from "../../../../helper/staticImage/homePage/animated-banner/left-b.webp";
import image5 from "../../../../helper/staticImage/homePage/animated-banner/inbox.webp";
import "./Graphs.css";

const imageConfig = [
  { src: image1, className: "image-first" },
  { src: image2, className: "image-second" },
  { src: image3, className: "image-third" },
  { src: image4, className: "image-four" },
  { src: image5, className: "image-five" },
];

// Define the sequence of images to show (using indices from imageConfig)
const animationSequence = [1, 0, 2, 3, 4]; // Customize this array to change the order

const Graphs = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(-1);
  const [wasFullyOut, setWasFullyOut] = useState(true);
  const graphRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    // Observer for animation trigger
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && wasFullyOut && activeImageIndex === -1) {
            setWasFullyOut(false);
            let sequenceIndex = 0;
            
            intervalIdRef.current = setInterval(() => {
              setActiveImageIndex(animationSequence[sequenceIndex]);
              sequenceIndex++;

              if (sequenceIndex === animationSequence.length) { // When the animation reaches the end, clear the interval to stop it
                clearInterval(intervalIdRef.current);
              }
            }, 300);
          }
        });
      },
      { threshold: 0.5 } // Run the animation when 50% of the banner section is in view
    );

    // Observer for reset trigger (reset the animation to initial state (all images faded) when the banner is scrolled completely out of view)
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setWasFullyOut(true);
            if (intervalIdRef.current) {
              clearInterval(intervalIdRef.current);
            }
            setActiveImageIndex(-1);
          }
        });
      },
      { threshold: 0 }
    );

    if (graphRef.current) {
      animationObserver.observe(graphRef.current);
      resetObserver.observe(graphRef.current);
    }

    return () => {
      animationObserver.disconnect();
      resetObserver.disconnect();
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <div className="graph-banner" ref={graphRef}>
      {imageConfig.map((image, index) => (
        <div
          key={index}
          className={`image-container ${image.className} ${activeImageIndex >= 0 && animationSequence.indexOf(index) <= animationSequence.indexOf(activeImageIndex) ? "active" : ""}`}
        >
          <img src={image.src} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Graphs;

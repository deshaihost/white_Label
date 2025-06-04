import React, { useState, useEffect, useRef } from "react";
import "./VideoComponent.css";
import headerImage from "./image/headerDiv.png";
import trailingIcon from "./image/Trailing Icon (6).svg";
import videoThumbnail from "./image/videoContainerImage.png";

const VideoComponent = ({ onRemindLater }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const watchButtonRef = useRef(null);

  const handleVideoPlay = () => {
    setIsPlaying(true);
    console.log("Video playing");
    // Here you would typically handle actual video playback
  };

  // Watch button click handler to also play video
  const handleWatchTourClick = () => {
    handleVideoPlay();
  };
  return (
    <div
      className="parent-container"
      style={{
        borderRadius: "20px",
        border: "0px solid rgba(87, 198, 255, 0.7)",
        overflow: "hidden",
      }}
    >
      {" "}
      <div className="header-container">
        <img src={headerImage} alt="Header" className="header-image" />
        <div className="text-overlay">
          <p>✨ Your inbox just got a major upgrade!</p>
        </div>
      </div>
      <div className="lower-container">
        <div className="video-player-container">
          <div className="video-thumbnail" onClick={handleVideoPlay}>
            {" "}
            {isPlaying ? (
              <iframe
                className="video-element"
                src="https://www.youtube.com/embed/f81rXqUgsPk?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img src={videoThumbnail} alt="Video thumbnail" />
                <div className="play-button-overlay">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="24" fill="white" />
                    <path
                      d="M32 24L20 30.9282L20 17.0718L32 24Z"
                      fill="#0B5FDE"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="content-wrapper">
          <p>
            Take a quick tour to see all the exciting updates and improvements
            that will streamline your guest communication workflow.
          </p>
          <button
            className="watch-tour-button"
            onClick={handleWatchTourClick}
            ref={watchButtonRef}
          >
            Watch the tour
            <img src={trailingIcon} alt="Play" className="button-icon" />
          </button>{" "}
          <div
            className="remind-later"
            onClick={
              onRemindLater || (() => console.log("Remind later clicked"))
            }
            style={{ cursor: "pointer" }}
          >
            <p>Remind me Later</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;

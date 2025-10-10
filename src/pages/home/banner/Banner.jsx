import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import "./banner.css";
import { Link } from "react-router-dom";
import BookDemoModal from "../../../component/bookDemoModal";
import HLSVideoPlayer from "./HLSVideoPlayer";
import Graphs from "./graphs/Graphs";

/*
import chatVideo from '../../../public/img/home/chat_video.mp4';
import videoImgBackup from '../../../public/img/home/video_img.jpg';
*/

//const chatVideo = 'https://hostbuddylb.com/home/chat_video.mp4';
const chatVideoHLSPlaylist =
  "https://hostbuddylb.com/home/chat_video/HLS/chat_video_master.m3u8";
const chatVideoMP4av1 =
  "https://hostbuddylb.com/home/chat_video/chat_video_30fps_av1.mp4";
const chatVideoMP4 =
  "https://hostbuddylb.com/home/chat_video/chat_video_30fps.mp4";
const VideoImgbackup = "https://hostbuddylb.com/home/chat_video/video_img.webp";

const Banner = () => {
  const [demoModalShow, setDemoModalShow] = useState(false);

  return (
    <section className="banner">
      <Container>
        <div className="banner-container">
          <div className="banner-content">
            <div className="d-sm-flex d-block align-items-center justify-content-center gap-5 rating-part-banner">
              <div className="star-content">
                <span className="d-flex align-items-center justify-content-center gap-1">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </span>
                <p className="text-white fs-6">"HostBuddy works."</p>
              </div>
              <div className="star-content">
                <span className="d-flex align-items-center justify-content-center gap-1">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </span>
                <p className="text-white fs-6">"Incredible AI assistant"</p>
              </div>
              <div className="star-content">
                <span className="d-flex align-items-center justify-content-center gap-1">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </span>
                <p className="text-white fs-6">"My sleeping pill"</p>
              </div>
            </div>
            <div
              className="heading heading-center"
              style={{ width: "65%", margin: "0 auto" }}
            >
              <h1>
                Short Term Rental Messaging <strong>On Autopilot</strong>
              </h1>
            </div>
            <p>Welcome to the Future of Hosting</p>
            <div style={{ marginBottom: "20px" }}>
              <a
                className="link-btn filled-btn"
                style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}
                href="https://youtu.be/3qJSak6ZL8M"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" fill="#146ef5" stroke="white" strokeWidth="1"/>
                  <path d="M10 8l6 4-6 4V8z" fill="#146ef5" stroke="white" strokeWidth="1"/>
                </svg>
                PLAY VIDEO
              </a>
            </div>
            <a
              className="link-btn filled-btn"
              style={{ cursor: "pointer", marginRight: "20px" }}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault(); // Don't go to any link - open the modal
                setDemoModalShow(true);
              }}
            >
              BOOK A DEMO
            </a>
            <Link to="/signup" className="link-btn outline-btn">
              GET STARTED FOR FREE
            </Link>
            <span className="bg-shadow"></span>
          </div>

          {/* <div className="banner-video">
                        <HLSVideoPlayer src={chatVideoHLSPlaylist} mp4Backupav1={chatVideoMP4av1} mp4Backuph264={chatVideoMP4} ImgBackup={VideoImgbackup} />
                    </div> */}
        </div>
      </Container>
      <Container>
        <Graphs />
      </Container>
      {demoModalShow && (
        <BookDemoModal
          show={demoModalShow}
          onHide={() => setDemoModalShow(false)}
          sourceMsg="home page top"
        />
      )}
    </section>
  );
};

export default Banner;

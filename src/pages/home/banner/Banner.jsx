import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import './banner.css';
import { Link } from "react-router-dom";
import BookDemoModal from "../../../component/bookDemoModal";
import HLSVideoPlayer from './HLSVideoPlayer';

/*
import chatVideo from '../../../public/img/home/chat_video.mp4';
import videoImgBackup from '../../../public/img/home/video_img.jpg';
*/

//const chatVideo = 'https://hostbuddylb.com/home/chat_video.mp4';
const chatVideoHLSPlaylist = 'https://hostbuddylb.com/home/chat_video/HLS/chat_video_master.m3u8'
const chatVideoMP4av1 = 'https://hostbuddylb.com/home/chat_video/chat_video_30fps_av1.mp4';
const chatVideoMP4 = 'https://hostbuddylb.com/home/chat_video/chat_video_30fps.mp4';
const VideoImgbackup = 'https://hostbuddylb.com/home/chat_video/video_img.webp';

const Banner = () => {
    const [demoModalShow, setDemoModalShow] = useState(false);

    return(
        <section className="banner">
            <Container>
                <div className="banner-container">
                    <div className="banner-content">
                        <div className="heading heading-center" style={{ width: '75%', margin: '0 auto' }}>
                        <h1>Short Term Rental Messaging <strong>On Autopilot</strong></h1>
                        </div>
                        <p>Welcome to the Future of Hosting</p>
                        <a className="link-btn filled-btn" style={{ cursor: 'pointer', marginRight: '20px' }} target="_blank" rel="noopener noreferrer" onClick={(e) => {
                            e.preventDefault(); // Don't go to any link - open the modal
                            setDemoModalShow(true);
                        }}>
                            Book a Demo
                        </a>
                        <Link to='/signup' className="link-btn outline-btn">Get Started For Free</Link>
                    </div>
                    <div className="banner-video">
                        <HLSVideoPlayer src={chatVideoHLSPlaylist} mp4Backupav1={chatVideoMP4av1} mp4Backuph264={chatVideoMP4} ImgBackup={VideoImgbackup} />
                    </div>
                </div>
            </Container>
            {demoModalShow && <BookDemoModal show={demoModalShow} onHide={() => setDemoModalShow(false)} />}
        </section>
    )
}

export default Banner;
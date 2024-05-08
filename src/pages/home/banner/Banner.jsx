import React from "react";
import Container from 'react-bootstrap/Container';
import './banner.css';
import { Link } from "react-router-dom";

import chatVideo from '../../../public/img/home/chat_video.mp4';
import videoImgBackup from '../../../public/img/home/video_img.jpg';

const Banner = () => {
    return(
        <section className="banner">
            <Container>
                <div className="banner-container">
                    <div className="banner-content">
                        <div className="heading heading-center">
                            <h2>Property Management Made Easy with Our <strong>AI-Powered Chatbots</strong></h2>
                        </div>
                        <p>24/7 Guest Communication Made Effortless</p>
                        <Link to='/pricing' className="link-btn outline-btn">Start 2 Week free trial</Link>
                    </div>
                    <div className="banner-video">
                        <video autoPlay loop muted poster={videoImgBackup}>
                            <source src={chatVideo} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Banner;
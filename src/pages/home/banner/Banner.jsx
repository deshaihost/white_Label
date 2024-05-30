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
                        <div className="heading heading-center" style={{ width: '75%', margin: '0 auto' }}>
                        <h1>Short Term Rental Messaging <strong>On Autopilot</strong></h1>
                        </div>
                        <p>Welcome to the Future of Hosting</p>
                        <Link to='/pricing' className="link-btn outline-btn">Start 2 Week Free Trial</Link>
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
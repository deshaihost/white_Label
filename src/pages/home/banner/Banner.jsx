import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './banner.css';
import { Link } from "react-router-dom";
import BookDemoModal from "../../../component/bookDemoModal";

import chatVideo from '../../../public/img/home/chat_video.mp4';
import videoImgBackup from '../../../public/img/home/video_img.jpg';

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
                        <Link to='/pricing' className="link-btn outline-btn">Get Started For Free</Link>
                    </div>
                    <div className="banner-video">
                        <video autoPlay loop muted playsInline poster={videoImgBackup}>
                            <source src={chatVideo} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                    </div>
                </div>
            </Container>
            {demoModalShow && <BookDemoModal show={demoModalShow} onHide={() => setDemoModalShow(false)} />}
        </section>
    )
}

export default Banner;
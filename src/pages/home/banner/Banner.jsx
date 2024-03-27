import React from "react";
import Container from 'react-bootstrap/Container';
import './banner.css';
import { Link } from "react-router-dom";

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
                        <Link to='/'>Start 2 Week free trial</Link>
                    </div>
                    <div className="banner-video">
                        <video autoPlay muted poster="https://hostbuddy.ai/wp-content/themes/hostbuddy/assets/img/video_img11.jpg">
                            <source src="https://hostbuddy.ai/wp-content/uploads/2024/02/Property-1Variant4-1.mp4" type="video/mp4" />
                            <source src="https://hostbuddy.ai/wp-content/uploads/2024/02/Property-1Variant4-1.mp4" type="video/ogg" />
                            Your browser does not support HTML video.
                        </video>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Banner;
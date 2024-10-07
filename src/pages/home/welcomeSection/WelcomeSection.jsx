import React from "react";
import "./WelcomeSection.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Review1 from "../../../public/img/home/host.png";
import Review2 from "../../../public/img/home/host1.png";
import Review3 from "../../../public/img/home/host2.png";

const Author = 'https://hostbuddylb.com/home/introduction/author1.webp';
const Author1 = 'https://hostbuddylb.com/home/introduction/author2.webp';
const Author2 = 'https://hostbuddylb.com/home/introduction/author.webp';

const welcomeBoxesData = [
  {
    title: "This Software is my Sleeping Pill",
    text: "HostBuddy solved my problem of having to reiterate the same property information to every guest, allowing for my workload to focus more on the growth of the company.",
    authorImg: Author,
    authorName: "Grant M.",
    authorDetails: "WestBound Rentals | 26 Listings",
  },
  {
    title: "HostBuddy works.",
    text: "HostBuddy has helped make my vacation rental business become more passive since I no longer need to be available for questions and help 24/7.",
    authorImg: Author1,
    authorName: "Tim U.",
    authorDetails: "Aztec Getaways | 42 Listings",
  },
  {
    title: "Incredible AI assistant",
    text: "My favorite part about HostBuddy AI is how easy it is to set up and use. It can import properties from your PMS and integrating it is an absolute breeze. Its responses are very human-like and it is a great tool to have especially when you are not available to answer messages.",
    authorImg: Author2,
    authorName: "Dylan W.",
    authorDetails: "ZoneSage | 3 Listings",
  },
];

const WelcomeSection = () => {
  return (
    <>
      <section className="welcome-sec">
        <Container>
          <div className="row align-items-center">
            <div className="col-sm-12 top-head">
              <div className="introduction-heading">
                <h2>The Global Choice for <strong>AI-Powered Guest Messaging</strong></h2>
              </div>
            </div>
            <div className="col-md-2">
              <div className="review-box1">
              <a href="https://www.capterra.com/p/10021407/HostBuddy-AI/reviews/">
                <img border="0" src="https://brand-assets.capterra.com/badge/148baf12-c098-4f51-bdba-c64e3851fb73.svg" />
              </a>
              <a href="null" style={{ marginTop: "10px", display: "inline-block" }}>
                <img border="0" src="https://brand-assets.softwareadvice.com/badge/762c7552-7655-4a9c-8612-0b9774480a07.png" />
              </a>
              </div>
            </div>
            <div className="col-md-8">
              <div className="review-text text-center introduction-heading">
                <h2>The Global Choice for <strong>AI-Powered Guest Messaging</strong></h2>
                <p style={{marginBottom: "10px"}}>
                  Created by hosts, for hosts, HostBuddy AI is the leading
                  messaging automation software in the short-term rental
                  industry. With the ability to communicate with your guests
                  directly through your property management system, HostBuddy AI
                  uses information about your properties to provide quality
                  support to your guests. Host with ease and let HostBuddy
                  handle guest questions, troubleshooting, and issue escalation
                  on your behalf.
                </p>
                <Link to='/ai-messaging'>Learn More &#8594;</Link>
              </div>
            </div>
            <div className="col-md-2">
              <div className="review-box1">
                <a href="https://www.getapp.com/hospitality-travel-software/a/hostbuddy-ai/reviews/">
                  <img border="0" src="https://brand-assets.getapp.com/badge/67d347a1-edef-4ac3-9150-8815443510fc.png" />
                </a>
              </div>
            </div>
          </div>
          <div className="row welcome-boxes">
            {welcomeBoxesData.map((box, index) => (
              <div className="col-lg-4" key={index}>
                <div className="welcome">
                  <div className="welcome-text">
                    <h4>{box.title}</h4>
                    <p>{box.text}</p>
                  </div>
                  <div className="welcome-author d-flex align-items-center gap-3 mt-3">
                    <div className="author-img">
                      <img src={box.authorImg} alt={`${box.authorName}`} />
                    </div>
                    <div className="author-detail">
                      <h5>{box.authorName}</h5>
                      <p>{box.authorDetails}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default WelcomeSection;

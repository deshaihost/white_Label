import React from "react";
import "./WelcomeSection.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Review1 from "../../../public/img/home/host.png";
import Review2 from "../../../public/img/home/host1.png";
import Review3 from "../../../public/img/home/host2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Andrew from "../../../helper/staticImage/homePage/Andrew.webp";
import Maggie from "../../../helper/staticImage/homePage/Maggie.webp";
import Steve from "../../../helper/staticImage/homePage/Steve.webp";

const Author = "https://hostbuddylb.com/home/introduction/author1.webp";
const Author1 = "https://hostbuddylb.com/home/introduction/author2.webp";
const Author2 = "https://hostbuddylb.com/home/introduction/author.webp";

const welcomeBoxesData = [
  {
    title: "Far Superior AI",
    text: (
      <>
        We were looking for an AI solution to help reduce the time required to
        respond to guest inquiries, and Hostbuddy is actually the second
        service/product we tried. It is
        <strong> far superior</strong> to the previous AI we tried.
      </>
    ),
    authorImg: Steve,
    authorName: "Steve A",
    authorDetails: "Velo Vacation Rentals | 50 listings",
  },
  {
    title: "Guest Messaging, Solved",
    text: (
      <>
        HostBuddy has helped our guests with <strong> troubleshooting </strong>{" "}
        WiFi, troubleshooting locks, and <strong> reducing confusion</strong>{" "}
        for entry instructions at properties with multiple units.
      </>
    ),
    authorImg: Andrew,
    authorName: "Andrew",
    authorDetails: "Stork STR | 21 listings",
  },
  {
    title: "Highly recommend it!",
    text: (
      <>
        HostBuddy AI has allowed me to <strong> sleep at night</strong>!
        HostBuddy has given me the peace of mind to turn off my phone at night
        and rest assured any
        <strong> guests will be taken care of</strong>. It’s a great,{" "}
        <strong> inexpensive </strong> tool that allows me to keep expenses low
        so I can <strong> focus on scaling </strong> my business.
      </>
    ),
    authorImg: Maggie,
    authorName: "Maggie V",
    authorDetails: "Everly Vacation Homes | 13 listings",
  },
  {
    title: "This Software is my Sleeping Pill",
    text: (
      <>
        HostBuddy <strong> solved my problem </strong> of having to reiterate
        the same property information to every guest, allowing for my workload
        to <strong> focus more on the growth </strong> of the company.
      </>
    ),
    authorImg: Author,
    authorName: "Grant M",
    authorDetails: " WestBound Rentals | 26 Listings",
  },
  {
    title: "HostBuddy works",
    text: (
      <>
        HostBuddy has helped make my vacation rental business become{" "}
        <strong> more passive </strong> since I no longer need to be available
        for questions and help 24/7.
      </>
    ),
    authorImg: Author1,
    authorName: "Tim U",
    authorDetails: "Aztec Getaways | 42 Listings",
  },
  {
    title: "Incredible AI assistant",
    text: (
      <>
        My favorite part about HostBuddy AI is how{" "}
        <strong> easy it is to set up </strong> and use. It can import
        properties from your <strong> PMS </strong> and integrating it is an{" "}
        <strong> absolute breeze </strong>. Its responses are{" "}
        <strong> very human-like </strong>
        and it is a great tool to have especially when you are not available to
        answer messages.
      </>
    ),
    authorImg: Author2,
    authorName: "Dylan W",
    authorDetails: "ZoneSage | 3 Listings",
  },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
}

const WelcomeSection = () => {
  var settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="welcome-sec">
        <Container>
          <div className="row align-items-center">
            <div className="col-sm-12 top-head">
              <div className="introduction-heading">
                <h2>
                  The Global Choice for{" "}
                  <strong>AI-Powered Guest Messaging</strong>
                </h2>
              </div>
            </div>
            <div className="col-md-2">
              <div className="review-box1">
                <a href="https://www.capterra.com/p/10021407/HostBuddy-AI/reviews/">
                  <img
                    border="0"
                    src="https://brand-assets.capterra.com/badge/148baf12-c098-4f51-bdba-c64e3851fb73.svg"
                  />
                </a>
                <a
                  href="null"
                  style={{ marginTop: "10px", display: "inline-block" }}
                >
                  <img
                    border="0"
                    src="https://brand-assets.softwareadvice.com/badge/762c7552-7655-4a9c-8612-0b9774480a07.png"
                  />
                </a>
              </div>
            </div>
            <div className="col-md-8">
              <div className="review-text text-center introduction-heading">
                <h2>
                  The Global Choice for{" "}
                  <strong>AI-Powered Guest Messaging</strong>
                </h2>
                <p style={{ marginBottom: "10px" }}>
                  Created by hosts, for hosts, HostBuddy AI is the leading
                  messaging automation software in the short-term rental
                  industry. With the ability to communicate with your guests
                  directly through your property management system, HostBuddy AI
                  uses information about your properties to provide quality
                  support to your guests. Host with ease and let HostBuddy
                  handle guest questions, troubleshooting, and issue escalation
                  on your behalf.
                </p>
                <Link to="/ai-messaging">Learn More &#8594;</Link>
              </div>
            </div>
            <div className="col-md-2">
              <div className="review-box1">
                <a href="https://www.getapp.com/hospitality-travel-software/a/hostbuddy-ai/reviews/">
                  <img
                    border="0"
                    src="https://brand-assets.getapp.com/badge/67d347a1-edef-4ac3-9150-8815443510fc.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div className="row welcome-boxes">
            <Slider {...settings}>
              {welcomeBoxesData.map((box, index) => (
                <div className="col-lg-12 px-2" key={index}>
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
            </Slider>
          </div>
        </Container>
      </section>
    </>
  );
};

export default WelcomeSection;

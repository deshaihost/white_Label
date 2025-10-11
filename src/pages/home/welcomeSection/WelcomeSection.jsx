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
import AlexS from "../../../helper/staticImage/homePage/AlexS.webp";
import AllisonC from "../../../helper/staticImage/homePage/AllisonC.webp";
import CalliN from "../../../helper/staticImage/homePage/CalliN.webp";
import CoryD from "../../../helper/staticImage/homePage/CoryD.webp";
import DannyW from "../../../helper/staticImage/homePage/DannyW.webp";
import DanW from "../../../helper/staticImage/homePage/DanW.webp";
import JaveusB from "../../../helper/staticImage/homePage/JaveusB.webp";
import JodieO from "../../../helper/staticImage/homePage/JodieO.webp";
import KarenG from "../../../helper/staticImage/homePage/KarenG.webp";
import MaggieV from "../../../helper/staticImage/homePage/MaggieV.webp";
import MattM from "../../../helper/staticImage/homePage/MattM.webp";
import MichelL from "../../../helper/staticImage/homePage/MichelL.webp";
import MikeB from "../../../helper/staticImage/homePage/MikeB.webp";
import MikeH from "../../../helper/staticImage/homePage/MikeH.webp";
import SteveA from "../../../helper/staticImage/homePage/SteveA.webp";
import Steve from "../../../helper/staticImage/homePage/Steve.webp";
import Jodie from "../../../helper/staticImage/homePage/whatTheCommunityIsSaying/Jodie.webp";

const Author = "https://hostbuddylb.com/home/introduction/author1.webp";
const Author1 = "https://hostbuddylb.com/home/introduction/author2.webp";
const Author2 = "https://hostbuddylb.com/home/introduction/author.webp";

const welcomeBoxesData = [
  {
    title: "Feels like magic",
    text: (
      <>
        Right out of the box, this thing started annihilating. <strong>It’s brilliant...</strong> it's<strong> automated 90%</strong> of our responses in two weeks. Our guest negative sentiments have gone down significantly, probably like 25%. Positives have gone up.
      </>
    ),
    authorImg: AlexS,
    authorName: "Alex Self",
    authorDetails: "Host Extraordinaires | 262 listings",
  },
  {
    title: "Far Superior AI",
    text: (
      <>
        We were looking for an AI solution to help reduce the time required to respond to guest inquiries and Hostbuddy is actually the second service/product we tried.  It is <strong>far superior</strong> to the previous AI we tried.
      </>
    ),
    authorImg: SteveA,
    authorName: "Steve A",
    authorDetails: "Velo Vacation Rentals | 64 listings",
  },
  {
    title: "A Game-Changer for Property Management Efficiency",
    text: (
      <>
        Our overall experience has been <strong>excellent</strong>. HostBuddy AI has drastically <strong>reduced our response time</strong> to guests, improved <strong>booking conversions</strong>, and helped us maintain <strong>high reviews</strong>. It feels like having an extra team member working 24/7 without missing a beat.
      </>
    ),
    authorImg: MattM,
    authorName: "Matt M",
    authorDetails: "Unwind Vacation Rentals | 50 Listings",
  },
  {
    title: "Highly Recommend",
    text: (
      <>
        Overall, I’ve had a <strong>great experience</strong> with HostBuddy and I would definitely recommend the program. The settings, program and support are <strong>fantastic</strong>.
      </>
    ),
    authorImg: CalliN,
    authorName: "Calli N",
    authorDetails: " Callin & Co. | 29 Listings",
  },
  {
    title: "Game changer",
    text: (
      <>
        Whether it's upselling for early check-in, late checkout, or even selling the gap days the day before arrival or day after checkout at a discount to those guests, it's been a <strong>game changer</strong>.
      </>
    ),
    authorImg: MikeB,
    authorName: "Mike Brown",
    authorDetails: "PBD Living | 27 Listings",
  },
  {
    title: "It answers better than me",
    text: (
      <>
        I really honestly can't say enough how awesome this software is. It answers things better than me... We're able to focus on pricing algorithms, advertising, and utilizing some different aspects that we didn't have time to before.
      </>
    ),
    authorImg: CoryD,
    authorName: "Cory Davis",
    authorDetails: "Summit Time Vacation Rentals | 24 listings",
  },
  {
    title: "Superior to anything else",
    text: (
      <>
        We tested two other platforms before HostBuddy, but the user interface that HostBuddy brings to the table was <strong>definitely superior</strong> to anything else that we've seen.
      </>
    ),
    authorImg: DanW,
    authorName: "Dan Wise",
    authorDetails: " Wise Getaways | 18 Listings",
  },
  {
    title: "The Game Changer That Freed My Time",
    text: (
      <>
        From the moment I integrated HostBuddy AI into my PMS, it <strong>completely transformed</strong> how I handle guest communication. I used to spend my days tethered to my phone, constantly answering queries from guests and potential guests. Now, HostBuddy AI does it all and does it <strong>brilliantly</strong>.
      </>
    ),
    authorImg: KarenG,
    authorName: "Karen G",
    authorDetails: "Stylish Stays | 16 Listings",
  },
  {
    title: "As Essential As Dynamic Pricing",
    text: (
      <>
        <strong>HostBuddy has changed my business and my life</strong>. I have a hundred percent response rate, and my reviews have gone right up in communications. Everyone talks about how you have to have dynamic pricing as a host - I think everyone should be talking about HostBuddy the same way.
      </>
    ),
    authorImg: JodieO,
    authorName: "Jodie Odlin",
    authorDetails: "Tetbury Escapes | 15 Listings",
  },
  {
    title: "You’ll thank me later!",
    text: (
      <>
        I almost don’t want to share how amazing HostBuddy is because it gives me such an edge. But seriously, if you're a host and feeling overwhelmed, this is your answer. It's like hiring a superhost assistant that works 24/7 and never drops the ball. Get it now. You’ll thank me later!
      </>
    ),
    authorImg: AllisonC,
    authorName: "Allison C",
    authorDetails: "Crafty Hosting | 15 listings",
  },
  {
    title: "Highly recommend it!",
    text: (
      <>
        HostBuddy AI has allowed me to sleep at night! HostBuddy has given me the peace of mind to turn off my phone at night and rest assured any <strong>guest will be taken care of</strong>. It’s a great, <strong>inexpensive tool</strong> that allows me to keep expenses low so I can <strong>focus on scaling</strong> my business.
      </>
    ),
    authorImg: MaggieV,
    authorName: "Maggie Vineyard",
    authorDetails: "Everly Vacation Homes | 13 Listings",
  },
  {
    title: "More Time for What Matters",
    text: (
      <>
        HostBuddy has been a huge help with our guest messages. Their AI handles the day-to-day communication quickly and naturally, which <strong>lets us spend more time on growing our business</strong> and improving our properties.
      </>
    ),
    authorImg: MichelL,
    authorName: "Michel Lopez",
    authorDetails: "Villa Paraiso Vacation Rentals | 13 Listings",
  },
  {
    title: "Exceeded my expectations",
    text: (
      <>
        I didn't expect it to come in and have such a dynamic impact on the business. It's definitely exceeded my expectations. HostBuddy is definitely a <strong>lifesaver</strong>.
      </>
    ),
    authorImg: JaveusB,
    authorName: "Javeus Boddie",
    authorDetails: "Top Tier Estates | 11 Listings",
  },
  {
    title: "Upgraded to HostBuddy",
    text: (
      <>
        We transitioned from a competitor to upgrade, and our team has been loving using it, and it really just <strong>frees up a lot more time</strong> for them to be able to do higher-value tasks.
      </>
    ),
    authorImg: MikeH,
    authorName: "Mike High",
    authorDetails: "Shaka Stays | 9 Listings",
  },
  {
    title: "Easy to Use AI",
    text: (
      <>
        This software is <strong>so amazing!</strong> It's easy to use - just feed it and it'll learn! I can copy it for multiple properties as well. I really enjoy watching it respond to my guests.
      </>
    ),
    authorImg: DannyW,
    authorName: "Danny W",
    authorDetails: "My Blissful Retreats | 7 Listings",
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
    infinite: true, // Ensures that the slider loops back to the beginning
    arrows: true,
    speed: 400, // Slide speed of 0.4 seconds (400ms)
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 6000, // Pause for 6 seconds after all slides are visible
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
          slidesPerRow: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 2,
          slidesPerRow: 1,
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

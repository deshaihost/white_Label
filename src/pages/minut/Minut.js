import React, { useRef } from "react";
import "./Minut.css";
import BannerImage from "../../helper/staticImage/banner-backgound.png";
import Official from "../../helper/staticImage/banner-official.png";
import ListOne from "../../helper/staticImage/listone.png";
import { Link } from "react-router-dom";
import Listthree from "../../helper/staticImage/listthree.png";
import ListTwo from "../../helper/staticImage/listtwo.png";
import { HiArrowLongRight } from "react-icons/hi2";
import CardTwo from "../../helper/staticImage/cardtwo (1).png";
import CardThree from "../../helper/staticImage/cardthree.png";
import CardFour from "../../helper/staticImage/cardfour.png";
import LogoCircle from "../../helper/staticImage/logo-circle.png";
import Cardone from "../../helper/staticImage/cardone.png";
import UserIcon from "../../helper/staticImage/userimg.png";
import Circle from "../../helper/staticImage/circle.png";
import Linking from "../../helper/staticImage/Link.png";
import ShapeLeft from "../../helper/staticImage/shape.png";

const Minut = () => {
  const boxRef = useRef(null);

  const scrollToBox = () => {
    boxRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      {/* =============Banner section start========= */}
      <section className="banner-mint">
        <img src={BannerImage} alt="logo" className="banner-image" />
        <div className="container">
          <div className="official-mint">
            <p>Official partners</p>
            <div>
              <img src={Official} alt="logo" />
            </div>
          </div>
          <h1>
            HostBuddy AI offers Turno users the ability to automatically send
            messages and communicate with{" "}
            <span>
              your guests based on cleaning events at your properties.
            </span>
          </h1>
        </div>
      </section>
      {/* =============Banner section end========= */}

      {/* =============Lising section start========= */}
      <section className="mint-listing">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="mint-listing-item">
                <img src={ListOne} alt="logo" />
                <div className="item-content">
                  <h2>Short Term Rental Messaging On Autopilot</h2>
                  <Link to="/" className="btn-link">
                    Learn More <HiArrowLongRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="mint-listing-item">
                <img src={ListTwo} alt="logo" />
                <div className="item-content">
                  <h2>Unmatched Natural Conversation</h2>
                  <Link
                    to="https://www.hostbuddy.ai/ai-messaging"
                    className="btn-link"
                  >
                    Learn More <HiArrowLongRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="mint-listing-item">
                <img src={Listthree} alt="logo" />
                <div className="item-content">
                  <h2>Templated Messages For Everything</h2>
                  <Link
                    to="https://www.hostbuddy.ai/smart-templates"
                    className="btn-link"
                  >
                    Learn More <HiArrowLongRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============Lising section end========= */}

      {/* =============connect section start========= */}

      <section className="connect-mint">
        <div className="container">
          <div className="connect-inner">
            <h2>
              Connect your Turno account to HostBuddy to trigger messaging based
              on cleaning events at your properties.
            </h2>
            <p>
              For example, automatically send a message to your guests as soon
              as a cleaning is finished to offer early check-in.
            </p>
            <div className="connect-btn">
              <Link
                to=""
                className="connect-btn-link nav-btn nav-btn-outline link-btn filled-btn"
              >
                Book Demo
              </Link>
              <button
                to="connect"
                onClick={scrollToBox}
                // smooth={true}
                duration={500}
                className="btn-link nav-btn nav-btn-primary link-btn outline-btn"
              >
                Connect Your Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =============connect section end========= */}
      {/* =============logo-circle section end========= */}

      <section className="logo-circle">
        <div className="container">
          <img src={LogoCircle} alt="" />
          <div className="logo-content">
            <h2>
              By <span>integrating with HostBuddy</span> Al, users can:
            </h2>
          </div>
          <div className="row card-row">
            <div className="col-lg-6 col-md-6">
              <div className="row card-main">
                <div className="col-lg-5">
                  <div className="card-image">
                    <img src={Cardone} alt="" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card-content">
                    <p>
                      Tailor each message using HostBuddy AI, which adapts the
                      content for a personal touch that resonates with guests,
                      enhancing their overall experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="row card-main">
                <div className="col-lg-5">
                  <div className="card-image">
                    <img src={CardTwo} alt="" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card-content">
                    <p>
                      Use Al to tailor each message, creating more personalized
                      communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="row card-main">
                <div className="col-lg-5">
                  <div className="card-image">
                    <img src={CardThree} alt="" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card-content">
                    <p>
                      Allow HostBuddy to take over guest communication after
                      initial contact has been made.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="row card-main">
                <div className="col-lg-5">
                  <div className="card-image">
                    <img src={CardFour} alt="" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card-content">
                    <p>
                      Set advanced variables to specify which guests will
                      receive notifications, and when.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============logo-circle section end========= */}

      {/* =============To get hostbuddy section start========= */}
      <div ref={boxRef}>
        <section className="to-get-hostbuddy">
          <div className="container">
            <div class="logo-content">
              <h2>
                To get HostBuddy AI connected to your{" "}
                <span>Turno account:</span>
              </h2>
            </div>
            <div className="row get-row" id="connect">
              <div className="col-lg-4 col-md-6">
                <div className="card-main">
                  <div className="card-image">
                    <img src={UserIcon} alt="" />
                  </div>
                  <div className="card-content">
                    <h5>Step 01</h5>
                    <p>
                       Log in to your HostBuddy AI account. Don’t have one?{" "}
                      <Link to="/signup">Sign up for free</Link> - it’s easy
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card-main">
                  <div className="card-image">
                    <img src={Circle} alt="" />
                  </div>
                  <div className="card-content">
                    <h5>Step 02</h5>
                    <p>
                       In HostBuddy, navigate to Settings &gt; Integrations and
                      click on Turno. You will be redirected to Turno’s
                      authorization portal where you can log into your account
                      and authorize the connection to HostBuddy AI.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card-main">
                  <div className="card-image">
                    <img src={Linking} alt="" />
                  </div>
                  <div className="card-content">
                    <h5>Step 03</h5>
                    <p>
                      Back in HostBuddy, on the Integrations page, you can now
                      view your Turno properties and link them to your HostBuddy
                      properties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="connect-btn">
              <Link
                to=""
                className="connect-btn-link nav-btn nav-btn-outline link-btn filled-btn"
              >
                Book Demo
              </Link>
              <Link
                to="/signup"
                className="btn-link nav-btn nav-btn-primary link-btn outline-btn"
              >
                Sign up
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* =============To get hostbuddy section end========= */}
    </div>
  );
};

export default Minut;

import React, { useState } from "react";
import IntiLogo from "../../../src/helper/staticImage/Copy of 1 (3).webp";
import Guesty from "../../../src/helper/staticImage/guesty.webp";
import Lodgify from "../../../src/helper/staticImage/lodgify.webp";
import Hostfully from "../../../src/helper/staticImage/hostfully.webp";
import Ownerrez from "../../../src/helper/staticImage/ownerrez.webp";
import Hostaway from "../../../src/helper/staticImage/hostaway.webp";
import Hospitable from "../../../src/helper/staticImage/hospitable.webp";
import Smoobu from "../../../src/helper/staticImage/smoobu.webp";
import Tokeet from "../../../src/helper/staticImage/tokeet.webp";
import Beds from "../../../src/helper/staticImage/beds.webp";
import Minut from "../../../src/helper/staticImage/minut.webp";
import Turno from "../../../src/helper/staticImage/turno.webp";
import SearchMyCal from "../../../src/helper/staticImage/searchmycal_logo.webp";
import "./Integration.css";
import ContactUs from "../meetHostBuddy/discover/contactUs/ContactUs";
import { Helmet } from 'react-helmet';

const HostexImg = 'https://hostbuddylb.com/partners/hostex_logo_en.webp';
const ReslyImg = 'https://hostbuddylb.com/partners/resly_img.webp'
const SmilyImg = 'https://hostbuddylb.com/partners/SmilyLogo.webp';
const TidyImg = 'https://hostbuddylb.com/partners/tidy_logo_black_text.svg';

const Integrations = () => {
  const [contactModalShow, setContactModalShow] = useState(false);

  return (
    <>
      <Helmet>
        <title>Integrations | AI-Powered STR Tools by HostBuddy</title>
        <meta name="title" content="Integrations | AI-Powered STR Tools by HostBuddy" />
        <meta name="description" content="Explore seamless integrations with top Property Management Systems. HostBuddy's AI tools automate guest messaging and simplify short-term rental hosting." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png" />
        <meta property="og:title" content="Integrations | AI-Powered STR Tools by HostBuddy" />
        <meta property="og:description" content="Explore seamless integrations with top Property Management Systems. HostBuddy's AI tools automate guest messaging and simplify short-term rental hosting." />
        <meta property="og:image" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png" />
        <meta property="twitter:title" content="Integrations | AI-Powered STR Tools by HostBuddy" />
        <meta property="twitter:description" content="Explore seamless integrations with top Property Management Systems. HostBuddy's AI tools automate guest messaging and simplify short-term rental hosting." />
        <meta property="twitter:image" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png" />
        <link rel="canonical" href="https://www.hostbuddy.ai/integrations" />
      </Helmet>
    <div className="integrations">
      <div className="container">
        <div className="intre-heading">
          <h1>Integrations</h1>
          <img src={IntiLogo} alt="" />
        </div>
        <div className="intre-content">
          <h2>Streamlined PMS Integrations</h2>
          <p>HostBuddy integrates effortlessly with popular Property Management Systems (PMS) such as Guesty, Hostaway, and OwnerRez, allowing you to synchronize guest data, reservations, and property details in real-time. This seamless connection enables automated messaging and streamlined operations for an efficient hosting experience.</p>
        </div>
        <div className="intre-content">
          <h2>Maximize Efficiency with AI-Powered Guest Messaging</h2>
          <p>Our AI-powered platform revolutionizes the way short-term rental hosts manage their rentals. With 24/7 guest messaging automation, issue troubleshooting, and booking support, HostBuddy reduces your workload while ensuring guest satisfaction. Whether you're managing a single vacation home or multiple properties, HostBuddy adapts to meet your unique hosting needs.</p>
        </div>
        
        <div className="inter-box row">
          <div className="col-lg-4 col-sm-6">
            <a href="https://hospitable.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Hospitable} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.guesty.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Guesty} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.lodgify.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Lodgify} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.hostfully.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Hostfully} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.ownerrez.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Ownerrez} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.hostaway.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Hostaway} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href={'https://www.resly.com.au/'} target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={ReslyImg} alt="" />
              </div>
            </a>
          </div>
          {/*
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.smoobu.com/new/en/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Smoobu} alt="" />
              </div>
            </a>
          </div>
          */}
          <div className="col-lg-4 col-sm-6">
            <a href="https://beds24.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Beds} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.smily.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={SmilyImg} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.tokeet.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Tokeet} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href={'https://hostex.io/'} target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={HostexImg} alt="" />
              </div>
            </a>
          </div>
        </div>
        <div className="intre-content">
          <h2>Other Software</h2>
          <p>HostBuddy connects to your essential management tools, superchanging your hosting experience.</p>
        </div>
        <div className="intre-content">
          <h2>Enhance Guest Experiences</h2>
          <p>HostBuddy goes beyond basic automation by offering features that elevate your guest experiences. From upselling local experiences and late checkouts to personalized welcome messages, these integrations help you maximize the effectiveness of your automated guest communication.</p>
        </div>
        <div className="inter-box row">
          <div className="col-lg-4 col-sm-6">
            <a href="https://www.minut.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Minut} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://turno.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={Turno} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://searchmycal.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={SearchMyCal} alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6">
            <a href="https://tidy.com/" target="_blank" rel="noopener noreferrer">
              <div className="image-boc-inter">
                <img src={TidyImg} alt="" />
              </div>
            </a>
            </div>
        </div>
        <div className="software-list">
          <h2>Don't see your software listed?</h2>
          <button onClick={() => {setContactModalShow(true);}}>
            Let Us Know!
          </button>
        </div>
      </div>
      <ContactUs show={contactModalShow} onHide={() => setContactModalShow(false)}/>
    </div>
    </>

  );
};

export default Integrations;
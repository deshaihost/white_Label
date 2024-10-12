import React from 'react'
import './AboutUs.css'
import Logo from '../../../src/helper/staticImage/HostBuddysmalllogo.webp';
import Jay from '../../../src/helper/staticImage/Jay.webp';
import Linkedin from '../../../src/helper/staticImage/LinkedIn.webp';
import Michael from '../../../src/helper/staticImage/Michael.webp';
import Sam from '../../../src/helper/staticImage/Sam.webp';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { red } from '@mui/material/colors';

const AboutUs = () => {
    return (
        <div className='container'>

            <Helmet>
                <title>About Us | Meet the Founders Behind HostBuddy AI</title>
                <meta name="title" content="About Us | Meet the Founders Behind HostBuddy AI" />
                <meta name="description" content="Discover the HostBuddy AI team and our mission to revolutionize short-term rentals with innovative AI solutions for hosts." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About Us | Meet the Founders Behind HostBuddy AI" />
                <meta property="og:description" content="Discover the HostBuddy AI team and our mission to revolutionize short-term rentals with innovative AI solutions for hosts." />
                <meta property="og:image" content="https://hostbuddylb.com/blog/automate_str_6-25/HostBuddy_logo.webp" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="About Us | Meet the Founders Behind HostBuddy AI" />
                <meta property="twitter:description" content="Discover the HostBuddy AI team and our mission to revolutionize short-term rentals with innovative AI solutions for hosts." />
                <meta property="twitter:image" content="https://hostbuddylb.com/blog/automate_str_6-25/HostBuddy_logo.webp" />
                <link rel="canonical" href="https://www.hostbuddy.ai/about-us" />
            </Helmet>
            <div className='about-us'>
                <h1>About Us</h1>
                <img src={Logo} alt="Logo" />
            </div>
            <div className='founder'>
                <h2>Co-Founding Team</h2>
                <div className='row'>
                    <div className='col-lg-4 col-md-6'>
                        <div className='team-outer'>
                            <div className='team'>
                                <div className='member-image'>
                                    <img src={Jay} alt="Logo" />
                                    <Link to="https://www.linkedin.com/in/jaytullrich/" target="_blank" rel="noopener noreferrer">
                                      <img src={Linkedin} alt="Logo" className='linkedin' />
                                    </Link>
                                </div>
                                <div className='member-name'>
                                    <h3>Jay Ullrich</h3>
                                    <p>40+ Unit STR Porfolio<br/>Civil Engineer to STR Expert</p>
                                </div>
                                <div className='partner'>
                                    <img src={Logo} alt="Logo" />
                                    <p>Partnership and Marketing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <div className='team-outer'>
                            <div className='team'>
                                <div className='member-image'>
                                    <img src={Michael} alt="Logo" />
                                    <Link to="https://www.linkedin.com/in/michael-boddie-9095b6165/" target="_blank" rel="noopener noreferrer">
                                      <img src={Linkedin} alt="Logo" className='linkedin' />
                                    </Link>
                                </div>
                                <div className='member-name'>
                                    <h3>Michael Boddie</h3>
                                    <p>AI and Machine Learning Expert<br/>Former Qualcomm Engineer </p>
                                </div>
                                <div className='partner'>
                                    <img src={Logo} alt="Logo" />
                                    <p>Technical Lead</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <div className='team-outer'>
                            <div className='team'>
                                <div className='member-image'>
                                    <img src={Sam} alt="Logo" />
                                    <Link to="https://www.linkedin.com/in/samuel-mayes/" target="_blank" rel="noopener noreferrer">
                                      <img src={Linkedin} alt="Logo" className='linkedin' />
                                    </Link>
                                </div>
                                <div className='member-name'>
                                    <h3>Sam Mayes</h3>
                                    <p>40+ Unit STR Porfolio<br/>Sales Strategist to STR Expert</p>
                                </div>
                                <div className='partner'>
                                    <img src={Logo} alt="Logo" />
                                    <p>Product and Customer Success</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='founder-desc'>
                <h2>Built by Hosts, for Hosts: The HostBuddy AI Story</h2>
                <p>In the dynamic world of short-term rentals, <a href="/" target='_blank' rel='noreferrer noopener'>HostBuddy AI</a> stands as a symbol of innovation driven by necessity. Our journey is built on passion, resilience, and an intimate understanding of the hosting experience.</p>
                <h3>Founders and Visionaries</h3>
                <p>In 2021, co-founders <strong>Sam Mayes</strong> and <strong>Jay Ullrich</strong> began their journey in the short-term rental (STR) industry by establishing a management company in San Diego. Today, their team manages over 40 units, consistently delivering operational excellence and guest satisfaction.</p>
                <p>As the business expanded, one challenge became clear to almost every host they encountered: the absence of reliable, affordable, and continuous 24/7 guest support. This gap in the industry was more than just an inconvenience—it was a problem that demanded a solution. Hosts needed something more than a traditional management tool; they needed a revolutionary approach to guest communication that would transform their operations.</p>
                <h3>The Birth of HostBuddy AI</h3>
                <p>In 2023, a pivotal moment arrived. We combined our experiences in STR management with the technical expertise of Michael Boddie, a highly skilled software developer from a prominent tech company. Together, we set out to create what we always wished existed: a truly intelligent, host-centric AI solution.</p>
                <p>HostBuddy AI isn't just another tech product. It's the culmination of our experiences, frustrations, and aspirations as hosts. We've poured our knowledge of the STR business – every nuance, every pain point – into creating a system that truly understands what hosts need.</p>
                <h3>Why HostBuddy AI Stands Apart </h3>
                <ol>
                    <li><b className='why-stand-options'>Unmatched AI Conversation:</b> Our AI doesn't just respond; it converses like a superhost. It's hospitable, solution-focused, and most importantly, it sounds human.
                    </li>
                    <li><b className='why-stand-options'>Host-Centric Features: </b>Every aspect of HostBuddy AI is crafted with hosts in mind. From automated upsells to smart review management, we're constantly innovating to boost your bottom line.</li>
                    <li>
                        <b className='why-stand-options'>Affordability Without Compromise:</b> We believe in providing top-tier service without breaking the bank. Our pricing reflects our commitment to making excellence accessible to all hosts.
                    </li>
                    <li>
                        <b className='why-stand-options'>A Team That Understands: </b>We're not just developers; we're active hosts. We live and breathe STR, bringing a level of industry insight that's unparalleled in the software space.
                    </li>
                    <li>
                        <b className='why-stand-options'>Personalized Support: </b>We work directly with our users, ensuring that HostBuddy AI evolves to meet the real needs of hosts like you.
                    </li>
                </ol>
                <h3>Our Vision for the Future</h3>
                <p>As we look ahead, our mission remains clear: to empower hosts with the tools they need to thrive in an increasingly competitive market. We're not just automating tasks; we're elevating the entire hosting experience.
                </p>
                <p>With HostBuddy AI, you're free to focus on what truly matters – creating unforgettable experiences for your guests while maximizing your property's potential.</p>
                <h3>Join the HostBuddy Revolution</h3>
                <p>We invite you to <a href="/signup" target='_blank' rel='noreferrer noopener'>be part of this exciting journey</a>. For hosts managing multiple properties and leveraging property management systems, HostBuddy AI is designed to scale with your business, adapt to your unique needs, and consistently deliver results that impact your bottom line.
                </p>
                <p>Experience the future of hosting – where AI meets genuine hospitality. Let's redefine the short-term rental industry together, one satisfied guest at a time.
                </p>
                <p>Welcome to HostBuddy AI – Where Every Host Becomes a Superhost.</p>
                <p className='mt-3'><em>Jay Ullrich, Sam Mayes, and Michael Boddie</em><br></br>
                    <em>Co-founders, HostBuddy AI</em>
                </p>
            </div>
        </div>
    )
}

export default AboutUs
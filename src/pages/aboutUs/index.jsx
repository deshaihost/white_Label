import React from 'react'
import './AboutUs.css'
import Logo from '../../../src/helper/staticImage/HostBuddysmalllogo.png';
import Jay from '../../../src/helper/staticImage/Jay.png';
import Linkedin from '../../../src/helper/staticImage/LinkedIn.png';
import Michael from '../../../src/helper/staticImage/Michael.jpg';
import Sam from '../../../src/helper/staticImage/Sam.jpg';
import { Link } from 'react-router-dom';
const AboutUs = () => {
    return (
        <div className='container'>
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
                                    <Link to="#">
                                    <img src={Linkedin} alt="Logo" className='linkedin' />
                                    </Link>
                                </div>
                                <div className='member-name'>
                                    <h3>Jay Ullrich</h3>
                                    <p>40+ Unit STR Porfolio Civil Engineer to STR Exprt</p>
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
                                    <Link to="#">
                                    <img src={Linkedin} alt="Logo" className='linkedin' />
                                    </Link>
                                </div>
                                <div className='member-name'>
                                    <h3>Michael Boddie</h3>
                                    <p>AI and Machine learning Exprt Former Qualcomm Engineer </p>
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
                                    <Link to="#"><img src={Linkedin} alt="Logo" className='linkedin' /></Link>
                                </div>
                                <div className='member-name'>
                                    <h3>Sam Mayes</h3>
                                    <p>40+ Unit STR Porfolio Sales strategist to STR Expert</p>
                                </div>
                                <div className='partner'>
                                    <img src={Logo} alt="Logo" />
                                    <p>Product and Customer Exprt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='founder-desc'>
                <h2>Built by Hosts, for Hosts: The HostBuddy AI Story</h2>
                <p>In the ever-evolving world of short-term rentals, HostBuddy AI stands as a testament to innovation born from necessity. Our journey is one of passion, perseverance, and a deep understanding of the hosting experience.
                </p>
                <h3>Founders and Visionaries</h3>
                <p>In 2021, our journey in the STR industry began when Sam and Jay built a management company from the ground up in San Diego. Today, our team proudly oversees 40 units, each showcasing our commitment to efficiency and guest satisfaction.</p>
                <p>As our business grew, we encountered a significant challenge that resonated with nearly every host we spoke to: the lack of reliable, affordable, 24/7 guest coverage. This widespread issue was more than just an inconvenience; it was a critical gap in the STR industry that demanded attention. It became clear that hosts needed more than just another management tool – they needed a revolutionary approach to guest communication that could transform their operations.</p>
                <h3>The Birth of HostBuddy AI</h3>
                <p>In 2023, a pivotal moment arrived. We combined our experiences in STR management with the technical expertise of Michael Boddie, a highly skilled software developer from a prominent tech company. Together, we set out to create what we always wished existed: a truly intelligent, host-centric AI solution.</p>
                <p>HostBuddy AI isn't just another tech product. It's the culmination of our experiences, frustrations, and aspirations as hosts. We've poured our knowledge of the STR business – every nuance, every pain point – into creating a system that truly understands what hosts need.</p>
                <h3>Why HostBuddy AI Stands Apart </h3>
                <ol>
                    <li><b>Unmatched AI Conversation:</b> Our AI doesn't just respond; it converses like a superhost. It's hospitable, solution-focused, and most importantly, it sounds human.
                    </li>
                    <li><b>Host-Centric Features: </b>Every aspect of HostBuddy AI is crafted with hosts in mind. From automated upsells to smart review management, we're constantly innovating to boost your bottom line.</li>
                    <li>
                        <b>Affordability Without Compromise:</b> We believe in providing top-tier service without breaking the bank. Our pricing reflects our commitment to making excellence accessible to all hosts.
                    </li>
                    <li>
                        <b>A Team That Understands: </b>We're not just developers; we're active hosts. We live and breathe STR, bringing a level of industry insight that's unparalleled in the software space.
                    </li>
                    <li>
                        <b>Personalized Support: </b>We work directly with our users, ensuring that HostBuddy AI evolves to meet the real needs of hosts like you.
                    </li>
                </ol>
                <h3>Our Vision for the Future</h3>
                <p>As we look ahead, our mission remains clear: to empower hosts with the tools they need to thrive in an increasingly competitive market. We're not just automating tasks; we're elevating the entire hosting experience.
                </p>
                <p>With HostBuddy AI, you're free to focus on what truly matters – creating unforgettable experiences for your guests while maximizing your property's potential.</p>
                <h3>Join the HostBuddy Revolution</h3>
                <p>We invite you to be part of this exciting journey. For hosts managing multiple properties and leveraging property management systems, HostBuddy AI is designed to scale with your business, adapt to your unique needs, and consistently deliver results that impact your bottom line.
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
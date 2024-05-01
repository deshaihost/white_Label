import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './setup.css';
import SetupImgOne from '../../../public/img/MeetHostbuddy/signup_form.png';
import SetupImgTwo from '../../../public/img/MeetHostbuddy/Property_customization.png';
import SetupImgThree from '../../../public/img/MeetHostbuddy/hostbuddy_convo.png';
import SetupImgFour from '../../../public/img/MeetHostbuddy/connect.png';
import SetupImgFive from '../../../public/img/MeetHostbuddy/relax.png';

const Setup = () => {
    const [currentItem, setCurrentItem] = useState(1);
    const [maxItems, setMaxItems] = useState(0);
    const sliderRef = useRef(null);
    const items = [
        {
            heading: 'Sign Up',
            text: 'Begin your journey by signing up using your email. It’s quick and easy, providing immediate access to exploring your new Hostbuddy Dashboard.',
            img: SetupImgOne
        },
        {
            heading: 'Customize Your HostBuddy',
            text: 'Tailor your HostBuddy to perfectly fit your needs. Our team will guide you through the process of inputting essential information, ensuring HostBuddy is equipped to support your properties and business efficiently.',
            img: SetupImgTwo
        },
        {
            heading: 'Test Your HostBuddy',
            text: 'Before going live, put HostBuddy to the test. Ensure all responses and interactions are aligned with your business’s unique requirements and standards. This step guarantees that HostBuddy will provide your guests with the best possible experience.',
            img: SetupImgThree
        },
        {
            heading: 'Connect To Your Guests',
            text: 'Integrate each property’s unique HostBuddy into your listing channels for seamless guest interaction. Alternatively, use a sharable link to connect directly with your guests. Depending on your chosen package, we’ll help integrate HostBuddy into your business in a way that best suits your needs.',
            img: SetupImgFour
        },
        {
            heading: 'Sit Back and Relax',
            text: 'HostBuddy is powered by state-of-the-art AI technology which means you can rest assured that your properties are in good hands. Enjoy peace of mind knowing your guests are receiving top-notch assistance and support.',
            img: SetupImgFive
        },
    ];

    useEffect(() => {
        const itemsCount = items.length;
        setMaxItems(itemsCount);
    }, []);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            const deltaY = e.deltaY;
            const slickSlider = sliderRef.current;

            if (slickSlider) {
                if (deltaY < 0) {
                    slickSlider.slickPrev();
                } else {
                    slickSlider.slickNext();
                }
            }
        };

        const sliderWrapper = document.querySelector('.slider_wrapper');
        sliderWrapper.addEventListener('wheel', handleWheel);

        return () => {
            sliderWrapper.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        vertical: true,
        draggable: true,
        adaptiveHeight: true,
        speed: 500,
        fade: false,
        afterChange: (index) => setCurrentItem(index + 1),
    };

    return (
        <section className="setup">
            <Container>
                <div className="heading-box">
                    <h2>How to Setup HostBuddy AI</h2>
                </div>
                <div className="slider-container" style={{display: 'flex'}}>
                    <div className="item_counter_box">
                        <span className="current_item">{currentItem < 10 ? `0${currentItem}` : currentItem}</span>
                        <div className="bar_track">
                            <div className="active_bar" style={{ height: `${(currentItem / maxItems) * 100}%` }}></div>
                        </div>
                        <span className="maxitems">{maxItems < 10 ? `0${maxItems}` : maxItems}</span>
                    </div>
                    <div className="slider_wrapper">
                        <Slider className="setup_slider" {...settings} ref={sliderRef}>
                            {items.map((data, i) => (
                                <div className="item" key={i}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="setup-content">
                                                <h4 className={`step${i + 1}`}>STEP #{i + 1}</h4>
                                                <h3>{data.heading}</h3>
                                                <p>{data.text}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="setup-img">
                                                <img src={data.img} alt={`Step ${i + 1}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Setup;

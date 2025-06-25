import React, { useState, useEffect, useRef } from 'react';
import './SlidingComponent.css';

// Import images
import summitTimes from './images/Summit_Times.png';
import selectStays from './images/select_stays.png';
import nestVilla from './images/NestVilla.png';
import uniqueBnB from './images/UniqueBnB.png';

const SlidingComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  const images = [
    { id: 1, src: summitTimes, alt: 'Summit Times' },
    { id: 2, src: selectStays, alt: 'Select Stays' },
    { id: 3, src: nestVilla, alt: 'NestVilla' },
    { 
      id: 4, 
      src: uniqueBnB, 
      alt: 'UniqueBnB',
      style: { 
        maxHeight: '65px', 
        objectFit: 'scale-down', 
        marginTop: '-5px' 
      }
    },
  ];

  // Determine how many items to show based on screen size
  const getItemsToShow = () => {
    if (window.innerWidth < 768) {
      return 1; // Mobile: show 1 image
    } else {
      return 4; // Desktop: show 4 images
    }
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  // Update items to show on window resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsToShow = getItemsToShow();
      
      // If switching between mobile and desktop views
      if (newItemsToShow !== itemsToShow) {
        // Reset to first slide when switching between views
        setCurrentIndex(0);
        setItemsToShow(newItemsToShow);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsToShow]);
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Handle navigation differently for mobile and desktop
      if (itemsToShow === 1) {
        // For mobile, wrap around from first to last image
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      } else {
        // For desktop, stop at the first image
        return Math.max(0, prevIndex - 1);
      }
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Handle navigation differently for mobile and desktop
      if (itemsToShow === 1) {
        // For mobile, wrap around from last to first image
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      } else {
        // For desktop, stop at the last possible position
        return Math.min(images.length - itemsToShow, prevIndex + 1);
      }
    });
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };
  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (itemsToShow === 1) {
        // For mobile: go to the next image or back to first
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // For desktop: cycle through available scroll positions
        setCurrentIndex((prevIndex) => {
          const maxIndex = images.length - itemsToShow;
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, itemsToShow, images.length]);

  return (
    <div className="sliding-component-container">
      <h2 className="sliding-component-title">Trusted By Leading Property Managers</h2>
      
      <div className="sliding-component">        <button 
          className="nav-button prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div 
          className="slider-content"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >          <div 
            className="slider-track" 
            style={{ 
              transform: itemsToShow === 1 
                ? `translateX(-${currentIndex * 100}%)` // For mobile: move one full slide at a time
                : `translateX(-${currentIndex * (100 / itemsToShow)}%)`, // For desktop
              width: `${(images.length / itemsToShow) * 100}%`
            }}
          >            {images.map((image) => (              <div 
                key={image.id} 
                className="slide-item"
                style={{ 
                  width: itemsToShow === 1 
                    ? '100%' // Full width for mobile
                    : `${100 / images.length}%` // Divided width for desktop
                }}
              >                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className={image.alt === 'UniqueBnB' ? 'unique-bnb-logo' : ''}
                  style={image.style || {}}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="nav-button next" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
        {/* <div className="slider-dots">
        {itemsToShow === 1 
          // For mobile, show one dot per image
          ? images.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))
          // For desktop, show dots for scrollable positions
          : Array.from({ length: images.length - itemsToShow + 1 }).map((_, index) => (
            <span 
              key={index} 
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))
        }
      </div> */}
    </div>
  );
};

export default SlidingComponent;

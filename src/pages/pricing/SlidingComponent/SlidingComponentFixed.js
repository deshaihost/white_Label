import React, { useState, useEffect, useRef } from 'react';
import './SlidingComponentFixed.css';

// Import images
import summitTimes from './images/Summit_Times.png';
import selectStays from './images/select_stays.png';
import nestVilla from './images/NestVilla.png';
import uniqueBnB from './images/UniqueBnB.png';

const SlidingComponentFixed = () => {
  // State for tracking current slide and touch events
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // References
  const sliderRef = useRef(null);
  const autoScrollTimerRef = useRef(null);
  
  // Define image data
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
  
  // Check if we're on mobile based on window width
  const checkIsMobile = () => window.innerWidth < 768;

  // Set initial mobile state and add resize listener
  useEffect(() => {
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = checkIsMobile();
      
      // Only update if the state actually changed
      if (wasMobile !== nowMobile) {
        setIsMobile(nowMobile);
        // Reset to first slide when switching between mobile and desktop
        setCurrentSlide(0);
        console.log(`View changed: ${nowMobile ? 'Mobile' : 'Desktop'}`);
      }
    };
    
    // Set initial state
    setIsMobile(checkIsMobile());
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isMobile]);
  
  // Set up auto-scrolling
  useEffect(() => {
    // Clear any existing interval
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }
    
    // Create new interval
    autoScrollTimerRef.current = setInterval(() => {
      handleNextSlide();
    }, 5000);
    
    // Clean up on unmount
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [currentSlide, isMobile]);
  
  // Navigation functions
  const handlePrevSlide = () => {
    console.log("Previous button clicked");
    
    if (isMobile) {
      // On mobile, wrap around from first to last
      setCurrentSlide(prev => {
        const newSlide = prev === 0 ? images.length - 1 : prev - 1;
        console.log(`Mobile: Changing slide from ${prev} to ${newSlide}`);
        return newSlide;
      });
    } else {
      // On desktop, don't go below 0
      setCurrentSlide(prev => {
        const newSlide = Math.max(0, prev - 1);
        console.log(`Desktop: Changing slide from ${prev} to ${newSlide}`);
        return newSlide;
      });
    }
  };
  
  const handleNextSlide = () => {
    console.log("Next button clicked");
    
    if (isMobile) {
      // On mobile, wrap around from last to first
      setCurrentSlide(prev => {
        const newSlide = prev === images.length - 1 ? 0 : prev + 1;
        console.log(`Mobile: Changing slide from ${prev} to ${newSlide}`);
        return newSlide;
      });
    } else {
      // On desktop, don't go beyond max index
      const maxSlide = Math.max(0, images.length - 4); // 4 images visible on desktop
      setCurrentSlide(prev => {
        const newSlide = Math.min(maxSlide, prev + 1);
        console.log(`Desktop: Changing slide from ${prev} to ${newSlide}`);
        return newSlide;
      });
    }
  };
  
  // Handle direct navigation from dots
  const goToSlide = (index) => {
    console.log(`Going directly to slide ${index}`);
    setCurrentSlide(index);
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
      // Swipe left = next slide
      handleNextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right = previous slide
      handlePrevSlide();
    }
  };
  
  // Calculate slide transforms based on view mode
  const getSlideTransform = () => {
    if (isMobile) {
      // For mobile: simply move to the current slide index
      return `translateX(-${currentSlide * 100}%)`;
    } else {
      // For desktop: move by percentage equivalent to one visible item
      return `translateX(-${currentSlide * 25}%)`; // 25% because we show 4 items (100/4 = 25)
    }
  };
  
  // Calculate appropriate width for slider track
  const getSliderTrackWidth = () => {
    if (isMobile) {
      // For mobile: each slide is 100% wide, so track is images.length * 100%
      return `${images.length * 100}%`;
    } else {
      // For desktop: we show 4 images at once, so factor that in
      return '100%';
    }
  };
  
  // Calculate width for individual slide items
  const getSlideItemWidth = () => {
    if (isMobile) {
      // For mobile: each item takes full width of the visible area
      return '100%';
    } else {
      // For desktop: divide width by 4 (number of items shown)
      return '25%';
    }
  };
  
  // Render dots for navigation
  const renderDots = () => {
    if (isMobile) {
      // For mobile: one dot per image
      return images.map((_, index) => (
        <span 
          key={index} 
          className={`dot ${currentSlide === index ? "active" : ""}`}
          onClick={() => goToSlide(index)}
        />
      ));
    } else {
      // For desktop: one dot per possible position
      const maxPositions = Math.max(1, images.length - 3); // 3 because we see 4 items at once
      return Array.from({ length: maxPositions }).map((_, index) => (
        <span 
          key={index} 
          className={`dot ${currentSlide === index ? "active" : ""}`}
          onClick={() => goToSlide(index)}
        />
      ));
    }
  };
    // Render component
  return (
    <div className="sliding-component-container">
      <h2 className="sliding-component-title">Trusted By Leading Property Managers</h2>
      
      {isMobile ? (
        // Mobile carousel structure
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div 
                key={image.id} 
                className={`carousel-item ${currentSlide === index ? 'active' : ''}`}
              >
                <img 
                  className="d-block w-100" 
                  src={image.src} 
                  alt={image.alt}
                  style={image.style || {}}
                />
              </div>
            ))}
          </div>
          <a 
            className="carousel-control-prev" 
            href="#carouselExampleControls" 
            role="button" 
            data-slide="prev"
            onClick={(e) => {
              e.preventDefault();
              handlePrevSlide();
            }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a 
            className="carousel-control-next" 
            href="#carouselExampleControls" 
            role="button" 
            data-slide="next"
            onClick={(e) => {
              e.preventDefault();
              handleNextSlide();
            }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      ) : (
        // Desktop slider structure
        <div className="sliding-component">
          <button 
            className="nav-button prev" 
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div 
            className={`slider-content ${isMobile ? 'mobile' : 'desktop'}`}
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="slider-track" 
              style={{ 
                transform: getSlideTransform(),
                width: getSliderTrackWidth()
              }}
            >
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className="slide-item"
                  style={{ 
                    width: getSlideItemWidth()
                  }}
                >
                  <img 
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
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
      
      {/* <div className="slider-dots">
        {renderDots()}
      </div> */}
    </div>
    
  );
};


export default SlidingComponentFixed;

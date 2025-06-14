// This script helps position the login/signup popup correctly
export const positionLoginPopup = () => {
  // Function to position the popup correctly
  const positionPopup = () => {
    const loginToggle = document.getElementById('login-toggle-btn');
    const loginPopup = document.getElementById('login-popup');
    
    if (loginToggle && loginPopup) {
      const rect = loginToggle.getBoundingClientRect();
      
      // For desktop view
      if (window.innerWidth >= 992) {
        loginPopup.style.top = (rect.bottom + 5) + 'px';
        loginPopup.style.left = (rect.left - 80) + 'px'; // Center it with the toggle button
        
        // Make sure it's not off-screen
        if (window.innerWidth - rect.left < 160) {
          loginPopup.style.left = (window.innerWidth - 160 - 10) + 'px';
        }
      } 
      // For mobile view
      else {
        // Position below the toggle button
        loginPopup.style.top = (rect.bottom + 5) + 'px';
        
        // Align to the right side of the screen with some margin
        loginPopup.style.right = '10px';
        loginPopup.style.left = 'auto';
        
        // Always ensure popup is visible by setting these critical styles
        loginPopup.style.position = 'absolute';
        loginPopup.style.display = 'block';
        loginPopup.style.visibility = 'visible';
        loginPopup.style.opacity = '1';
        loginPopup.style.zIndex = '9999999';
      }
    }
  };

  // Initial positioning with a small delay to ensure elements are rendered
  setTimeout(positionPopup, 50);
  
  // Additional check after a bit longer to ensure positioning works
  setTimeout(positionPopup, 300);
  
  // Also reposition on window resize
  window.addEventListener('resize', positionPopup);
  
  // Reposition on scroll as well for mobile
  window.addEventListener('scroll', positionPopup);
    return () => {
    window.removeEventListener('resize', positionPopup);
    window.removeEventListener('scroll', positionPopup);
  };
};

// Function to position the navigation menu popup
export const positionNavMenuPopup = () => {
  const positionPopup = () => {
    const navToggle = document.getElementById('nav-toggle-btn');
    const navPopup = document.getElementById('nav-menu-popup');
    
    console.log('Positioning nav popup - Toggle:', navToggle, 'Popup:', navPopup);
    
    if (navToggle && navPopup) {
      const rect = navToggle.getBoundingClientRect();
      console.log('Toggle rect:', rect, 'Window width:', window.innerWidth);
      
      // For desktop view
      if (window.innerWidth >= 992) {
        navPopup.style.top = (rect.bottom + 5) + 'px';
        navPopup.style.left = (rect.left - 140) + 'px'; // Center it with the toggle button
        
        // Make sure it's not off-screen
        if (window.innerWidth - rect.left < 200) {
          navPopup.style.left = (window.innerWidth - 200 - 10) + 'px';
        }
      } 
      // For mobile view
      else {
        // Position below the toggle button
        navPopup.style.top = (rect.bottom + 5) + 'px';
        
        // Align to the right side of the screen with some margin, but offset for the nav button
        navPopup.style.right = '60px';
        navPopup.style.left = 'auto';
        
        // Always ensure popup is visible by setting these critical styles
        navPopup.style.position = 'absolute';
        navPopup.style.display = 'block';
        navPopup.style.visibility = 'visible';
        navPopup.style.opacity = '1';
        navPopup.style.zIndex = '9999999';
      }
      
      console.log('Applied styles:', {
        top: navPopup.style.top,
        left: navPopup.style.left,
        right: navPopup.style.right,
        display: navPopup.style.display,
        visibility: navPopup.style.visibility,
        opacity: navPopup.style.opacity
      });
    } else {
      console.log('Could not find nav toggle or popup elements');
    }
  };

  // Initial positioning with a small delay to ensure elements are rendered
  setTimeout(positionPopup, 50);
  
  // Additional check after a bit longer to ensure positioning works
  setTimeout(positionPopup, 300);
  
  // Also reposition on window resize
  window.addEventListener('resize', positionPopup);
  
  // Reposition on scroll as well for mobile
  window.addEventListener('scroll', positionPopup);
  
  return () => {
    window.removeEventListener('resize', positionPopup);
    window.removeEventListener('scroll', positionPopup);
  };
};

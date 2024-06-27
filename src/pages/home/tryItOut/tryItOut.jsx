import React from 'react';
import { Container } from 'react-bootstrap';
import './tryItOut.css';
import { Link } from 'react-router-dom';

const TryItOutCTA = () => {

  return(
    <section className='try-it-out'>
      <Container>
        <div className="try-it-out-box">
          <h3>Try It Out!</h3>
          <p>See it in action for yourself. No sign-up required.</p>
          <Link to='/meet-hostbuddy'>Chat With HostBuddy{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none"> <path d="M13.0303 7.03033C13.3232 6.73744 13.3232 6.26256 13.0303 5.96967L8.25736 1.1967C7.96447 0.903806 7.48959 0.903806 7.1967 1.1967C6.90381 1.48959 6.90381 1.96447 7.1967 2.25736L11.4393 6.5L7.1967 10.7426C6.90381 11.0355 6.90381 11.5104 7.1967 11.8033C7.48959 12.0962 7.96447 12.0962 8.25736 11.8033L13.0303 7.03033ZM0.5 7.25H12.5V5.75H0.5V7.25Z" fill="#146EF5"></path> </svg>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default TryItOutCTA

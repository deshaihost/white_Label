import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ThankError = ({ imgSrc, text }) => {
    return (
        <div className="thankerror">
            <Container>
                <div className="thankerror-container">
                    <img src={imgSrc} alt='thankerror' />
                    <p>{text}</p>
                    <Link to='/' className='link-btn filled-btn'>Back to Home </Link>
                </div>
            </Container>
        </div>
    )
}

export default ThankError;
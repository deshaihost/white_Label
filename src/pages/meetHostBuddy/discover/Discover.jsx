import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './discover.css';

const Discover = () => {
    return(
        <section className="discover">
            <Container>
                <div className="row">
                    <div className="col-lg-6">
                        <h2>Discover more about <strong>HostBuddy AI</strong>, Contact us today!</h2>
                        <Link to='/' className='link-btn filled-btn'>Contact Us</Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Discover;
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './plans.css';
import { Link } from 'react-router-dom';

const Plans = () => {
    return(
        <section className='plans'>
            <Container>
                <div className="row">
                    <div className="col-md-6">
                        <div className="plan-box">
                            <h3>Discover The <strong>Power</strong> Of HostBuddy</h3>
                            <Link to='/ai-messaging' className='link-btn filled-btn'>Learn More</Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="plan-box">
                            <h3>Explore <strong>Pricing</strong></h3>
                            <Link to='/pricing' className='link-btn outline-btn'>Pricing</Link>
                        </div>    
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Plans;
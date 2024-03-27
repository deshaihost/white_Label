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
                            <h3>Explore HostBuddy’s <strong>Pricing Plans </strong>  and Options</h3>
                            <Link to='/'>Pricing</Link>
                        </div>    
                    </div>
                    <div className="col-md-6">
                        <div className="plan-box">
                            <h3>Discover the Magic of <strong>HostBuddy’s </strong> Chatbot</h3>
                            <Link to='/'>Meet HostBuddy</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Plans;
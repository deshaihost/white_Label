import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './introduction.css';
import { Link } from 'react-router-dom';

const AssistantImg = 'https://hostbuddylb.com/home/assistant.webp';
const IntegrationsImg = 'https://hostbuddylb.com/home/integrations_works_crop.webp';
const PropertyWithAmenitiesImg = 'https://hostbuddylb.com/home/property_with_amenities.webp';
const lateNightBot = 'https://hostbuddylb.com/home/empty_desk_night.webp';

const Introduction = () => {
    return(
        <section className='introduction'>
            <div className="introduction-heading">
                <h2>Introducing <strong>HostBuddy AI</strong></h2>
            </div>

            <div className="introduction-content">
                <p>Created by hosts, for hosts, HostBuddy AI is the leading messaging automation software in the short-term rental industry. With the ability to communicate with your guests directly through your property management system, HostBuddy AI uses information about your properties to provide quality support to your guests. Host with ease and let HostBuddy handle guest questions, troubleshooting, and issue escalation on your behalf.</p>
            </div>
        </section>
    )
}

export default Introduction;
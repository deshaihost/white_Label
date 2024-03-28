import React, { useState, useEffect } from 'react';
import './features.css';
import CheckImg from '../../../public/img/right_check.png';
import WrongImg from '../../../public/img/wrong_check.png';

const Features = () => {
    const featurePlans = [
        {
            compareTo: 'Owner Portal',
            essential: true,
            works: true
        },
        {
            compareTo: 'Fully Customizable',
            essential: true,
            works: true
        },
        {
            compareTo: 'AI chatbot optimized with ChatGPT-4',
            essential: true,
            works: true
        },
        {
            compareTo: 'Integration to Property Management Software',
            essential: false,
            works: true
        },
        {
            compareTo: 'HostBuddy Lives in an External Location Sharable to Guests',
            essential: true,
            works: true
        },
        {
            compareTo: 'User-friendly dashboard: Easily manage your HostBuddy',
            essential: true,
            works: true
        },
        {
            compareTo: 'Connected to your guest data',
            essential: false,
            works: true
        },
        {
            compareTo: 'Assigned Customer Success Manager',
            essential: false,
            works: true
        },
        {
            compareTo: 'Toggle On/Off Capabilities',
            essential: false,
            works: true
        },
        {
            compareTo: 'Improvement Insights',
            essential: false,
            works: true
        },
    ]
    return(
        <div className="features">
            <div className="heading-box">
                <h2>Features</h2>
                <p>Compare plans to features that best suit your need</p>
            </div>
            <div className='features-list'>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <h3>Compare Plan</h3>
                                    <p>Find one that’s right for you</p>
                                </th>
                                <th>
                                    <h3>The Essentials</h3>
                                    <p>Features in Essentials Plan</p>
                                </th>
                                <th>
                                    <h3>The Works</h3>
                                    <p>Features in Works Plan</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {featurePlans?.map((data, i) => {
                                return(
                                    <tr key={i}>
                                        <td><h5>{data.compareTo}</h5></td>
                                        <td><img src={data.essential == true ? CheckImg : WrongImg} alt='check-img' /></td>
                                        <td><img src={data.works == true ? CheckImg : WrongImg} alt='check-img' /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default Features;
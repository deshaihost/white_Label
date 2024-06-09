import React from 'react';
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
            compareTo: 'User-friendly dashboard: Easily manage your HostBuddy',
            essential: true,
            works: true
        },
        {
            compareTo: 'Fully Customizable',
            essential: true,
            works: true
        },
        {
            compareTo: 'State of the Art Conversational AI',
            essential: true,
            works: true
        },
        {
            compareTo: 'Share HostBuddy with your guests using property-specific chat links',
            essential: true,
            works: true
        },
        {
            compareTo: 'Integration to Property Management Software',
            essential: false,
            works: true
        },
        {
            compareTo: 'Connected to your guest data',
            essential: false,
            works: true
        },
        {
            compareTo: 'HostBuddy responds directly over PMS & OTA communication channels',
            essential: false,
            works: true
        },
        {
            compareTo: 'Assigned Customer Success Manager',
            essential: false,
            works: true
        }
    ]
    return(
        <div className="features">
            <div className="heading-box">
                <h2>Features</h2>
                <p>Find the plan that best suits your needs</p>
            </div>
            <div className='features-list'>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <h3>Compare Plan</h3>
                                    <p>Find the one that’s right for you</p>
                                </th>
                                <th>
                                    <h3>The Essentials</h3>
                                    <p>Features in The Essentials Plan</p>
                                </th>
                                <th>
                                    <h3>The Works</h3>
                                    <p>Features in The Works Plan</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {featurePlans?.map((data, i) => {
                                return(
                                    <tr key={i}>
                                        <td><h5>{data.compareTo}</h5></td>
                                        <td><img src={data.essential === true ? CheckImg : WrongImg} alt='check-img' /></td>
                                        <td><img src={data.works === true ? CheckImg : WrongImg} alt='check-img' /></td>
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
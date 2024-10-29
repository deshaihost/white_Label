import React from 'react';
import './features.css';
import CheckImg from '../../../public/img/right_check.png';
import WrongImg from '../../../public/img/wrong_check.png';

const Features = () => {
    const featurePlans = [
        {
            compareTo: 'Automate guest messaging with state of the art conversational AI',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'User-friendly dashboard: Easily manage your properties and customize HostBuddy',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'Fully integrated: Let HostBuddy access live data from your PMS to see and respond to guests',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'Action item detection and notifications',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'Smart template messaging and upsells',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'AI-powered review removal support',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'Slack integration with directed responses',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'Smart Inbox: View your conversations, see sentiment, action items, and more',
            essential: true,
            unlimited: true
        },
        {
            compareTo: 'AI-driven business intelligence: comprehensive analytics dashboard',
            essential: false,
            unlimited: true
        },
        {
            compareTo: 'Add your team: Invite users to your account and manage permissions',
            essential: false,
            unlimited: true
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
                                    <h3 style={{textAlign:'left'}}>Compare Plans</h3>
                                </th>
                                <th>
                                    <h3>HostBuddy<br/>Pro</h3>
                                </th>
                                <th>
                                    <h3>HostBuddy<br/>Elite</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {featurePlans?.map((data, i) => {
                                return(
                                    <tr key={i}>
                                        {i === 7 ? (
                                            <>
                                                <td><h5>{data.compareTo}</h5></td>
                                                {/* <td><p style={{color: 'rgb(255, 165, 0)'}}>Up To<br/>12h/day</p></td> */}
                                                <td><p style={{color: 'rgb(255, 165, 0)'}}>View<br/>Only</p></td>
                                                <td><img src={data.unlimited === true ? CheckImg : WrongImg} alt='check-img' /><p className='unlimited-text'>View and send</p></td>
                                            </>
                                        ) : (
                                            <>
                                                <td><h5>{data.compareTo}</h5></td>
                                                <td><img src={data.essential === true ? CheckImg : WrongImg} alt='check-img' /></td>
                                                <td><img src={data.unlimited === true ? CheckImg : WrongImg} alt='check-img' /></td>
                                            </>
                                        )}
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
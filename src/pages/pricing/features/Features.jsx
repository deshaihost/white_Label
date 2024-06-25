import React from 'react';
import './features.css';
import CheckImg from '../../../public/img/right_check.png';
import WrongImg from '../../../public/img/wrong_check.png';

const Features = () => {
    const featurePlans = [
        {
            compareTo: 'Owner Portal',
            essential: true,
            works: true,
            unlimited: true
        },
        {
            compareTo: 'User-friendly dashboard: Easily manage your HostBuddy',
            essential: true,
            works: true,
            unlimited: true
        },
        {
            compareTo: 'Fully Customizable',
            essential: true,
            works: true,
            unlimited: true
        },
        {
            compareTo: 'State of the Art Conversational AI',
            essential: true,
            works: true,
            unlimited: true
        },
        {
            compareTo: 'Share HostBuddy with your guests using property-specific chat links',
            essential: true,
            works: true,
            unlimited: true
        },
        {
            compareTo: 'Integration to Property Management Software',
            essential: false,
            works: true,
            unlimited: true
        },
        {
            compareTo: 'Connected to your guest data',
            essential: false,
            works: true,
            unlimited: true
        },
        {
            compareTo: 'HostBuddy responds directly over PMS & OTA communication channels',
            essential: false,
            works: true,
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
                                    <h3>Compare Plans</h3>
                                    {/* <p>Find the one that’s right for you</p> */}
                                </th>
                                <th>
                                    <h3>The Essentials</h3>
                                    {/* <p>Features in The Essentials Plan</p>  */}
                                </th>
                                <th>
                                    <h3>The Works</h3>
                                    {/* <p>Features in The Works Plan</p>  */}
                                </th>
                                <th>
                                    <h3>The Works Unlimited</h3>
                                    {/* <p>Features in The Works Unlimted Plan</p>  */}
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
                                                <td><img src={data.essential === true ? CheckImg : WrongImg} alt='check-img' /></td>
                                                <td><p style={{color: 'rgb(255, 165, 0)'}}>Up To<br/>12h/day</p></td>
                                                <td><img src={data.unlimited === true ? CheckImg : WrongImg} alt='check-img' /><p>Unlimited</p></td>
                                            </>
                                        ) : (
                                            <>
                                                <td><h5>{data.compareTo}</h5></td>
                                                <td><img src={data.essential === true ? CheckImg : WrongImg} alt='check-img' /></td>
                                                <td><img src={data.works === true ? CheckImg : WrongImg} alt='check-img' /></td>
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
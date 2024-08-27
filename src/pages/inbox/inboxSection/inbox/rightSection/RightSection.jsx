import React from 'react'
import "./index.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
const RightSection = () => {
  return (
    <div className='right-side'>
      <div className='bordr-cl'>
      <h2>RightSection</h2>
      </div>
      <div className='row'>
        <div className='col-lg-9'>
          <div className='guest'>
            <span>Past Guest </span>
            <h2>Jorge</h2>
           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          </div>
        </div>
        <div className='col-lg-3 guest-img'>
        <img src={dummyPropertyImg} alt="" />
        </div>
      </div>
     <div className='issue'> 
        <h3>Isues</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <div className='text-center'>
        <span>Manage</span>
        </div>

     </div > 
     <div className='satisfy'>
      <h2>Satisfaction</h2>
      <p className='result'> Positive</p>
     </div>
     <div className='about'>
      <div className='about-inner'>
      <h2>About Jorge</h2>
      <div className='user-detail'>
        <p>Phone NUmber: 98765433</p>
        <p>Plateform Booked: Airbnb</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <p></p>
      </div>
      </div>
     </div>
      </div>
      
  )
}

export default RightSection
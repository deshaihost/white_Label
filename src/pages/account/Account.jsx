import React from 'react'
import SideBar from '../../component/sideBar/SideBar'

const Account = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <SideBar />
        </div>
        <div className="col-lg-8">Account</div>
      </div>
    </div>
  )
}

export default Account

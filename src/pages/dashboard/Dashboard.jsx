import React from "react";
import SideBar from "../../component/sideBar/SideBar";
const Dashboard = () => {
  return (
    <div className="d-flex  bg-light my-5 py-5 px-5 justify-content-evenly">
      <div>
        <SideBar />
      </div>
      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import SideBar from "../../component/sideBar/SideBar";
import GetStartedImg from "../../public/img/getstartedimg.png";
import { Link } from "react-router-dom";
import "./dashboard.css";
import AddPropertyModal from "../../component/modal/addPropertyModal/AddPropertyModal";
import { useSelector, useDispatch } from "react-redux";
import { getUserDataActions } from "../../redux/actions";
import Loader, { BoxLoader } from "../../helper/Loader";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const userDataLoading = store?.getUserDataReducer?.loading;
  const userDataGetLoading = store?.getUserDataReducer?.loading;
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;

  const { first_name } = userDataGet ? userDataGet : [];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [model, setModel] = useState({
    addProperty: false,
  });
  const handleModelOpen = (type) => {
    if (type === "addPropertyOpen") {
      setModel({ ...model, addProperty: true });
    }
  };
  const handleModelClose = (type) => {
    if (type === "addPropertyClose") {
      setModel({ ...model, addProperty: false });
    }
  };
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  return (
    <>
      <div className="account-main">
        <div className="container">
          <div className="banner-heading">
            <h2>My HostBuddy</h2>
            <p>Manage your profile here </p>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <SideBar />
            </div>
            <div className="col-lg-8">
              <div className="account-container">
                <div className="account_heading">
                  <h3>
                    Welcome to HostBuddy, {!userDataLoading && <>{first_name}</>}{" "}
                  </h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="account-box">
                        <svg
                          width="18"
                          height="17"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.66667 5.58366H12.3333M5.66667 8.91699H10.6667M8.15833 14.0887L5.66667 15.5837V13.0837H4C3.33696 13.0837 2.70107 12.8203 2.23223 12.3514C1.76339 11.8826 1.5 11.2467 1.5 10.5837V3.91699C1.5 3.25395 1.76339 2.61807 2.23223 2.14923C2.70107 1.68038 3.33696 1.41699 4 1.41699H14C14.663 1.41699 15.2989 1.68038 15.7678 2.14923C16.2366 2.61807 16.5 3.25395 16.5 3.91699V8.91699M11.5 13.917L13.1667 15.5837L16.5 12.2503"
                            stroke="#146EF5"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        <h4>0</h4>
                        <p>Messages Processed</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="account-box">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM8.75 8H11.75V9.5H7.25V4.25H8.75V8Z"
                            fill="#146EF5"
                          ></path>
                        </svg>
                        <h4>0</h4>
                        <p>Average Response Time</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="account-box">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.3422 0.656793C15.4156 0.730166 15.4662 0.823302 15.4877 0.924871C15.5092 1.02644 15.5007 1.13207 15.4632 1.2289L10.1064 15.1567C10.0684 15.2552 10.0022 15.3404 9.91608 15.4014C9.82992 15.4625 9.72764 15.4967 9.62209 15.4998C9.51653 15.5029 9.41242 15.4747 9.32283 15.4188C9.23325 15.3629 9.16218 15.2818 9.11856 15.1856L6.87831 10.2573L10.1739 6.96072C10.3158 6.80839 10.3931 6.60693 10.3894 6.39876C10.3857 6.19059 10.3014 5.99198 10.1542 5.84476C10.007 5.69754 9.80833 5.61321 9.60016 5.60953C9.39199 5.60586 9.19053 5.68313 9.0382 5.82507L5.74158 9.12059L0.813244 6.88143C0.716785 6.83787 0.635392 6.76671 0.579339 6.67693C0.523286 6.58715 0.495084 6.48278 0.498293 6.37699C0.501503 6.2712 0.535979 6.16873 0.597371 6.08251C0.658763 5.9963 0.74432 5.9302 0.843243 5.89256L14.7711 0.535729C14.8678 0.498525 14.9732 0.49016 15.0746 0.511648C15.176 0.533135 15.2689 0.583553 15.3422 0.656793Z"
                            fill="#146EF5"
                          ></path>
                        </svg>
                        <h4>0</h4>
                        <p>Messages Sent</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8">
                      {/* {!userDataGetLoading ? (
                        <>
                          {createPropertiesName?.map((userCreate) => {
                            return (
                              <div className="">
                                <div className="property_status">
                                  <h3>Property Status </h3>
                                  <div className="property_list">
                                    <ul>
                                      <li>
                                        <div className="property_list_cnt">
                                          <div className="property_cntleft">

                                            <img src="https://hostbuddy.ai/wp-content/uploads/2024/04/503-1.png" alt="img" />
                                            <div className="property_detail">
                                              <h4>{userCreate}</h4>
                                              <p>Los Angels </p>
                                            </div>
                                          </div>
                                          <div className="chart-module">
                                            <CircularProgressbar className="progressBar w-auto"
                                              styles={buildStyles({
                                                pathColor: "#146EF5",
                                                textColor: '#146EF5',
                                              },)}
                                              value={100}
                                              text={`${100}%`}
                                            />
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <BoxLoader />
                      )} */}
                    </div>
                    <div className="col-lg-4">
                      <div className="get-started">
                        <img src={GetStartedImg} alt="get-started" />
                        <p>Explore more about how you can Setup hostBuddy</p>
                        <Link to="/">Get Started</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddPropertyModal
        handleClose={handleModelClose}
        show={model?.addProperty}
      />
    </>
  );
};

export default Dashboard;

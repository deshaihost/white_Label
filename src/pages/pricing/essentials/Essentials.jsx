import React, { useState, useEffect } from "react";
import "./essentials.css";
import { Link } from "react-router-dom";
import Authorized from "../../../helper/Authorized";

const Essentials = () => {
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  const [essentialValue, setEssentialValue] = useState(1);
  const [worksValue, setWorksValue] = useState(1);
  const [labelLeft, setLabelLeft] = useState(0);
  const [workLabelLeft, setWorkLabelLeft] = useState(0);
  const handleChange = (event) => {
    setEssentialValue(event.target.value);
  };

  const handleWorkChange = (event) => {
    setWorksValue(event.target.value);
  };

  useEffect(() => {
    const range = document.querySelector(".pricing_range");
    if (range) {
      const width = range.offsetWidth;
      const min = parseInt(range.min, 10);
      const max = parseInt(range.max, 10);
      const left = ((essentialValue - min) / (max - min)) * width;
      setLabelLeft(left);
    }
  }, [essentialValue]);

  useEffect(() => {
    const workRange = document.querySelector(".pricing_work_range");
    if (workRange) {
      const width = workRange.offsetWidth;
      const min = parseInt(workRange.min, 10);
      const max = parseInt(workRange.max, 10);
      const left = ((worksValue - min) / (max - min)) * width;
      setWorkLabelLeft(left);
    }
  }, [worksValue]);
  return (
    <div className="essentials">
      <div className="row">
        <div className="col-lg-6">
          <div className="pricing-plan-box">
            <h3>The Essentials</h3>
            <div className="divider">
              <span></span>
              <strong>Monthly Billing</strong>
              <span></span>
            </div>
            <p>
              Move the slider below to set the number of properties that had a
              check-in during the month
            </p>
            <div className="pricing-bar-box">
              <div className="pricing-bar">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={essentialValue}
                  onChange={handleChange}
                  className="pricing_range"
                  data-essential-plan-attr='[{"001-005":"10.0"},{"006-010":"9.0"},{"011-020":"8.0"},{"021-050":"7.0"},{"051-":"5.0"}]'
                />
                <span
                  className="range-label"
                  style={{ left: `${labelLeft}px` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="38"
                    viewBox="0 0 32 38"
                    fill="none"
                  >
                    <mask id="path-1-inside-1_38_157" fill="white">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.7143 6.43335L16 0L12.2857 6.43335C5.24029 8.10818 0 14.4421 0 22C0 30.8366 7.16344 38 16 38C24.8366 38 32 30.8366 32 22C32 14.4421 26.7597 8.10818 19.7143 6.43335Z"
                      ></path>
                    </mask>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.7143 6.43335L16 0L12.2857 6.43335C5.24029 8.10818 0 14.4421 0 22C0 30.8366 7.16344 38 16 38C24.8366 38 32 30.8366 32 22C32 14.4421 26.7597 8.10818 19.7143 6.43335Z"
                      fill="#146EF5"
                    ></path>
                    <path
                      d="M16 0L17.7321 -1L16 -4L14.2679 -1L16 0ZM19.7143 6.43335L17.9822 7.43335L18.4132 8.17979L19.2517 8.37913L19.7143 6.43335ZM12.2857 6.43335L12.7483 8.37913L13.5868 8.17979L14.0178 7.43335L12.2857 6.43335ZM14.2679 1L17.9822 7.43335L21.4463 5.43335L17.7321 -1L14.2679 1ZM14.0178 7.43335L17.7321 1L14.2679 -1L10.5537 5.43335L14.0178 7.43335ZM2 22C2 15.3895 6.58357 9.84459 12.7483 8.37913L11.8232 4.48757C3.89702 6.37177 -2 13.4948 -2 22H2ZM16 36C8.26801 36 2 29.732 2 22H-2C-2 31.9411 6.05887 40 16 40V36ZM30 22C30 29.732 23.732 36 16 36V40C25.9411 40 34 31.9411 34 22H30ZM19.2517 8.37913C25.4164 9.84459 30 15.3895 30 22H34C34 13.4948 28.103 6.37177 20.1768 4.48757L19.2517 8.37913Z"
                      fill="white"
                      mask="url(#path-1-inside-1_38_157)"
                    ></path>
                  </svg>
                  <span className="range-value">{essentialValue}</span>
                </span>
              </div>
              <div className="price-plan">
                <h5>
                  <sup>$</sup>
                  <strong>
                    {essentialValue < 6
                      ? essentialValue * 10
                      : essentialValue > 5 && essentialValue < 11
                      ? essentialValue * 9
                      : essentialValue > 10 && essentialValue < 21
                      ? essentialValue * 8
                      : essentialValue * 7}
                  </strong>
                  /<sub>Month</sub>
                </h5>
                <span>
                  ($
                  <strong>
                    {essentialValue < 6
                      ? 10
                      : essentialValue > 5 && essentialValue < 11
                      ? 9
                      : essentialValue > 10 && essentialValue < 21
                      ? 8
                      : 7}
                  </strong>
                  /property)
                </span>
              </div>
            </div>
            {token === undefined && (
              <Link to="/signup" className="link-btn outline-btn">
                Sign up Today!
              </Link>
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="pricing-plan-box best-price-plan">
            <h3>The Works</h3>
            <div className="divider">
              <span></span>
              <strong>Monthly Billing</strong>
              <span></span>
            </div>
            <p>
              Move the slider below to set the number of properties that had a
              check-in during the month
            </p>
            <div className="pricing-bar-box">
              <div className="pricing-bar">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={worksValue}
                  onChange={handleWorkChange}
                  className="pricing_work_range"
                  data-essential-plan-attr='[{"001-005":"10.0"},{"006-010":"9.0"},{"011-020":"8.0"},{"021-050":"7.0"},{"051-":"5.0"}]'
                />
                <span
                  className="range-label"
                  style={{ left: `${workLabelLeft}px` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="38"
                    viewBox="0 0 32 38"
                    fill="none"
                  >
                    <mask id="path-1-inside-1_38_157" fill="white">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.7143 6.43335L16 0L12.2857 6.43335C5.24029 8.10818 0 14.4421 0 22C0 30.8366 7.16344 38 16 38C24.8366 38 32 30.8366 32 22C32 14.4421 26.7597 8.10818 19.7143 6.43335Z"
                      ></path>
                    </mask>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.7143 6.43335L16 0L12.2857 6.43335C5.24029 8.10818 0 14.4421 0 22C0 30.8366 7.16344 38 16 38C24.8366 38 32 30.8366 32 22C32 14.4421 26.7597 8.10818 19.7143 6.43335Z"
                      fill="#146EF5"
                    ></path>
                    <path
                      d="M16 0L17.7321 -1L16 -4L14.2679 -1L16 0ZM19.7143 6.43335L17.9822 7.43335L18.4132 8.17979L19.2517 8.37913L19.7143 6.43335ZM12.2857 6.43335L12.7483 8.37913L13.5868 8.17979L14.0178 7.43335L12.2857 6.43335ZM14.2679 1L17.9822 7.43335L21.4463 5.43335L17.7321 -1L14.2679 1ZM14.0178 7.43335L17.7321 1L14.2679 -1L10.5537 5.43335L14.0178 7.43335ZM2 22C2 15.3895 6.58357 9.84459 12.7483 8.37913L11.8232 4.48757C3.89702 6.37177 -2 13.4948 -2 22H2ZM16 36C8.26801 36 2 29.732 2 22H-2C-2 31.9411 6.05887 40 16 40V36ZM30 22C30 29.732 23.732 36 16 36V40C25.9411 40 34 31.9411 34 22H30ZM19.2517 8.37913C25.4164 9.84459 30 15.3895 30 22H34C34 13.4948 28.103 6.37177 20.1768 4.48757L19.2517 8.37913Z"
                      fill="white"
                      mask="url(#path-1-inside-1_38_157)"
                    ></path>
                  </svg>
                  <span className="range-value">{worksValue}</span>
                </span>
              </div>
              <div className="price-plan">
                <h5>
                  <sup>$</sup>
                  <strong>
                    {worksValue < 6
                      ? worksValue * 20
                      : worksValue > 5 && worksValue < 11
                      ? worksValue * 18
                      : worksValue > 10 && worksValue < 21
                      ? worksValue * 15
                      : worksValue * 10}
                  </strong>
                  /<sub>Month</sub>
                </h5>
                <span>
                  ($
                  <strong>
                    {worksValue < 6
                      ? 20
                      : worksValue > 5 && worksValue < 11
                      ? 18
                      : worksValue > 10 && worksValue < 21
                      ? 15
                      : 10}
                  </strong>
                  /property)
                </span>
              </div>
            </div>
            {token === undefined && (
              <Link to="/signup" className="link-btn filled-btn">
                Sign up Today!
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essentials;

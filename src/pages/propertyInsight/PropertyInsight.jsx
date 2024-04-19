import React from "react";
import './PropertyInsight.css'
import SideBar from "../../component/sideBar/SideBar";
import SuccessTotalBox from "./successTotalBox/SuccessTotalBox";
import TranscriptsTable from "./transcriptsTable/TranscriptsTable";
import SuggestionsBusiness from "./suggestionsBusiness/SuggestionsBusiness";
const PropertyInsight = () => {
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
              <div class="account-container">
                <div class="account_heading account_heading_white">
                  <h3 className="text-white">Property Insight </h3>
                  <div class="property_select">
                    <select id="properies_insight" className="">
                      <option value="rrfegfhgf" selected="">rrfegfhgf</option>
                      <option value="w3ewed">w3ewed</option>
                    </select>
                  </div>
                </div>
                <div className="px-lg-5 px-md-4 px-3 py-4">
                  <div>
                    <SuccessTotalBox />
                  </div>
                  <div className="">
                    <TranscriptsTable />
                  </div>
                  <div className="mt-4">
                    <SuggestionsBusiness />
                  </div>
                </div>
              </div>
              {/* <div className="border p-5 text-white">
            <div className="row">
              <div className="col-9">Property Insight</div>
              <div className="col-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Sort by</option>
                  <option value="1">Successful</option>
                  <option value="2">unsuccessfull</option>
                </select>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyInsight;

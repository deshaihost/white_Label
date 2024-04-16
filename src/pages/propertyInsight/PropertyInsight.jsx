import React from "react";
import SideBar from "../../component/sideBar/SideBar";
import SuccessTotalBox from "./successTotalBox/SuccessTotalBox";
import TranscriptsTable from "./transcriptsTable/TranscriptsTable";
import SuggestionsBusiness from "./suggestionsBusiness/SuggestionsBusiness";
const PropertyInsight = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <SideBar />
        </div>
        <div className="col-lg-8">
          <div className="border p-5 text-white">
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
            <div>
              <SuccessTotalBox />
            </div>
            <div className="my-5">
              <TranscriptsTable />
            </div>
            <div>
              <SuggestionsBusiness />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInsight;

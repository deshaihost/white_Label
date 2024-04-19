import React from "react";
import { Link } from "react-router-dom";

const SuggestionsBusiness = () => {
  return (
    <>
      <div class="row">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div class="listing_box_design">
            <h4>Suggestions </h4>
            <ul>

              <li>
                <h6>Optimize Response Time</h6>
                <Link target="_blank" to="" class="read_more_link">Read More</Link>
              </li>
              <li>
                <h6>Enhance Creativity</h6>
                <Link target="_blank" to="" class="read_more_link">Read More</Link>
              </li>

            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="listing_box_design">
            <h4>Business Insights </h4>
            <ul>
              <li>
                <h6>Elevate Guest Experience</h6>
                <Link target="_blank" to="" class="read_more_link">Read More</Link>
              </li>
              <li>
                <h6>Optimize Check-in Process</h6>
                <Link target="_blank" to="" class="read_more_link">Read More</Link>
              </li>
              <li>
                <h6>Address Common Concerns</h6>
                <Link target="_blank" to="" class="read_more_link">Read More</Link>
              </li>
              <li>
                <h6>Highlight Unique Amenities</h6>
                <Link target="_blank" to="" class="read_more_link">Read More</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-6">
          <div>Suggestions</div>
          <div className="mt-3">
            <div>Optimize Response Time</div>
            <div className="text-primary">Read More</div>
          </div>
        </div>
        <div className="col-md-6 ">
          <div>Business Insights</div>
          <div className="mt-3">
            <div>Elevate Guest Experience</div>
            <div className="text-primary">Read More</div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SuggestionsBusiness;

import React, { useState, useEffect } from "react";
import "../newPricingTiles.css";
import { Link } from "react-router-dom";
import Authorized from "../../../helper/Authorized";

const NewPricingTiles = ( {num_props_range, bestPricePlan, monthlyPricePerProp} ) => {

  return (
    <div className="pricing-tile">
      <div className="col-lg-12">
        <div className={`pricing-plan-box ${bestPricePlan ? 'best-price-plan' : 'lower-price-plan'}`}>
          <div className="pricing-bar-box">

            {/* Left side text, e.g. "1-10 Properties" */}
            <div className="left-side-text">
              <h5><strong>{num_props_range}</strong> Properties</h5>
            </div>

            {/* Right side text, e.g. "2 weeks free, then $12/Month per property" */}
            <div className="price-plan">
              <span>
                2 weeks free, then
              </span>
              <h5>
                <sup>$</sup>
                <strong>
                  {monthlyPricePerProp}
                </strong>
                /<sub>Month</sub>
              </h5>
              <span>
                per property
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPricingTiles;

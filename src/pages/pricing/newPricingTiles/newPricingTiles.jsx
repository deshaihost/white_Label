import React, { useState, useEffect } from "react";
import "../newPricingTiles.css";
import { Link } from "react-router-dom";
import Authorized from "../../../helper/Authorized";


// This component represents a single pricing tile in the new format.
const NewPricingTiles = ( {num_props_range, priceTier, monthlyPricePerProp, cents} ) => {

  return (
    <div className="pricing-tile">
      <div className={`pricing-plan-box ${priceTier === 1 ? 'lower-price-plan' : priceTier === 2 ? 'mid-price-plan' : 'best-price-plan'}`}>
        <div className="pricing-bar-box">

          {/* Left side text, e.g. "Properties 1-10". This only appears for small/medium screens. For large screens, it's located outside the box. */}
          <div className="left-side-text">
            <h5>Properties <strong>{num_props_range}</strong></h5>
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
              {cents && <sup className="cents">.{cents}</sup>}
              /<sub>Month</sub>
            </h5>
            <span>
              per property
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPricingTiles;

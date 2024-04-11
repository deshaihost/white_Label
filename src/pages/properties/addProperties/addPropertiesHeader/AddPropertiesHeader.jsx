import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useParams } from "react-router-dom";

const AddPropertiesHeader = (props) => {
  const { id } = useParams();
  const { propertiesTypes, prntFuntionHeaderActive } = props;
  const {
    basics,
    supportingDoc,
    listingDetails,
    amenities,
    extras,
    progressPoint,
  } = propertiesTypes ? propertiesTypes : [];
  return (
    <div>
      <div className="row">
        <div col="12">
          <div className="d-flex justify-content-evenly text-white my-5">
            <div
              className={basics && "text-primary"}
              onClick={() => {
                prntFuntionHeaderActive("basics");
              }}
            >
              <div>
                <h1>
                  <i class="bi bi-house-add"></i>
                </h1>
              </div>
              <div>Basics</div>
            </div>
            <div
              className={supportingDoc && "text-primary"}
              onClick={() => {
                prntFuntionHeaderActive(id !== undefined && "supportingDoc");
              }}
            >
              <div>
                <h1>
                  <i class="bi bi-file-earmark-text"></i>
                </h1>
              </div>
              <div>Supporting Doc</div>
            </div>
            <div
              className={listingDetails && "text-primary"}
              onClick={() => {
                prntFuntionHeaderActive(id !== undefined && "listingDetails");
              }}
            >
              <div>
                <h1>
                  <i class="bi bi-calendar-plus"></i>
                </h1>
              </div>
              <div>Listing Details</div>
            </div>
            <div
              className={amenities && "text-primary"}
              onClick={() => {
                prntFuntionHeaderActive(id !== undefined && "amenities");
              }}
            >
              <div>
                <i class="bi bi-bar-chart-steps"></i>
              </div>
              <div>Amenities</div>
            </div>
            <div
              className={extras && "text-primary"}
              onClick={() => {
                prntFuntionHeaderActive(id !== undefined && "extras");
              }}
            >
              <div>
                <h1>
                  <i class="bi bi-geo-alt"></i>
                </h1>
              </div>
              <div>Extras</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          {<ProgressBar now={progressPoint} label={`${progressPoint}%`} />}
        </div>
      </div>
    </div>
  );
};

export default AddPropertiesHeader;

import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useParams } from "react-router-dom";

const QuestionnaireHeader = ({ property_name, section_names, selectedSection, setSelectedSection }) => {
  const progress_percentage = section_names ? (section_names.indexOf(selectedSection) + 1) * (100 / section_names.length) : 0;
  
  return (
    <div>
      {property_name !== undefined && (
        <div className="d-flex justify-content-center text-white ">
          <h2 className="fs-2 fw-bold mt-3 mb-3">
            {property_name}
          </h2>
        </div>
      )}
      <div className="row">
        <div col="12">
          <div className="form_top_steps d-flex justify-content-around">

            {/* First section, "Resources" */}
            <div className={selectedSection === "Resources" ? "text-primary" : ""} onClick={() => { setSelectedSection("Resources"); }} >
              <div>
                <span>
                  <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path fill="#146EF5" d="M44.5277 12.1663H18.2777V58.833H53.2777V20.9163H44.5277V12.1663ZM18.2777 6.33301H47.4443L59.111 17.9997V58.833C59.111 60.3801 58.4964 61.8638 57.4025 62.9578C56.3085 64.0518 54.8248 64.6663 53.2777 64.6663H18.2777C16.7306 64.6663 15.2468 64.0518 14.1529 62.9578C13.0589 61.8638 12.4443 60.3801 12.4443 58.833V12.1663C12.4443 10.6192 13.0589 9.13551 14.1529 8.04155C15.2468 6.94759 16.7306 6.33301 18.2777 6.33301ZM24.111 32.583H47.4443V38.4163H24.111V32.583ZM24.111 44.2497H47.4443V50.083H24.111V44.2497Z" ></path>
                  </svg>
                </span>
              </div>
              <h2>Resources</h2>
            </div>

            {/* Arbitrary number of subsequent sections, generated dynamically */}
            {section_names && section_names.length > 1 && section_names.slice(1).map((section_name) => ( // Skip the first section (defined above)
              <div key={section_name} className={selectedSection === section_name ? "text-primary" : ""} onClick={() => { setSelectedSection(section_name); }} >
                <div>
                  <span>
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path fill="#146EF5" d="M48.2128 32.5493C51.8003 31.7909 55.2128 32.0243 58.3337 32.9576V29.1659C58.3337 27.3284 57.4587 25.6076 56.0003 24.4993L38.5003 11.3743C37.4887 10.6214 36.2613 10.2148 35.0003 10.2148C33.7393 10.2148 32.5119 10.6214 31.5003 11.3743L14.0003 24.4993C12.542 25.6076 11.667 27.3284 11.667 29.1659V55.4159C11.667 58.6243 14.292 61.2493 17.5003 61.2493H34.067C32.1701 57.3061 31.6071 52.853 32.4628 48.5618C33.9795 40.6284 40.3087 34.2409 48.2128 32.5493Z" ></path>
                      <path fill="#146EF5" d="M52.5003 37.916C44.4503 37.916 37.917 44.4493 37.917 52.4993C37.917 60.5493 44.4503 67.0827 52.5003 67.0827C60.5503 67.0827 67.0837 60.5493 67.0837 52.4993C67.0837 44.4493 60.5503 37.916 52.5003 37.916ZM61.2503 53.9577H53.9587V61.2493H51.042V53.9577H43.7503V51.041H51.042V43.7493H53.9587V51.041H61.2503V53.9577Z" ></path>
                    </svg>
                  </span>
                </div>
                <h2>{section_name}</h2>
              </div>
          ))}

          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-7 mx-auto">
          {<ProgressBar now={progress_percentage} label={`${progress_percentage}%`} />}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireHeader;

import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useParams } from "react-router-dom";
import { GetquestionnaireFunction } from "../../../../helper/Authorized";
const AddPropertiesHeader = (props) => {
  const { id } = useParams();
  const {
    propertiesTypes,
    prntFuntionHeaderActive,
    propertyName,
    headerActiveDynimcally,
  } = props;
  const ExtrasFormCall = GetquestionnaireFunction();
  const { metadata } = ExtrasFormCall ? ExtrasFormCall : [];
  const { section_order } = metadata ? metadata : [];
  const headerSection = section_order ? section_order : [];
  const [sectionOrder, setSectionOrder] = useState([]);
  const [selectedSections, setSelectedSections] = useState(["Basics"]);
  const [conditionCheck, setConditionCheck] = useState(false);
  const handleInsert = () => {
    setSectionOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      newOrder?.splice(1, 0, "External Resources");
      return newOrder;
    });
  };
  const { progressPoint } = propertiesTypes ? propertiesTypes : [];
  const handleSectionClick = (section) => {
    setSelectedSections((prevSelectedSections) => {
      const sectionIndex = sectionOrder.indexOf(section);

      if (prevSelectedSections.includes(section)) {
        // If the section is already selected, deselect this and all subsequent sections
        return prevSelectedSections.filter(
          (s, index) => sectionOrder.indexOf(s) <= sectionIndex
        );
      } else {
        // If the section is not selected, select this and all previous sections
        const newSelectedSections = sectionOrder.slice(0, sectionIndex + 1);
        return newSelectedSections;
      }
    });
  };

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (headerSection.length > 0) {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        setSectionOrder(headerSection);
        setConditionCheck(true);
      }
    }
  }, [headerSection]);

  useEffect(() => {
    if (conditionCheck === true) {
      handleInsert();
      setConditionCheck(false);
    }
  }, [conditionCheck]);

  useEffect(()=>{
    handleSectionClick(headerActiveDynimcally)
  },[headerActiveDynimcally])

  return (
    <div>
      {propertyName !== undefined && (
        <div className="d-flex justify-content-center text-white ">
          <h2 className="fs-2 fw-bold mt-3 mb-3">{propertyName}</h2>
        </div>
      )}
      <div className="row">
        <div col="12">
          <div className="form_top_steps">
            {sectionOrder?.map((section, index) => {
              return (
                <div
                  key={index}
                  className={
                    selectedSections.includes(section.trim())
                      ? "text-primary"
                      : ""
                  }
                  onClick={() => {
                    handleSectionClick(section);
                    id !== undefined &&
                      prntFuntionHeaderActive(id !== undefined && section);
                  }}
                >
                  <div>
                    <span>
                      <svg
                        width="71"
                        height="71"
                        viewBox="0 0 71 71"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M44.5277 12.1663H18.2777V58.833H53.2777V20.9163H44.5277V12.1663ZM18.2777 6.33301H47.4443L59.111 17.9997V58.833C59.111 60.3801 58.4964 61.8638 57.4025 62.9578C56.3085 64.0518 54.8248 64.6663 53.2777 64.6663H18.2777C16.7306 64.6663 15.2468 64.0518 14.1529 62.9578C13.0589 61.8638 12.4443 60.3801 12.4443 58.833V12.1663C12.4443 10.6192 13.0589 9.13551 14.1529 8.04155C15.2468 6.94759 16.7306 6.33301 18.2777 6.33301ZM24.111 32.583H47.4443V38.4163H24.111V32.583ZM24.111 44.2497H47.4443V50.083H24.111V44.2497Z"
                          fill="#146EF5"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <h2>{section}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-7 mx-auto">
          {<ProgressBar now={progressPoint} label={`${progressPoint}%`} />}
        </div>
      </div>
    </div>
  );
};

export default AddPropertiesHeader;

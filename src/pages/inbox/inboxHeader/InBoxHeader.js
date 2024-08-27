import React from "react";

const InBoxHeader = ({ showInterFace }) => {
  const labelName = [
    "Indox",
    "Smart Templates",
    "Review Removal",
    "Preferences",
    "Upsells",
  ];
  return (
    <div>
      {labelName?.map((label, index) => {
        return (
          <button
            onClick={() => {
              showInterFace(index);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default InBoxHeader;

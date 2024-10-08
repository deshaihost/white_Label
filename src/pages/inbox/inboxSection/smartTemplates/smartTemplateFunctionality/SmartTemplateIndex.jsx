import React, { useState } from "react";
import SmartTemplateAddEditForm from "./smartTemplateAddEdit/SmartTemplateAddEditForm";
import { type } from "@testing-library/user-event/dist/type";

const SmartTemplateIndex = () => {
  const add = "add";
  const edit = "edit";
  const [addEditSmart, setAddEditSmart] = useState({
    type: "",
    data: "",
  });

  return (
    <>
      {addEditSmart?.type === add || addEditSmart?.type === edit ? (
        <SmartTemplateAddEditForm
          addEditSmart={addEditSmart}
          addEditClose={() =>
            setAddEditSmart({
              type: "",
              data: "",
            })
          }
        />
      ) : (
        <>
          <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
            <h3>Smart Templates</h3>
          </div>
          <div
            style={{ width: "90%", margin: "20px auto", textAlign: "center" }}
          >
            <p style={{ color: "#CCC" }}>
              Send templated messages to the right guests at the right time. Use
              advanced technology to analyze conversations and situations to
              trigger messaging.
            </p>
          </div>

          <hr
            style={{ backgroundColor: "white", height: "2px", border: "none" }}
            className="mt-1"
          />

          <div
            className="row mt-5 clickable-div"
            style={{ marginLeft: "0", marginRight: "0" }}
            onClick={() => setAddEditSmart({ type: edit, data: "" })}
          >
            <div className="col-lg-11 col-12">
              <label className="fs-5">Post-Stay Review</label>
              <p className="settings-label">
                Send a message to your guests who had a positive experience,
                asking them to leave a review.
              </p>
            </div>
          </div>
          <div>
            <button onClick={() => setAddEditSmart({ type: add, data: "" })}>
              {" "}
              Add New
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SmartTemplateIndex;

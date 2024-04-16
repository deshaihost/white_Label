import React from "react";

const SuccessTotalBox = () => {
  return (
    <div className="d-flex justify-content-between">
      <div className="border px-5 mx-5">
        <div>
          <i class="bi bi-clock"></i>
        </div>
        <div>0</div>
        <div>Success Rate</div>
      </div>
      <div className="border mx-5 px-5">
        <div>
          <i class="bi bi-send"></i>
        </div>
        <div>0</div>
        <div>Total Conversation</div>
      </div>
    </div>
  );
};

export default SuccessTotalBox;

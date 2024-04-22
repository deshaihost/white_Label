import React from "react";
import { Link } from "react-router-dom";

const TranscriptsTable = () => {
  return (
    <div>
      <div class="row">
        <div class="col-lg-12">
          <div class="custom_table_wrapper">
            <div class="custom_table_heading">
              <h4>Transcripts </h4>
              <div class="expendable_search property_select">

                <select id="sort-conversation">
                  <option>Sort by</option>
                  <option>Successful</option>
                  <option>Unsuccessful</option>
                </select>
              </div>
            </div>
            <div class="custom_table_design table-responsive">
              <table class="table conversation-table">
                <thead>
                  <tr>
                    <th>Date </th>
                    <th>Time </th>
                    <th>Summery </th>
                    <th>Status</th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody class="transcript-data-table empty-table-conversation">
                  <tr>
                    <td colspan="5">
                      <div class="error">No data found you can manage settings from <Link to="">here</Link></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-9">Transcripts</div>
        <div className="col-3">
          <select className="form-select" aria-label="Default select example">
            <option selected>Sort by</option>
            <option value="1">Successful</option>
            <option value="2">unsuccessfull</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table class="table border mt-3 text-white">
            <thead>
              <tr>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">SUMMERY</th>
                <th scope="col">STATUS</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default TranscriptsTable;

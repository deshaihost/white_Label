import React from "react";

const TranscriptsTable = () => {
  return (
    <div>
      <div className="row">
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
      </div>
    </div>
  );
};

export default TranscriptsTable;

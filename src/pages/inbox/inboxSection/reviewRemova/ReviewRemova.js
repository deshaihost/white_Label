import React from "react";
import { Container } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import "./index.css";

const ReviewRemova = () => {
  return (
    <div className="review-table">
      <div className="review-heading">
        <h2>Review Removal</h2>
        <p>
          HostBuddy compares guest conversations with associated reviews to
          determine potential review removal opportunities. If HostBuddy
          determines a review could be removed, it will generate a script for
          the host to report to the OTA.
        </p>
      </div>
      <div className="table-scroll">
      <div className="review-form">
        <div className="review-form-heading">
        <h3>Suggested</h3>
        </div>
        <form>
          <div>
            <input type="radio" name="review" value="complete" />
            <label>Complete</label>
          </div>
          <div>
            <input type="radio" name="review" value="incomplete" />
            <label>Incomplete</label>
          </div>
          <div className="expire">
            <input type="radio" name="review" value="expire" />
            <label>
              Expired<i class="bi bi-question-circle"></i>
            </label>
          </div>
          <div className="search-main">
            <input type="search" placeholder="Search" />
            <i class="bi bi-search"></i>
          </div>
        </form>
      </div>
      <div className="main-review">
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Stay Dates </th>
              <th scope="col">Property</th>
              <th scope="col">Guest</th>
              <th scope="col">review summary</th>
              <th scope="col">broken</th>
              <th scope="col" className="text-center">
                View review
              </th>
              <th scope="col" className="text-center">
                view report
              </th>
              <th scope="col" className="text-center">
                Complete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>June 1, 2024</td>
              <td>831 D</td>
              <td>Margaret Jones</td>
              <td>
                The guest missed their flight home because the host would not
                approve a late checkout.
              </td>
              <td>Biased</td>
              <td className="text-center">
                <i class="bi bi-star-fill" style={{ fontSize: "20px" }}></i>
              </td>
              <td className="text-center">
                <i class="bi bi-file-text" style={{ fontSize: "20px" }}></i>
              </td>
              <td className="text-center">
                <i
                  class="bi bi-check-circle-fill"
                  style={{ fontSize: "15px", color: "#146EF5" }}
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>

    <div className="table-scroll">
      <div className="review-form">
        <div className="review-form-heading">
        <h3>Suggested</h3>
        </div>
        <form>
          <div>
            <input type="radio" name="review" value="complete" />
            <label>Complete</label>
          </div>
          <div>
            <input type="radio" name="review" value="incomplete" />
            <label>Incomplete</label>
          </div>
          <div className="expire">
            <input type="radio" name="review" value="expire" />
            <label>
              Expired<i class="bi bi-question-circle"></i>
            </label>
          </div>
          <div className="search-main">
            <input type="search" placeholder="Search" />
            <i class="bi bi-search"></i>
          </div>
        </form>
      </div>
      <div className="main-review">
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Stay Dates </th>
              <th scope="col">Property</th>
              <th scope="col">Guest</th>
              <th scope="col">review summary</th>
              <th scope="col">broken</th>
              <th scope="col" className="text-center">
                View review
              </th>
              <th scope="col" className="text-center">
                view report
              </th>
              <th scope="col" className="text-center">
                Complete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>June 1, 2024</td>
              <td>831 D</td>
              <td>Margaret Jones</td>
              <td>
                The guest missed their flight home because the host would not
                approve a late checkout.
              </td>
              <td>Biased</td>
              <td className="text-center">
                <i class="bi bi-star-fill" style={{ fontSize: "20px" }}></i>
              </td>
              <td className="text-center">
                <i class="bi bi-file-text" style={{ fontSize: "20px" }}></i>
              </td>
              <td className="text-center">
                <i
                  class="bi bi-check-circle-fill"
                  style={{ fontSize: "15px", color: "#146EF5" }}
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
    </div>
  );
};

export default ReviewRemova;

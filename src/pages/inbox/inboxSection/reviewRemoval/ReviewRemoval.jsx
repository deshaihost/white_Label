import React, { useState, useEffect } from 'react';
import axios from "axios";
import ToastHandle from '../../../../helper/ToastMessage';
import { Container } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { BoxLoader, FullScreenLoader } from '../../../../helper/Loader';
import ViolationModal from './violationModal';
import GenerateReportModal from './generateReportModal';
import "./index.css";
import { set } from 'react-hook-form';

const ReviewRemoval = () => {

  const [allReviews, setAllReviews] = useState([]);
  const [initialFetchLoading, setInitialFetchLoading] = useState(true);
  const [reportsGenerating, setReportsGenerating] = useState([]);

  const [violationModalTopText, setViolationModalTopText] = useState("");
  const [violationModalText, setViolationModalText] = useState("");
  const [showViolationModal, setShowViolationModal] = useState(false);

  const [reviewModalText, setReviewModalText] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [reportModalText, setReportModalText] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);

  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);
  const [reviewIdForGenerateModal, setReviewIdForGenerateModal] = useState("");
  const [showOverwriteWarning, setShowOverwriteWarning] = useState(false);
  const [showFiveStarWarning, setShowFiveStarWarning] = useState(false);

  const callGetReviewsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const response = await axios.get( `${baseUrl}/get_reviews`, config );
  
      if (response.status === 200) { }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      return { error: "Internal server error" };
    }
  };

  // Given new review data from the API, replace the appropriate entry in allReviews state
  const updateReviewData = (reviewId, newReviewData) => {
    const updatedReviews = allReviews.map((review) => {
      if (review.id === reviewId) {
        return newReviewData;
      }
      return review;
    });
    setAllReviews(updatedReviews);
  };

  const callGenerateReportApi = async (reviewId, explanation) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setReportsGenerating([...reportsGenerating, reviewId]);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { review_id:reviewId, explanation };
      const response = await axios.post( `${baseUrl}/generate_review_report`, body_data, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        updateReviewData(reviewId, response.data.review);
      }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
      ToastHandle("Failed to generate report", "danger");
      return { error: "Failed to generate report" };
    } finally {
      setReportsGenerating(reportsGenerating.filter((id) => id !== reviewId));
    }
  };


  // When the page loads, fetch the reviews and populate the state
  useEffect(() => {
    const fetchReviews = async () => {
      setInitialFetchLoading(true);
      const data = await callGetReviewsApi();
      if (data && !data.error) {
        setAllReviews(data.reviews || []);
      }
      setInitialFetchLoading(false);
    };

    fetchReviews();
  }, []);

  // e.g. input "230919_160000" or "230919" -> output "Sep 19, 2023"
  const formatDateString = (dateString) => {
    const datePart = dateString.split('_')[0];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Parse the year, month, and day from the date part
    const year = `20${datePart.slice(0, 2)}`;
    const month = datePart.slice(2, 4);
    const day = datePart.slice(4, 6);
  
    // Create a Date object and format it
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  
    return formattedDate;
  };

  const reviewAsPlainText = (reviewData) => {
    let reviewText = '';
  
    if ('rating' in reviewData && reviewData.rating) { reviewText += `Review Rating: ${reviewData.rating}\n`; }
    if ('title' in reviewData && reviewData.title) { reviewText += `Review Title: ${reviewData.title}\n`; }
    if ('description' in reviewData && reviewData.description) { reviewText += `Review Description: ${reviewData.description}\n`; }
    if ('feedback' in reviewData && reviewData.feedback) { reviewText += `Review Feedback: ${reviewData.feedback}\n`; }
  
    if ('categoryRatings' in reviewData && reviewData.categoryRatings && reviewData.categoryRatings.length > 0) {
      reviewText += 'Category Ratings:\n';
      reviewData.categoryRatings.forEach((categoryItem) => {
        if ('category' in categoryItem && 'rating' in categoryItem && categoryItem.rating) {
          reviewText += `   ${categoryItem.category}: ${categoryItem.rating}`;
          if ('comment' in categoryItem && categoryItem.comment) {
            reviewText += ` (${categoryItem.comment})`;
          }
          reviewText += '\n';
        }
      });
    }
  
    return reviewText.trim();
  };

  const handleShowViolationClick = (e, violationType, violationText) => {
    e.preventDefault();
    setViolationModalTopText(`Violation Type: ${violationType}`);
    setViolationModalText(violationText);
    setShowViolationModal(true);
  }

  const handleShowReviewClick = (reviewData) => {
    const reviewText = reviewAsPlainText(reviewData);
    setReviewModalText(reviewText);
    setShowReviewModal(true);
  }

  const handleShowReportClick = (reportText) => {
    setReportModalText(reportText);
    setShowReportModal(true);
  }

  const handleGenerateReportClick = (reviewId, existingReport, rating) => {
    if (existingReport) { setShowOverwriteWarning(true); }
    else { setShowOverwriteWarning(false); }
    if (rating === 5) { setShowFiveStarWarning(true); }
    else { setShowFiveStarWarning(false); }
    setReviewIdForGenerateModal(reviewId);
    setShowGenerateReportModal(true);
  }



  return (
    <div className="review-table">
      <div className="review-heading">
        <h2>Review Removal</h2>
        <p>HostBuddy compares guest conversations with associated reviews to determine potential review removal opportunities. If HostBuddy determines a review could be removed, it will generate a script for the host to report to the OTA.</p>
      </div>
      <p style={{ textAlign:'center', fontSize:'14px', color:'rgb(255, 165, 0)', marginTop:'20px', marginBottom:'20px' }}>
        Review removal is currently in beta. Full release is scheduled for September 2024.
      </p>
      <div className="table-scroll">
        <div className="review-form">
          {/*
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
          */}
        </div>
        <div className="main-review">
          
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Reservation Dates</th>
                <th scope="col">Property</th>
                <th scope="col">Guest</th>
                <th scope="col">review summary</th>
                <th scope="col">Violation</th>
                <th scope="col" className="text-center">Review</th>
                <th scope="col" className="text-center">Generate</th>
                {/* <th scope="col" className="text-center">Complete</th> */}
              </tr>
            </thead>
            <tbody>
              {allReviews.map((review, index) => {
                console.log('review', review);
                const { guest, property_name, violation_type, title, description, rating, justification, report, id } = review;
                const { arrival_date, departure_date, guest_name_first, guest_name_last } = guest;

                const arrivalDateFormatted = formatDateString(arrival_date);
                const departureDateFormatted = formatDateString(departure_date);
                const guestName = `${guest_name_first} ${guest_name_last}`;

                const reviewTitle = title ? title : description;
                const reviewSummary = reviewTitle.length > 50 ? reviewTitle.slice(0, 50) + "..." : reviewTitle;
                const reviewSummaryWithRating = `(${rating} stars) ${reviewSummary}`;

                return (
                  <tr key={index}>
                    <td>{arrivalDateFormatted}<br/>{departureDateFormatted}</td>
                    <td>{property_name}</td>
                    <td>{guestName}</td>
                    <td>{reviewSummaryWithRating}</td>
                    <td>{reportsGenerating.includes(id) ? (
                        <BoxLoader />
                      ) : (
                        violation_type ? (
                          <a href="#" style={{fontSize:"16px"}} onClick={(e) => handleShowViolationClick(e, violation_type, justification)}>{violation_type}</a>
                          ) : (
                            "--"
                          ))}
                    </td>
                    <td className="text-center">
                      <i className="bi bi-star-fill" style={{ fontSize:"17px", marginRight:"5px", cursor:"pointer" }} onClick={() => handleShowReviewClick(review)}></i>
                      {report && (
                        <i className="bi bi-file-text" style={{ fontSize:"17px", cursor:"pointer" }} onClick={() => handleShowReportClick(report)}></i>
                      )}
                    </td>
                    {/*
                    <td className="text-center">
                      <i className="bi bi-check-circle-fill" style={{ fontSize: "15px", color: "#146EF5" }}></i>
                    </td>
                    */}
                    <td className="text-center">
                      {reportsGenerating.includes(id) ? (
                        <BoxLoader />
                      ) : (
                        <i className="bi bi-gear-fill" style={{ fontSize:"17px", cursor:"pointer" }} onClick={() => handleGenerateReportClick(id, report, rating)}></i>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
      </div>
      <ViolationModal title={"Violation"} bodyTopText={violationModalTopText} bodyMainText={violationModalText} show={showViolationModal} handleClose={() => setShowViolationModal(false)} />
      <ViolationModal title={"Review"} bodyMainText={reviewModalText} show={showReviewModal} handleClose={() => setShowReviewModal(false)} />
      <ViolationModal title={"Review Removal Report"} bodyMainText={reportModalText} show={showReportModal} handleClose={() => setShowReportModal(false)} />
      <GenerateReportModal reviewId={reviewIdForGenerateModal} callGenerateReportApi={callGenerateReportApi} showOverwriteWarning={showOverwriteWarning} showFiveStarWarning={showFiveStarWarning} show={showGenerateReportModal} closeModal={() => setShowGenerateReportModal(false)} />
      <p style={{ textAlign:'center', fontSize:'14px', color:'rgb(255, 165, 0)', marginTop:'20px' }}>
        Coming Soon (early September 2024)
      </p>
    </div>
  );
};

export default ReviewRemoval;

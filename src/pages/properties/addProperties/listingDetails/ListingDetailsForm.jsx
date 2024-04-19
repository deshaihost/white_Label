import React from "react";
import { GetquestionnaireFunction } from "../../../../helper/Authorized";
import Loader from "../../../../helper/Loader";
const ListingDetailsForm = () => {
  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const listingDetailsInputData = questionnaireApi["Listing Details"]
    ? questionnaireApi["Listing Details"]
    : [];
  const Booking = listingDetailsInputData["Booking"];
  const checkInandCheckout = listingDetailsInputData["Check-in and Check-out"];
  const Details = listingDetailsInputData["Details"];

  return (
    <>
      {!apiQuestionnaireLoading ? (
        <div className="form-design">
          <h1 className="text-white mb-3 fs-4 fw-bold">Booking</h1>
          <div className="row my-3">
            {Booking?.map((booking) => {
              const selectOption = booking?.options;
              return (
                <>
                  {booking?.question_type === "select" ? (
                    <>
                      <div className="col-6 mt-3">
                        <label className="text-white">
                          {booking?.question_text}
                        </label>
                        <select
                          class="form-select form-control"
                          aria-label="Default select example"
                        >
                          {selectOption?.map((options) => {
                            return (
                              <>
                                <option>{options}</option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="col-6 mt-3">
                      <label className="text-white">{booking?.question_text}</label>
                      <div className="">
                        <input
                          className="bg-dark form-control"
                          type="text"
                          // {...register(`${item?.question_type}${index1}`)}
                          placeholder={booking?.placeholder_text}
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>

          <h1 className="text-white mb-3 fs-4 fw-bold mt-5">Check-in and Check-out</h1>
          <div className="row my-3">
            {checkInandCheckout?.map((checkInandCheckout) => {
              return (
                <>
                  <div className="col-6 mt-3">
                    <label className="text-white">
                      {checkInandCheckout?.question_text}
                    </label>
                    <div className="">
                      <input
                        className="bg-dark form-control"
                        type="text"
                        placeholder={checkInandCheckout?.placeholder_text}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <h1 className="text-white mb-3 fs-4 fw-bold mt-5">Details</h1>
          <div className="row my-3">
            {Details?.map((checkInandCheckout) => {
              return (
                <>
                  <div className="col-6 mt-3">
                    <label className="text-white">
                      {checkInandCheckout?.question_text}
                    </label>
                    <div className="">
                      <input
                        className="bg-dark form-control"
                        type="text"
                        placeholder={checkInandCheckout?.placeholder_text}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ListingDetailsForm;

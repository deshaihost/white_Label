import React, { useEffect } from "react";
import { GetquestionnaireFunction, nameKey } from "../../../../helper/Authorized";
import { getQuestionnaireActions } from "../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../helper/Loader";
const ListingDetailsForm = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // const getLocalStorageData = nameKey();
  // const getLocalStorageNameKey = getLocalStorageData?.nameKey;
  // const apiQuestionnaireData =
  //   store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  //   const apiQuestionnaireLoading=store?.getQuestionnaireReducer?.loading
  // const { questionnaire } = apiQuestionnaireData ? apiQuestionnaireData : [];
  // const locationFildInput = questionnaire ? questionnaire : [];
  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const listingDetailsInputData = questionnaireApi["Listing Details"];
  const Booking = listingDetailsInputData["Booking"];
  const checkInandCheckout = listingDetailsInputData["Check-in and Check-out"];
  const Details = listingDetailsInputData["Details"];

  // useEffect(() => {
  //   if (getLocalStorageNameKey !== null) {
  //     dispatch(getQuestionnaireActions(getLocalStorageNameKey));
  //   }
  // }, [getLocalStorageNameKey]);
  return (
    <>
      {!apiQuestionnaireLoading ? (
        <div>
          <h1 className="text-white">Booking</h1>
          <div className="row border p-5 my-3">
            {Booking?.map((booking) => {
              const selectOption = booking?.options;
              return (
                <>
                  {booking?.question_type === "select" ? (
                    <>
                      <div className="col-4">
                        <div className="text-white">
                          {booking?.question_text}
                        </div>
                        <select
                          class="form-select"
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
                    <div className="col-4">
                      <div className="text-white">{booking?.question_text}</div>
                      <div className="input-container">
                        <input
                          className="bg-dark"
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

          <h1 className="text-white">Check-in and Check-out</h1>
          <div className="row border p-5 my-3">
            {checkInandCheckout?.map((checkInandCheckout) => {
              return (
                <>
                  <div className="col-4">
                    <div className="text-white">
                      {checkInandCheckout?.question_text}
                    </div>
                    <div className="input-container">
                      <input
                        className="bg-dark"
                        type="text"
                        placeholder={checkInandCheckout?.placeholder_text}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <h1 className="text-white">Details</h1>
          <div className="row border p-5 my-3">
            {Details?.map((checkInandCheckout) => {
              return (
                <>
                  <div className="col-4">
                    <div className="text-white">
                      {checkInandCheckout?.question_text}
                    </div>
                    <div className="input-container">
                      <input
                        className="bg-dark"
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

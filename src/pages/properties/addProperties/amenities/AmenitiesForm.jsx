import React, { useState } from "react";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../helper/Authorized";
import Loader from "../../../../helper/Loader";
import { Modal } from "react-bootstrap";
const AmenitiesForm = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const Amenities = questionnaireApi["Amenities"]
    ? questionnaireApi["Amenities"]
    : [];
  const family = Amenities["Family"]?.[0];
  const Indoor = Amenities["Indoor"]?.[0];
  const More = Amenities["More"]?.[0];
  const Outdoor = Amenities["Outdoor"]?.[0];
  const RulesAndServices = Amenities["Rules and Services"]?.[0];

  const [amenitiesInputOnClickGet, setAmenitiesInputOnClickGet] = useState([]);

  const amenitiesMainHandle = (type, item, id) => {
    if (type) {
      setAmenitiesInputOnClickGet([...amenitiesInputOnClickGet, { id, item }]);
    } else if (!type) {
      let getFilter = amenitiesInputOnClickGet?.filter(
        (items) => items?.id !== id
      );
      setAmenitiesInputOnClickGet(getFilter);
    }
  };
  return (
    <>
      <Modal
        size="md"
        show={show} onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="contact-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Extra Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-design">
            <label>Baby bath</label>
            <textarea className="form-control" name="" id="" cols="30" rows="10" placeholder="Enter note here..."></textarea>
            <div className="d-flex justify-content-center mt-3">
              <button className="mw-auto">
                Add Note
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {!apiQuestionnaireLoading ? (
        <div>
          <h1 className="text-white fs-4 fw-bold mb-3">family</h1>
          <div className="row ">
            <div className="col-lg-12">
              <label className="text-white">{family?.placeholder_text} </label>
              <ul className="amenties-list">
                {family?.options?.map((family, indexFamily) => {
                  const activeName = amenitiesInputOnClickGet.some(el => family.includes(el?.item));
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div
                          class={
                            activeName
                              ? "form-checkbox active"
                              : "form-checkbox "
                          }
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            value="option1"
                            onClick={(e) => {
                              amenitiesMainHandle(
                                e.target.checked,
                                family,
                                indexFamily
                              );
                            }}
                          />
                          <label
                            class='form-check-label'
                            for="inlineCheckbox1"
                          >
                            {family}
                          </label>
                          <button onClick={handleShow} className="bg-none p-0 border-0">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z" fill="#146EF5
                           "></path>
                            </svg>
                          </button>
                        </div>
                      </li>

                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">Indoor</h1>
          <div className="row">
            <div className="col-lg-12">
              <label className="text-white">{Indoor?.placeholder_text} </label>
              <ul className="amenties-list">
                {Indoor?.options?.map((Indoor) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div class="form-checkbox">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value="option1"
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            {Indoor}
                          </label>
                          <button className="bg-none p-0 border-0">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z" fill="#146EF5
                                                                    "></path>
                            </svg>
                          </button>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>

          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">More</h1>
          <div className="row ">
            <div className="col-lg-12">
              <label className="text-white">{Indoor?.placeholder_text} </label>
              <ul className="amenties-list">
                {More?.options?.map((More) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div class="form-checkbox">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox3"
                            value="option1"
                          />
                          <label class="form-check-label" for="inlineCheckbox3">
                            {More}
                          </label>
                          <button className="bg-none p-0 border-0">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z" fill="#146EF5
                                                                    "></path>
                            </svg>
                          </button>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">Outdoor</h1>
          <div className="row ">
            <div className="col-lg-12">
              <label className="text-white">{Outdoor?.placeholder_text} </label>
              <ul className="amenties-list">
                {Outdoor?.options?.map((Outdoor) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div class="form-checkbox">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox4"
                            value="option1"
                          />
                          <label class="form-check-label" for="inlineCheckbox4">
                            {Outdoor}
                          </label>
                          <button className="bg-none p-0 border-0">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z" fill="#146EF5
                                                                    "></path>
                            </svg>
                          </button>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <h1 className="text-white mt-5 fs-4 fw-bold mb-3">Rules and Services</h1>
          <div className="row">
            <div className="col-lg-12">
              <label className="text-white">
                {RulesAndServices?.placeholder_text}{" "}
              </label>
              <ul className="amenties-list">
                {RulesAndServices?.options?.map((RulesAndServices) => {
                  return (
                    <>
                      <li className="amenties-list-item">
                        <div class="form-checkbox">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox5"
                            value="option1"
                          />
                          <label class="form-check-label" for="inlineCheckbox5">
                            {RulesAndServices}
                          </label>
                          <button className="bg-none p-0 border-0">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z" fill="#146EF5
                                                                    "></path>
                            </svg>
                          </button>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AmenitiesForm;

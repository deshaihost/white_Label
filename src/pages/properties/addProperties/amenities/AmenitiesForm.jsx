import React, { useState } from "react";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../helper/Authorized";
import Loader from "../../../../helper/Loader";
const AmenitiesForm = () => {
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
      {!apiQuestionnaireLoading ? (
        <div>
          <h1 className="text-white ">family</h1>
          <div className="row border p-5">
            <div className="text-white">{family?.placeholder_text} </div>
            {family?.options?.map((family, indexFamily) => {
              const activeName = amenitiesInputOnClickGet.some(el => family.includes(el?.item));
              return (
                <>
                  <div className="col-2">
                    <div
                      class={
                        activeName
                          ? "form-check border bg-light form-check-inline border  mx-5 px-5 py-2"
                          : "form-check border  form-check-inline border  mx-5 px-5 py-2"
                      }
                    >
                      <input
                        class="form-check-input border-danger bg-ligh"
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
                        class='form-check-label text-white'
                        for="inlineCheckbox1"
                      >
                        {family}
                      </label>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <h1 className="text-white ">Indoor</h1>
          <div className="row border p-5">
            <div className="text-white">{Indoor?.placeholder_text} </div>
            {Indoor?.options?.map((Indoor) => {
              return (
                <>
                  <div className="col-2">
                    <div class="form-check form-check-inline border bg-light mx-5 px-5 py-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label class="form-check-label" for="inlineCheckbox1">
                        {Indoor}
                      </label>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <h1 className="text-white ">More</h1>
          <div className="row border p-5">
            <div className="text-white">{Indoor?.placeholder_text} </div>
            {More?.options?.map((More) => {
              return (
                <>
                  <div className="col-2">
                    <div class="form-check form-check-inline border bg-light mx-5 px-5 py-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label class="form-check-label" for="inlineCheckbox1">
                        {More}
                      </label>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <h1 className="text-white ">Outdoor</h1>
          <div className="row border p-5">
            <div className="text-white">{Outdoor?.placeholder_text} </div>
            {Outdoor?.options?.map((Outdoor) => {
              return (
                <>
                  <div className="col-2">
                    <div class="form-check form-check-inline border bg-light mx-5 px-5 py-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label class="form-check-label" for="inlineCheckbox1">
                        {Outdoor}
                      </label>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <h1 className="text-white ">Rules and Services</h1>
          <div className="row border p-5">
            <div className="text-white">
              {RulesAndServices?.placeholder_text}{" "}
            </div>
            {RulesAndServices?.options?.map((RulesAndServices) => {
              return (
                <>
                  <div className="col-2">
                    <div class="form-check form-check-inline border bg-light mx-5 px-5 py-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                      />
                      <label class="form-check-label" for="inlineCheckbox1">
                        {RulesAndServices}
                      </label>
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

export default AmenitiesForm;

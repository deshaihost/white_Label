import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestionnaireActions } from "../../../../../redux/actions";
import {
  GetquestionnaireFunction,
  nameKey,
} from "../../../../../helper/Authorized";
import Loader from "../../../../../helper/Loader";
const LocationForm = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const getLocalStorageData = nameKey();
  const apiQuestionnaireData =
    store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const ExtrasFormCall = GetquestionnaireFunction();
  const { questionnaireApi, apiQuestionnaireLoading } = ExtrasFormCall
    ? ExtrasFormCall
    : [];
  const locationFildInput = questionnaireApi["Basics"]?.["Location"];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("property-name:", getLocalStorageData?.nameKey);
    formData.append("property-image", data?.defultImage[0]);
    formData.append("Property_Type", data?.select0);
    formData.append("Property_Type_hidden", "");
    formData.append("Street_Address", data?.short_answer1);
    formData.append("Unit_Number", data?.short_answer2);
    formData.append("City", data?.short_answer3);
    formData.append("State", data?.short_answer4);
    formData.append("Area_Code", data?.short_answer5);
    formData.append("Country", data?.short_answer6);
    formData.append("action", "hb_add_property_first_step");
    formData.append("security", "a276ea2870");
    formData.append("property_complete_percentage_now", "20%");
    formData.append("curr_user", 105);
    formData.append("is_editing", "");
    formData.append("is_added_to_hostbuddy", true);
    formData.append("current_main_section", "Basics");
    formData.append("current_sub_section", "Location");
    formData.append("questionnaire", JSON.stringify(apiQuestionnaireData));
    dispatch(
      updateQuestionnaireActions({
        nameKey: getLocalStorageData,
        formeData: formData,
      })
    );
  };
  return (
    <>
      {!apiQuestionnaireLoading ? (
        <div>
          <form
            onSubmit={handleSubmit(
              (data) => {
                onSubmit(data);
              },
              (err) => {
                console.log(err, "ee");
              }
            )}
          >
            <input type="file" {...register("defultImage")} />
            <div className="row">
              <div className="col-12">
                {locationFildInput?.map((item, index1) => {
                  const selectOption = item?.options;
                  return (
                    <>
                      {item?.question_type === "select" ? (
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          {...register(`${item?.question_type}${index1}`)}
                        >
                          {selectOption?.map((options) => {
                            return (
                              <>
                                <option value={options}>{options}</option>
                              </>
                            );
                          })}
                        </select>
                      ) : (
                        <>
                          <div className="text-white">
                            {item?.question_text}
                          </div>
                          <div className="input-container">
                            <input
                              type="text"
                              {...register(`${item?.question_type}${index1}`)}
                              placeholder={item?.placeholder_text}
                            />
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
            <button>add</button>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LocationForm;

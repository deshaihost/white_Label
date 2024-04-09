import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorMessageShow from "../../../../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../../../../helper/ErrorMessageKey";
import { useSelector, useDispatch } from "react-redux";
import { addPMSIntegrationActions } from "../../../../redux/actions";
import ToastHandle from "../../../../helper/ToastMessage";
import { stateEmptyActions } from "../../../../redux/actions";
import Loader from "../../../../helper/Loader";
const IntergratePlatFormInput = ({ PmsIntegrationData,handleNoPlanClose }) => {
  const { type, data } = PmsIntegrationData ? PmsIntegrationData : [];
  const store = useSelector((state) => state);
  const integrationAddStatus =
    store?.pmsIntegrationAddReducer?.pmsIntegrationDataAdd?.status;
  const integrationLoading = store?.pmsIntegrationAddReducer?.loading;
  const integrationAddMessage=store?.pmsIntegrationAddReducer?.pmsIntegrationDataAdd?.data?.message

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      addPMSIntegrationActions({
        platform: type,
        credentials: data,
      })
    );
  };
  useEffect(() => {
    if (integrationAddStatus === 200) {
      ToastHandle(integrationAddMessage, "success");
      dispatch(stateEmptyActions());
      handleNoPlanClose("pmsIntegrationClose")

    } else if (integrationAddStatus === 500) {
      ToastHandle("Unexpected HTTP status: 500", "danger");
      dispatch(stateEmptyActions());
    }
  }, [integrationAddStatus]);
  return (
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
        {data?.map((item) => {
          const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
          };
          const text = item;
          const capitalizedText = capitalizeFirstLetter(text);
          return (
            <>
              <div className="col">
                <div className="input_group">
                  <label htmlFor="">
                    {capitalizedText === "Client_id"
                      ? "Client id"
                      : capitalizedText === "Api_key"
                      ? "Api key"
                      : capitalizedText}
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    {...register(`${item}`, { required: true })}
                  />
                  {errors?.[item]?.type === "required" && (
                    <>
                      {ErrorMessageShow([
                        capitalizedText === "AccessToken"
                          ? "Please fill the value of AccessToken."
                          : capitalizedText === "RefreshToken"
                          ? "Please fill the value of RefreshToken."
                          : capitalizedText === "AgencyUid"
                          ? "Please fill the value of AgencyUid."
                          : capitalizedText === "Client_id"
                          ? "Please fill the value of Client id."
                          : capitalizedText === "Api_key"
                          ? "Please fill the value of Api key."
                          : "",
                      ])}
                    </>
                  )}
                </div>
              </div>
            </>
          );
        })}
        <div className=" text-center mt-3">
          <button
            className="btn btn-primary "
            disabled={integrationLoading ? true : false}
          >
            {!integrationLoading ? "Verify & Import Property" : <Loader />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IntergratePlatFormInput;

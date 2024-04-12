import React, { useEffect, useState } from "react";
import {
  deleteListIntegrationPropertiesActions,
  getUserDataActions,
  stateEmptyActions,
} from "../../../redux/actions";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import Loader from "../../../helper/Loader";

const ListIntegrationProperties = () => {
  const { store, dispatch } = useSelectorUseDispatch();
  const userDataGetLoading = store?.getUserDataReducer?.loading;
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const propertiesDeleteMessage =
    store?.deleteListIntegrationPropertiesReducer
      ?.deleteListIntegrationProperties?.data?.message;
  const propertiesDeleteError =
    store?.deleteListIntegrationPropertiesReducer
      ?.deleteListIntegrationProperties?.data?.error;
  const propertiesDeleteStatus =
    store?.deleteListIntegrationPropertiesReducer
      ?.deleteListIntegrationProperties?.status;
  const propertiesDeleteLoading =
    store?.deleteListIntegrationPropertiesReducer?.loading;

  const [propertiesDeleteId, setPropertiesDeleteId] = useState("");
  const propertiesDeleteHndle = (data, id) => {
    setPropertiesDeleteId(id);
    dispatch(deleteListIntegrationPropertiesActions(data));
  };

  useEffect(() => {
    if (propertiesDeleteStatus === 200) {
      ToastHandle(propertiesDeleteMessage, "success");
      dispatch(getUserDataActions());
      dispatch(stateEmptyActions());
    } else if (propertiesDeleteStatus === 404) {
      ToastHandle(propertiesDeleteError, "danger");
      dispatch(stateEmptyActions());
    }
  }, [propertiesDeleteStatus]);

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  return (
    <div>
      {!userDataGetLoading ? (
        <>
          {createPropertiesName?.map((properties, index) => {
            return (
              <>
                <div className="row border p-4">
                  <div className="col-4 ">image</div>
                  <div className="col-4">{properties}</div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        propertiesDeleteHndle(properties, index);
                      }}
                    >
                      {!propertiesDeleteLoading ? (
                        <i class="bi bi-trash"></i>
                      ) : (
                        <>
                          {propertiesDeleteId === index ? (
                            <Loader />
                          ) : (
                            <i class="bi bi-trash"></i>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ListIntegrationProperties;

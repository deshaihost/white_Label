import React, { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";
import ToastHandle from "../../../../helper/ToastMessage";

const ReservationStageModal = ({
    show,
    handleClose,
    reservationClickData,
    addedNote,
    setAddedNote,
}) => {
    const [checkChange, setCheckChange] = useState(false);
    const [noteData, setNoteData] = useState("");

    const [checkedSchedule, setCheckedSchedule] = useState({
        Future: false,
        Past: false,
        Current: false,
    });

    const handleChangeStatus = (checkedData) => {
        // Mapping between keys and corresponding values
        const keyToValueMap = {
            Future: "FUTURE",
            Past: "INQUIRY/PAST",
            Current: "CURRENT"
        };
        let newStatus = [];
        let newReservationStage = "";

        // Iterate over the keys of checkedData
        for (const key in checkedData) {
            if (checkedData[key]) {
                // If the value is true, push the corresponding value to newStatus
                newStatus.push(keyToValueMap[key]);
            } else {
                // If the value is false, remove the corresponding value from newStatus
                const index = newStatus.indexOf(keyToValueMap[key]);
                if (index !== -1) {
                    newStatus.splice(index, 1);
                }
            }
        }

        if (newStatus.length > 0) {
            newReservationStage = newStatus.join(",");
        }

        handleAddReservationStage(newReservationStage);

    }

    // handle Stage button clicks
    const handleOnChange = (e, type) => {
        if (type === "Future") {
            setCheckedSchedule((prevData) => ({
                ...prevData,
                Future: e.target.checked,
            }));
        }
        if (type === "Past") {
            setCheckedSchedule((prevData) => ({
                ...prevData,
                Past: e.target.checked,
            }));
        }
        if (type === "Current") {
            setCheckedSchedule((prevData) => ({
                ...prevData,
                Current: e.target.checked,
            }));
        }


        console.log("Checked: ", e.target.checked);
        // setCheckChange(true)
    };

    const handleAddReservationStage = (stageToSet) => {
        // console.log("stageToSet: ", stageToSet)
        // if (noteData.trim() !== "") {
        setAddedNote((prev) => ({
            ...prev,
            [reservationClickData?.name]: stageToSet,
        }));
        handleClose();
    };

    useEffect(() => {
        if (addedNote && reservationClickData?.name in addedNote) {
            // If addedNote contains a key matching reservationClickData.name, set noteData to its value
            let existingStatus = addedNote[reservationClickData?.name]
            if (existingStatus.length > 0) {
                let deselectedStages = existingStatus.split(",")
                deselectedStages.forEach((type, index) => {

                    if (type === "FUTURE") {
                        setCheckedSchedule((prevData) => ({
                            ...prevData,
                            Future: true,
                        }));
                    }
                    if (type === "INQUIRY/PAST") {
                        setCheckedSchedule((prevData) => ({
                            ...prevData,
                            Past: true,
                        }));
                    }
                    if (type === "CURRENT") {
                        setCheckedSchedule((prevData) => ({
                            ...prevData,
                            Current: true,
                        }));
                    }

                })

            }

        } else {
            let existingStatusValue = reservationClickData?.value;

            if (existingStatusValue.length > 0) {
                let deselectedStagesData = existingStatusValue.split(",")
                deselectedStagesData.forEach((type, index) => {

                    if (type === "FUTURE") {
                        setCheckedSchedule((prevData) => ({
                            ...prevData,
                            Future: true,
                        }));
                    }
                    if (type === "INQUIRY/PAST") {
                        setCheckedSchedule((prevData) => ({
                            ...prevData,
                            Past: true,
                        }));
                    }
                    if (type === "CURRENT") {
                        setCheckedSchedule((prevData) => ({
                            ...prevData,
                            Current: true,
                        }));
                    }

                })

            }

        }
    }, [reservationClickData, addedNote]);

    // previous one for onChange without save button
    // useEffect(() => {
    //     if (checkChange) {
    //         handleChangeStatus(checkedSchedule);
    //         setCheckChange(false);
    //     }
    // }, [checkChange, checkedSchedule])

    return (
        <>
            <Modal
                size="md"
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="contact-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Settings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-design">
                        <label>Information from this question will only be provided to guests at the selected (blue) reservation stages. You can de-select stages below to prevent HostBuddy from sharing this information with those guests.</label>
                        {/* </div> */}

                        <div className=" d-flex justify-content-between mt-3">
                            <div class="col text-center">
                                <input
                                    type="checkbox"
                                    checked={checkedSchedule.Future}
                                    onChange={(e) => handleOnChange(e, "Future")}
                                    className="btn-check"
                                    id="future"
                                    autocomplete="off"
                                />
                                <label
                                    className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Future ? "btn-unselected" : ""
                                        }`}
                                    for="future"
                                >
                                    Future
                                </label>
                            </div>
                            <div class="col text-center">
                                <input
                                    type="checkbox"
                                    checked={checkedSchedule.Past}
                                    onChange={(e) => handleOnChange(e, "Past")}
                                    className="btn-check"
                                    id="past"
                                    autocomplete="off"
                                />
                                <label
                                    className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Past ? "btn-unselected" : ""
                                        }`}
                                    for="past"
                                >
                                    Inquiry/Past
                                </label>
                            </div>
                            <div class="col text-center">
                                <input
                                    type="checkbox"
                                    checked={checkedSchedule.Current}
                                    onChange={(e) => handleOnChange(e, "Current")}
                                    className="btn-check"
                                    id="current"
                                    autocomplete="off"
                                />
                                <label
                                    className={`btn btn-primary rounded-pill tab-btn-stage px-4 ${checkedSchedule.Current ? "btn-unselected" : ""
                                        }`}
                                    for="current"
                                >
                                    Current
                                </label>
                            </div>
                        </div>

                        <hr style={{ borderTop: "2px solid #0078F0", margin: "20px 0 30px 0" }} />

                        <div className="d-flex justify-content-center mt-3">
                            <button className="mw-auto" onClick={() => handleChangeStatus(checkedSchedule)}>
                                Save
                            </button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default ReservationStageModal;

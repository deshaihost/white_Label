import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./account.css";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, stateEmptyActions } from "../../redux/actions";

// Location & Time Zone Section of account page
const AccountContactSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  
  const [confCodeSending, setConfCodeSending] = useState(false);
  const [codeConfirming, setCodeConfirming] = useState(false);
  const [newContactAdding, setNewContactAdding] = useState(false);
  const [contacts, setContacts] = useState([{ type:'', name:'', address:'', confirmed:false }]); // All prev added contacts from the API. Populated on page load in the UseEffect
  const [confirmationCode, setConfirmationCode] = useState(""); // This is the user's input for confirmation code
  const [codeSentFor, setCodeSentFor] = useState(""); // This is the contact that the code was sent for, if any

  // Define the different sections of contact information. Will need to manually update this as we add new contact types
  //const contact_sections = {'email':{'title':'Email Addresses', 'singular':'Email Address'}, 'phone':{'title':'Phone Numbers', 'singular':'Phone Number'}};
  const contact_sections = {'email':{'title':'Email Addresses', 'singular':'Email Address'}};
  const initialState = Object.keys(contact_sections).reduce((acc, key) => {
    acc[key] = {};
    return acc;
  }, {});
  const [newContacts, setNewContacts] = useState(initialState);


  const addNewContact = async (contact_type, contact_name, contact_address) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { 'contact_info':{ [contact_address]:{ name:contact_name, type:contact_type } } };
    setNewContactAdding(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/add_contact`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setNewContactAdding(false);
      return response.status;
    }
    catch (error) { ToastHandle(error, "danger"); }
    finally { setNewContactAdding(false); }
  }


  // Send confirmation code to the user's address, which they then need to go confirm
  const callSendCodeAPI = async (contact_type, contact_address) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { contact_type, contact_information:contact_address };
    setConfCodeSending(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/send_contact_confirmation`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setConfCodeSending(false);
      return response.status;
    }
    catch (error) { ToastHandle(error, "danger"); }
    finally { setConfCodeSending(false); }
  }


  // Sobmit the confirmation code to the API to complete confirmation
  const callConfirmContactAPI = async (contact_type, contact_address, confirmation_code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { contact_type, contact_information:contact_address, confirmation_code };
    setCodeConfirming(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/confirm_contact`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setCodeConfirming(false);
      return response.status;
    }
    catch (error) { ToastHandle(error, "danger"); }
    finally { setCodeConfirming(false); }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

  };


  const handleInputChange = (event, section) => {
    const { name, value } = event.target;
    const updatedNewContacts = {...newContacts};
    updatedNewContacts[section][name] = value;
    setNewContacts(updatedNewContacts);
  };


  const showAddFields = (section) => {
    let updatedNewContacts = {...newContacts, [section]:{ type:'', name:'', address:'', confirmed:false }};
    setNewContacts(updatedNewContacts);
  };


  const addContact = async (name, type, address) => {
    const responseCode = await addNewContact(type, name, address);
    if (responseCode === 200) {
      dispatch(getUserDataActions()); // update our data from the API
    }
  };


  const removeContact = (index) => {
  };


  // Send the code to the user's address, which they then need to go confirm
  const sendConfirmationCode = async (index) => {
    setCodeSentFor(contacts[index].address);
    const responseCode = await callSendCodeAPI(contacts[index].type, contacts[index].address);
    if (responseCode != 200) { setCodeSentFor(""); }
  };


  // Submit the confirmation code to the API to complete confirmation
  const submitConfirmationCode = async (index) => {
    const responseCode = await callConfirmContactAPI(contacts[index].type, contacts[index].address, confirmationCode);
    if (responseCode === 200) {
      setCodeSentFor(""); // reset the codeSentFor state
      setConfirmationCode(""); // reset the confirmation code input
      dispatch(getUserDataActions()); // update our data from the API
    }
  };


  // Fetch user data on page load, to populate "userDataGet"
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);


  // when userDataGet populates, populate the previous contacts data
  useEffect(() => {
    if (userDataGet) {
      let updatedContacts = [];
      updatedContacts.push({ type:'email', name:'Primary Email', address:userDataGet.email, confirmed:true }); // Add the user's primary email address first

      if (userDataGet?.contact_information) {
        for (let contactType in userDataGet.contact_information) {
          for (let contact in userDataGet.contact_information[contactType]) {
            let isConfirmed = true;
            if ("last_confirmation_sent" in userDataGet.contact_information[contactType][contact]) { isConfirmed = false; }
            let contact_name = userDataGet.contact_information[contactType][contact].name;
            updatedContacts.push({ type:contactType, name:contact_name, address:contact, confirmed:isConfirmed });
          }
        }
      }
      setContacts(updatedContacts);
    }
  }, [userDataGet]);

  return (
    <div className="account-content location-section">
      <h3>Contact Information</h3>

      <form action="">

        {Object.keys(contact_sections).map((section, index) => (
          <>
            <hr className="in-section-divider" />
            <h4>{contact_sections[section].title}</h4>

            {/* Existing contact information */}
            <table className="table">
              <tbody>
                {contacts.map((contact, index) => (
                  contact.type === section && (
                    <tr key={index}>
                      <td><h6>{contact.name}</h6> </td>
                      <td><h6>{contact.address}</h6> </td>
                      <td><h6>{contact.confirmed ? <h6 className="grey-text">Confirmed</h6> : <h6 className="warning-text">Not Confirmed</h6> }</h6> </td>
                      <td>
                        {!contact.confirmed &&
                          (codeSentFor !== contact.address ? (
                            <span className="d-flex justify-content-center">
                              <Link to="#" style={{fontSize:"1rem", lineHeight:'1.2', margin:'0'}} className="text-link" onClick={() => sendConfirmationCode(index)}>Get Confirmation Code</Link>
                            </span>
                          ) : (
                            <>
                              {!confCodeSending ? (
                                <div className="row confirmation_code_input" style={{margin:"0"}}>
                                  <div className="col-12">
                                    <label htmlFor="confCode">Enter Code</label>
                                  </div>
                                  <div className="col d-flex">
                                    <input type="text" id="confCode" name="code" value={confirmationCode} onChange={e => setConfirmationCode(e.target.value)} />
                                    <span>
                                      {!codeConfirming ? (
                                        <Link to="#" style={{fontSize:"1rem", lineHeight:'1.2', margin:'0'}} className="text-link" onClick={() => submitConfirmationCode(index)}>Submit</Link>
                                      ) : (
                                        <Loader />
                                      )}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <Loader />
                              )}
                            </>
                          ))
                        }
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>


            {Object.keys(newContacts[section] || {}).length > 0 && (
              <>
                {/*contacts.section.length === 0 && <p><span className="grey-text">No {contact_sections[section].singular} Added.</span></p>*/}
                <div className="recipient" style={{marginTop:"20px"}} key={index}>
                  <div className="row">
                    <div className="col input_group">
                      <label htmlFor={`name${index}`}>Name</label>
                      <input type="text" id={`name${index}`} name="name" className="form-control" value={newContacts?.[section]?.name} onChange={e => handleInputChange(e, section)} />
                    </div>

                    <div className="col input_group">
                      <label htmlFor={`address${index}`}>{contact_sections[section].singular}</label>
                      <input type="text" id={`address${index}`} name="address" className="form-control" value={newContacts?.[section]?.address} onChange={e => handleInputChange(e, section)} />
                    </div>
                  </div>

                  <span className="d-flex justify-content-center">
                    {!newContactAdding ? (
                      <Link to="#" style={{marginTop:'20px', textAlign:'center'}} className="text-link" onClick={() => addContact(newContacts?.[section]?.name, section, newContacts?.[section]?.address)}>Submit</Link>
                    ) : (
                      <Loader />
                    )}
                  </span>

                </div>
              </>
            )}

            {Object.keys(newContacts[section] || {}).length === 0 &&
              <span className="d-flex justify-content-center" style={{ marginTop:'30px', marginBottom:'70px' }}>
                <Link to="#" className="text-link" onClick={() => showAddFields(section)}>+ Add {contact_sections[section].singular}</Link>
              </span>
            }

          </>
        ))}

      </form>
    </div>
  );
};

export default AccountContactSection;

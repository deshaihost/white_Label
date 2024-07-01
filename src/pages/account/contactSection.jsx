import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  
  const [confCodeSending, setConfCodeSending] = useState(false);
  const [codeConfirming, setCodeConfirming] = useState(false);
  const [newContactAdding, setNewContactAdding] = useState(false);
  const [contacts, setContacts] = useState([{ type:'', name:'', address:'', confirmed:false }]); // All prev added contacts from the API. Populated on page load in the UseEffect
  const [confirmationCode, setConfirmationCode] = useState(""); // This is the user's input for confirmation code
  const [codeSentFor, setCodeSentFor] = useState(""); // This is the contact that the code was sent for, if any
  const [slackOauthCode, setSlackOauthCode] = useState(""); // Code received from Slack OAuth as part of the OAuth flow

  // Define the different sections of contact information. Will need to manually update this as we add new contact types
  //const contact_sections = {'email':{'title':'Email Addresses', 'singular':'Email Address'}};
  const contact_sections = {'email':{'title':'Email Addresses', 'singular':'Email Address'}, 'slack':{'title':'Slack Accounts', 'singular':'Slack Account'}};
  //const contact_sections = {'email':{'title':'Email Addresses', 'singular':'Email Address'}, 'phone':{'title':'Phone Numbers', 'singular':'Phone Number'}};
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
    catch (error) { ToastHandle("Unable to send confirmation code", "danger"); }
    finally { setConfCodeSending(false); }
  }

  const completeOauthAPI = async (code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { code };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/complete_slack_oauth`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setSlackOauthCode(""); // reset the slackOauthCode state
        dispatch(getUserDataActions()); // update our data from the API
      }
      //else { ToastHandle(response?.data?.error, "danger"); }
      else { console.log('API Response', response); }
      return response.status;
    }
    catch (error) { ToastHandle("Unable to complete Slack OAuth", "danger"); }
  }

  // Submit the confirmation code to the API to complete confirmation
  const callConfirmContactAPI = async (contact_type, contact_address, confirmation_code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { contact_type, contact_information:contact_address, confirmation_code };
    setCodeConfirming(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        //validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/confirm_contact`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setCodeConfirming(false);
      return response.status;
    }
    catch (error) { ToastHandle("Unable to confirm contact", "danger"); }
    finally { setCodeConfirming(false); }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  const handleInputChange = (event, section) => {
    const { name, type, checked, value } = event.target;
    const isCheckbox = type === 'checkbox';
    const updatedNewContacts = {...newContacts};
    updatedNewContacts[section][name] = isCheckbox ? checked : value;
    setNewContacts(updatedNewContacts);
  };

  const showAddFields = (section) => {
    let updatedNewContacts = {...newContacts, [section]:{ type:'', name:'', address:'', confirmed:false }};
    if (section === 'phone') { updatedNewContacts[section].consent_checked = false; }
    setNewContacts(updatedNewContacts);
  };

  const addContact = async (name, type, address) => {
    if (!name || !address) { ToastHandle("Please fill all fields", "danger"); }
    else {
      const responseCode = await addNewContact(type, name, address);
      if (responseCode === 200) {
        dispatch(getUserDataActions()); // update our data from the API
        setNewContacts(initialState); // reset the newContacts state
      }
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

  // If this is a redirect from Slack OAuth, get the code from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    if (code) { setSlackOauthCode(code); }
  }, [location]);

  // If we have a Slack OAuth code (and therefore user is in the process of authorizing Slack), call the API to complete the OAuth
  // Also show the Add Contact form for Slack, where a loader will be displayed
  useEffect(() => {
    if (slackOauthCode) {
      setNewContacts({ slack:{ name:'', address:'' } });
      completeOauthAPI(slackOauthCode);
    }
  }, [slackOauthCode]);


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

            {/* Add new contact information, within a given section */}
            {Object.keys(newContacts[section] || {}).length > 0 && (
              <>
                {section === 'slack' ? (
                  <div className="recipient" style={{marginTop:"20px"}} key={index}>
                    {slackOauthCode ? (
                      <div className="slack-container">
                        <p>We're adding HostBuddy AI to your Slack account. Please wait...</p>
                        <Loader />
                      </div>
                    ) : (
                      <div className="slack-container">
                        <p>Click the button below to add HostBuddy AI to your Slack account.</p>
                        <a id="slack-button" href="https://slack.com/oauth/v2/authorize?scope=incoming-webhook%2Cchannels%3Aread%2Cchat%3Awrite&amp;redirect_uri=https%3A%2F%2Fhostbuddy.ai%2Faccount%2Fcontact&amp;client_id=6640565127554.7377267101792"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.8 122.8"><path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path><path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path><path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path></svg>Add to Slack</a>
                      </div>
                    )}
                  </div>
                ) : (
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

                      <div className="d-flex justify-content-center">
                        {section === 'phone' && (
                          <div className="checkbox-container">
                            <input type="checkbox" className="form-check-input" id={`consent${index}`} name="consent_checked" value={newContacts?.[section]?.consent_checked} onChange={e => handleInputChange(e, section)} />
                            <label className="form-check-label" htmlFor={`consent${index}`}>I consent to receive a one-time verification code at this number.</label>
                          </div>
                        )}
                      </div>

                      <span className="d-flex justify-content-center">
                        {!newContactAdding ? (
                          <Link to="#" className="text-link" style={{ marginTop: '20px',  textAlign: 'center',
                            pointerEvents: newContacts?.[section]?.consent_checked ? 'auto' : 'none', // Disables pointer events if consent_checked is false
                            opacity: newContacts?.[section]?.consent_checked ? 1 : 0.5, // Change opacity to appear not clickable if consent_checked is false
                          }} 
                          onClick={() => {
                            if (newContacts?.[section]?.consent_checked) { // consent must be checked to allow submit
                              addContact(newContacts?.[section]?.name, section, newContacts?.[section]?.address);
                            }
                          }}
                        >
                          Submit
                        </Link>
                        ) : (
                          <Loader />
                        )}
                      </span>

                    </div>
                  </>
                )}
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

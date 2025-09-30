import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MultiPropertySelect from "../../../component/multiSelect/multiPropertySelect";
import axios from "axios";
import ToastHandle from "../../../helper/ToastMessage";
import { Link } from "react-router-dom";
import Loader from "../../../helper/Loader";

// This is just a container for the BasicInformationForm when adding a new property, to give it a header and padding.
// Could just put all this in BasicInformationForm and have it apply when creating a new property (i.e. when property_name is null). But this works too
const EditMultiProperty = ( ) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [name, setName] = useState(""); // new state for the multi property Name
  const [toneInstructions, setToneInstructions] = useState("");
  const [context, setContext] = useState("");

  const [callGetApiLoading, setCallGetApiLoading] = useState(false);
  const [callSaveApiLoading, setCallSaveApiLoading] = useState(false);

  useEffect(() => {
    if (id) {
      callGetMultiPropApi();
    }
  }, [id]);

  const callGetMultiPropApi = async () => {
    setCallGetApiLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const apiUrl = `${baseUrl}/get_multi_properties?multi_property_id=${id}`;
      const response = await axios.get(apiUrl, config);

      if (response.status === 200) {
        const multiProp = response.data?.multi_properties?.[id];
        if (multiProp) {
          setName(multiProp.name || "");
          setSelectedProperties((multiProp.properties || []).map((prop) => ({value:prop, label:prop})));
          setToneInstructions(multiProp.tone_instructions || "");
          setContext(multiProp.context || "");
        }
      } else {
        ToastHandle(response?.data?.error || "An error occurred.", "danger");
      }
    }
    catch (error) { 
      ToastHandle("An error occurred", "danger"); 
    }
    finally { setCallGetApiLoading(false); }
  }

  const callSaveMultiPropApi = async () => {
    if (!selectedProperties.length) {
      ToastHandle("Please select at least one property", "danger");
      return;
    }

    if (!name.trim()) {
      ToastHandle("Please enter a name for the multi property", "danger");
      return;
    }

    setCallSaveApiLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      const config = {
        headers: { "X-API-Key": API_KEY, "Content-Type": "application/json" },
        validateStatus: (status) => status >= 200 && status < 500
      };
      if (id) {
        const body = {
          multi_property_id: id,
          new_settings: { 
            tone_instructions: toneInstructions,
            properties: selectedProperties.map((prop) => prop.value)
          },
          new_context: context
        };
        const response = await axios.put(`${baseUrl}/update_multi_property`, body, config);
        if (response.status === 200) {
          ToastHandle("Multi property updated successfully", "success");
          navigate('/properties?multi=true');
        } else {
          ToastHandle(response?.data?.error || "Failed to update multi property", "danger");
        }
      } else {
        const body = {
          property_names: selectedProperties.map((prop) => prop.value),
          multi_property_name: name,
          settings: { tone_instructions: toneInstructions },
          context: context
        };
        const response = await axios.post(`${baseUrl}/add_multi_property`, body, config);
        if (response.status === 200) {
          ToastHandle("Multi property created successfully", "success");
          navigate('/properties?multi=true');
        } else {
          ToastHandle(response?.data?.error || "Failed to create multi property", "danger");
        }
      }
    } catch (error) {
      ToastHandle(error?.response?.data?.error || "An error occurred while saving", "danger");
    } finally {
      setCallSaveApiLoading(false);
    }
  };

  return (
    <div className="edit-multi-property">
      <div className="edit-multi-property-content">
        <h1>Customize Multi Property</h1>
        <Link to="/properties?multi=true" className="go-back">&lt; Back to multi properties</Link>

        {callGetApiLoading ? <Loader /> : (
          <>
            <div className="name-and-selector-container">
              <div className="name-field">
                <label>Name</label>
                <input type="text" className="form-control name-input" value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="property-selector">
                <label>Select the properties to be included</label>
                <MultiPropertySelect selectedProperties={selectedProperties} setSelectedProperties={setSelectedProperties}/>
              </div>
            </div>
            <div className="custom-section">
              <h2>Customize Tone</h2>
              <p>You can customize HostBuddy's responses by adding some instructions here to direct HostBuddy's tone. HostBuddy is already optimized for friendly, hospitable conversation, so this is completely optional.</p>
              <textarea className="form-control" value={toneInstructions} onChange={(e) => setToneInstructions(e.target.value)}/>
            </div>
            <div className="custom-section">
              <h2>Extra Data</h2>
              <p>Add any extra data you want HostBuddy to know about your properties, SOPs, etc.</p>
              <textarea className="form-control" value={context} onChange={(e) => setContext(e.target.value)}/>
            </div>
            <button className="btn btn-primary" onClick={callSaveMultiPropApi}>
              {callSaveApiLoading ? <Loader /> : (
                id ? "Save Changes" : "Create Multi Property"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditMultiProperty;
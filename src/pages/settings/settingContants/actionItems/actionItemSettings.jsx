import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../helper/Loader";
import './actionItemSettings.css';
import ToastHandle from "../../../../helper/ToastMessage";
import MultiSelect from "../../../../component/multiSelect/multiSelect";


const ActionitemsSettings = () => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInstruction, setNewInstruction] = useState("");
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPropertySelector, setShowPropertySelector] = useState(false);
  const [deletingInstructionId, setDeletingInstructionId] = useState(null);
  
  const store = useSelector((state) => state);
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const propertyNamesList = Object.keys(userDataGet?.property_data || {});
  
  const propertyOptions = propertyNamesList.map((property) => ({ value: property, label: property }));

  const callGetActionItemInstructions = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }, // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_action_item_instructions`, config);

      if (response.status === 200) {
        setInstructions(response.data.instructions || []);
      } else {
        ToastHandle("Failed to load instructions", "danger");
      }
      setLoading(false);
      return response.status;
    } catch (error) {
      ToastHandle("An error occurred while loading instructions", "danger");
      setLoading(false);
    } 
  };

  const addActionItemInstruction = async () => {
    if (!newInstruction.trim()) {
      ToastHandle("Instruction cannot be empty", "danger");
      return;
    }

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }, // don't throw an error for non-2xx responses
      };

      const properties = selectedProperties.map(prop => prop.value);
      const dataToSend = { 
        instruction: newInstruction,
        // Only include properties if specific properties are selected and it's not all properties
        ...(showPropertySelector && properties.length > 0 && properties.length < propertyNamesList.length 
          ? { properties } 
          : {})
      };

      const response = await axios.post(`${baseUrl}/add_action_item_instruction`, dataToSend, config);

      if (response.status === 201) {
        ToastHandle("Instruction added successfully", "success");
        setNewInstruction("");
        setSelectedProperties([]);
        setShowPropertySelector(false);
        callGetActionItemInstructions();
      } else {
        ToastHandle(response.data.error || "Failed to add instruction", "danger");
      }
    } catch (error) {
      ToastHandle("An error occurred while adding the instruction", "danger");
    }
  };

  const updateActionItemInstruction = async () => {
    if (!editingInstruction || !editingInstruction.instruction.trim()) {
      ToastHandle("Instruction cannot be empty", "danger");
      return;
    }

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }, // don't throw an error for non-2xx responses
      };

      const properties = selectedProperties.map(prop => prop.value);
      const dataToSend = { 
        instruction_id: editingInstruction.instruction_id,
        instruction: editingInstruction.instruction,
        // Only include properties if specific properties are selected and it's not all properties
        ...(showPropertySelector && properties.length > 0 && properties.length < propertyNamesList.length 
          ? { properties } 
          : {})
      };

      const response = await axios.put(`${baseUrl}/update_action_item_instruction`, dataToSend, config);

      if (response.status === 200) {
        ToastHandle("Instruction updated successfully", "success");
        setEditingInstruction(null);
        setSelectedProperties([]);
        setIsEditing(false);
        setShowPropertySelector(false);
        callGetActionItemInstructions();
      } else {
        ToastHandle(response.data.error || "Failed to update instruction", "danger");
      }
    } catch (error) {
      ToastHandle("An error occurred while updating the instruction", "danger");
    }
  };

  const deleteActionItemInstruction = async (instructionId) => {
    setDeletingInstructionId(instructionId);
    
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }, // don't throw an error for non-2xx responses
      };

      const response = await axios.delete(`${baseUrl}/delete_action_item_instruction?instruction_id=${instructionId}`, config);

      if (response.status === 200) {
        ToastHandle("Instruction deleted successfully", "success");
        callGetActionItemInstructions();
      } else {
        ToastHandle(response.data.error || "Failed to delete instruction", "danger");
      }
    } catch (error) {
      ToastHandle("An error occurred while deleting the instruction", "danger");
    } finally {
      setDeletingInstructionId(null);
    }
  };

  const handleEditClick = (instruction) => {
    setEditingInstruction({
      instruction_id: instruction.instruction_id,
      instruction: instruction.instruction
    });
    
    // Set selected properties for editing
    const propertySelections = instruction.properties 
      ? instruction.properties.map(prop => ({ value: prop, label: prop }))
      : [];
    
    setSelectedProperties(propertySelections);
    setShowPropertySelector(instruction.properties && instruction.properties.length > 0);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingInstruction(null);
    setSelectedProperties([]);
    setIsEditing(false);
    setShowPropertySelector(false);
  };

  useEffect(() => {
    callGetActionItemInstructions();
  }, []);

  return (
    <div className="action-items-settings">
      <h3 className="mb-4">Action Items Settings</h3>
      <p className="mb-4" style={{ fontSize: "15px" }}>
        By default, HostBuddy will raise an action item when it can't handle a matter, when it doesn't know the answer, or when it detects that something requires your attention.
        You can add instructions here to influence how these items are identified.
      </p>

      <div className="instructions-form mb-4">
        <h5>{isEditing ? "Edit Instruction" : "Add New Instruction"}</h5>
        <div className="form-design">
          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="instruction">Instruction</label>
              <textarea 
                id="instruction" 
                className="form-control" 
                placeholder="Enter instruction for identifying action items..."
                value={isEditing ? editingInstruction.instruction : newInstruction}
                onChange={(e) => isEditing 
                  ? setEditingInstruction({...editingInstruction, instruction: e.target.value})
                  : setNewInstruction(e.target.value)
                }
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              {!showPropertySelector ? (
                <button 
                  type="button" 
                  className="property-toggle-link"
                  onClick={() => setShowPropertySelector(true)}
                >
                  Apply to specific properties...
                </button>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label htmlFor="Properties">Select Properties</label>
                    <button 
                      type="button" 
                      className="property-toggle-link"
                      onClick={() => {
                        setShowPropertySelector(false);
                        setSelectedProperties([]);
                      }}
                    >
                      Apply to all properties
                    </button>
                  </div>
                  <MultiSelect 
                    id="Properties" 
                    options={propertyOptions} 
                    selectedOptions={selectedProperties} 
                    setSelectedOptions={setSelectedProperties} 
                    placeholder="Select properties..."
                  />
                </>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            {isEditing ? (
              <>
                <button 
                  type="button" 
                  className="link-btn outline-btn me-2" 
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="bg_theme_btn" 
                  onClick={updateActionItemInstruction}
                >
                  Update Instruction
                </button>
              </>
            ) : (
              <button 
                type="button" 
                className="bg_theme_btn" 
                onClick={addActionItemInstruction}
              >
                Add Instruction
              </button>
            )}
          </div>
        </div>
      </div>

      <h5 className="mb-3">Current Instructions</h5>
      {loading ? (
        <p>Loading instructions...</p>
      ) : instructions.length === 0 ? (
        <p style={{ color: "#999" }}>
          No instructions added yet. Add your first instruction above.
        </p>
      ) : (
        <div className="instructions-grid">
          {instructions.map((instruction) => (
            <div className="instruction-tile" key={instruction.instruction_id}>
              <div className="instruction-content">
                <p>{instruction.instruction}</p>
                
                <div className="properties-tag">
                  <small>
                    {!instruction.properties || instruction.properties.length === 0 
                      ? "Applied to all properties"
                      : instruction.properties.length > 5
                        ? `Applied to: ${instruction.properties.slice(0, 5).join(", ")}, + ${instruction.properties.length - 5} more`
                        : `Applied to: ${instruction.properties.join(", ")}`
                    }
                  </small>
                </div>
              </div>
              
              <div className="instruction-actions">
                {deletingInstructionId === instruction.instruction_id ? (
                  <Loader color="#146ef5" />
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="link-btn outline-btn btn-sm me-2"
                      onClick={() => handleEditClick(instruction)}
                    >
                      Edit
                    </button>
                    <button 
                      type="button" 
                      className="link-btn outline-btn btn-sm"
                      style={{ borderColor: "#ff3f45", color: "#ff3f45" }}
                      onClick={() => deleteActionItemInstruction(instruction.instruction_id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionitemsSettings;


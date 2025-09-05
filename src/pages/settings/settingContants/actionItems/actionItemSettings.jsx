import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../helper/Loader";
import './actionItemSettings.css';
import ToastHandle from "../../../../helper/ToastMessage";
import MultiSelect from "../../../../component/multiSelect/multiSelect";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ActionItemsSettings = () => {
  const [activeTab, setActiveTab] = useState('instructions');
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInstruction, setNewInstruction] = useState("");
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPropertySelector, setShowPropertySelector] = useState(false);
  const [deletingInstructionId, setDeletingInstructionId] = useState(null);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);


  const store = useSelector((state) => state);
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const propertyNamesList = Object.keys(userDataGet?.property_data || {});

  const propertyOptions = propertyNamesList.map((property) => ({ value: property, label: property }));
  const userData = useSelector((state) => state?.getUserDataReducer?.getUserData?.data?.user);
  const userId = userData?.uid;

  useEffect(() => {
    fetchCategories();
    fetchActionItemSettings();
  }, []);

  const callGetActionItemInstructions = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; },
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
        validateStatus: function (status) { return status >= 200 && status < 500; },
      };

      const properties = selectedProperties.map(prop => prop.value);
      const dataToSend = {
        instruction: newInstruction,
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
        validateStatus: function (status) { return status >= 200 && status < 500; },
      };

      const properties = selectedProperties.map(prop => prop.value);
      const dataToSend = {
        instruction_id: editingInstruction.instruction_id,
        instruction: editingInstruction.instruction,
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
        validateStatus: function (status) { return status >= 200 && status < 500; },
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

  const fetchActionItemSettings = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const response = await axios.get(
        `${baseUrl}/get_action_items_settings`,
        {
          headers: {
            "X-API-Key": API_KEY
          }
        }
      );

      if (response.status === 200) {
        setInstructions(response.data?.instructions || '');
      }
    } catch (error) {
      console.error("Error fetching action item settings:", error);
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

  // Categories methods
  const fetchCategories = async () => {
    setLoadingCategories(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const response = await axios.get(
        `${baseUrl}/get_action_item_categories`,
        {
          headers: {
            "X-API-Key": API_KEY
          }
        }
      );

      if (response.status === 200) {
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        } else if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          const possibleCategories = response.data?.result ||
            response.data?.data ||
            response.data;

          if (Array.isArray(possibleCategories)) {
            setCategories(possibleCategories);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      ToastHandle("Failed to load categories", "error");
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      ToastHandle("Category name is required", "warning");
      return;
    }

    if (!newCategory.description.trim()) {
      ToastHandle("Category description is required", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      const response = await axios.post(
        `${baseUrl}/create_action_item_categories`,
        {
          name: newCategory.name,
          definition: newCategory.description
        },
        {
          headers: {
            "X-API-Key": API_KEY
          }
        }
      );

      if (response && response.status === 201) {
        ToastHandle("Category added successfully", "success");
        setNewCategory({ name: '', description: '' });
        fetchCategories();
      } else {
        ToastHandle("Failed to add category", "danger");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      ToastHandle(error.response?.data?.error || "Error adding category", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      ToastHandle("Category name is required", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      const response = await axios.put(
        `${baseUrl}/update_action_item_categories`,
        {
          name: editingCategory.id,
          new_name: editingCategory.name,
          definition: editingCategory.description || ''
        },
        {
          headers: {
            "X-API-Key": API_KEY
          }
        }
      );

      if (response.status === 200) {
        ToastHandle("Category updated successfully", "success");
        setEditingCategory(null);
        fetchCategories();
      } else {
        ToastHandle(response.data?.error || "Failed to update category", "danger");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      ToastHandle(error.response?.data?.error || "Error updating category", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modify the handleDeleteCategory function to return a promise
  const handleDeleteCategory = async (categoryId, categoryName) => {
    setIsSubmitting(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      const response = await axios.delete(
        `${baseUrl}/delete_action_item_categories`,
        {
          headers: { "X-API-Key": API_KEY },
          data: { name: categoryName }
        }
      );

      if (response.status === 200) {
        ToastHandle("Category deleted successfully", "success");
        fetchCategories();
        return true; // Return true to indicate successful deletion
      } else {
        ToastHandle(response.data?.error || "Failed to delete category", "danger");
        return false;
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      ToastHandle(error.response?.data?.error || "Error deleting category", "danger");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (category) => {
    setEditingCategory({
      id: category.id || category.name,
      name: category.name,
      description: category.definition || ''
    });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  useEffect(() => {
    callGetActionItemInstructions();
  }, []);

  // Style for placeholder text
  const placeholderStyle = {
    color: 'rgba(255, 255, 255, 0.4)'
  };

  return (
    <div style={{ color: '#fff', padding: '20px 0' }}>
      <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Action Items Settings</h2>

      {/* Custom Tab Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
        <div
          style={{
            padding: '12px 20px',
            cursor: 'pointer',
            color: activeTab === 'instructions' ? '#3498ff' : 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            fontSize: '16px',
            position: 'relative',
            borderBottom: activeTab === 'instructions' ? '2px solid #3498ff' : 'none'
          }}
          onClick={() => setActiveTab('instructions')}
        >
          Action Item Instructions
        </div>
        <div
          style={{
            padding: '12px 20px',
            cursor: 'pointer',
            color: activeTab === 'categories' ? '#3498ff' : 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            fontSize: '16px',
            position: 'relative',
            borderBottom: activeTab === 'categories' ? '2px solid #3498ff' : 'none'
          }}
          onClick={() => setActiveTab('categories')}
        >
          Manage Categories
        </div>
      </div>

      {/* Instructions Tab Content */}
      {activeTab === 'instructions' && (
        <div>
          <p style={{ fontSize: "15px", marginBottom: '20px' }}>
            By default, HostBuddy will raise an action item when it can't handle a matter, when it doesn't know the answer, or when it detects that something requires your attention.
            You can add instructions here to influence how these items are identified.
          </p>

          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ color: 'white', marginBottom: '16px' }}>{isEditing ? "Edit Instruction" : "Add New Instruction"}</h5>
            <div className="form-design">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="instruction">Instruction</label>
                  <textarea
                    id="instruction"
                    className="form-control"
                    style={{ borderRadius: '4px' }}
                    placeholder="Enter instruction for identifying action items..."
                    value={isEditing ? editingInstruction.instruction : newInstruction}
                    onChange={(e) => isEditing
                      ? setEditingInstruction({ ...editingInstruction, instruction: e.target.value })
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

          <h5 style={{ color: 'white', marginBottom: '16px' }}>Current Instructions</h5>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Loader color="#146ef5" />
            </div>
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
                          style={{
                            width: '32px',
                            height: '32px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #3498ff',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            color: '#3498ff',
                            marginLeft: '8px'
                          }}
                          onClick={() => handleEditClick(instruction)}
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          style={{
                            width: '32px',
                            height: '32px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ff3b30',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            color: '#ff3b30',
                            marginLeft: '8px'
                          }}
                          onClick={() => deleteActionItemInstruction(instruction.instruction_id)}
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Categories Tab Content */}
      {activeTab === 'categories' && (
        <div>
          {/* Add New Category Section */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>Add New Category</h3>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Category Name</label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    backgroundColor: '#0f1a36',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    color: '#fff',
                    padding: '10px 15px',
                    fontSize: '14px'
                  }}
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="custom-placeholder"
                />
                <style jsx>{`
                  .custom-placeholder::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                  }
                `}</style>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea
                  style={{
                    width: '100%',
                    backgroundColor: '#0f1a36',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    color: '#fff',
                    padding: '10px 10px', // Increased horizontal padding
                    minHeight: '100px',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box', // Ensure padding doesn't affect width
                    outline: 'none', // Remove the default focus outline
                    caretColor: '#fff', // Make the cursor visible
                    textIndent: '0px' // Prevent any text indentation
                  }}
                  placeholder="Enter description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={4}
                  className="custom-placeholder"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <button
                  style={{
                    backgroundColor: '#3498ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: !newCategory.name.trim() || !newCategory.description.trim() ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    opacity: !newCategory.name.trim() || !newCategory.description.trim() ? 0.7 : 1
                  }}
                  onClick={handleAddCategory}
                  disabled={isSubmitting || !newCategory.name.trim() || !newCategory.description.trim()}
                >
                  <FaPlus style={{ marginRight: '8px' }} /> Add Category
                </button>
              </div>
            </div>
          </div>

          {/* Existing Categories Section */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>Existing Categories</h3>
            {loadingCategories ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                <Loader color="#146ef5" />
              </div>
            ) : categories.length === 0 ? (
              <p style={{ color: '#999' }}>
                No categories found. Add your first category above.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {categories
                  .filter(category => category.name?.toUpperCase() !== "OTHER")
                  .map(category => (
                    <div
                      key={category.id || category.name}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        padding: '16px',
                        borderRadius: '4px'
                      }}
                    >
                      {editingCategory && editingCategory.id === (category.id || category.name) ? (
                        <div>
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Category Name</label>
                            <div
                              style={{
                                width: '100%',
                                backgroundColor: '#0f1a36',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                color: '#fff',
                                padding: '10px 15px',
                                fontSize: '14px',
                                opacity: 0.8
                              }}
                            >
                              {editingCategory.name}
                            </div>
                          </div>
                          <div style={{ marginBottom: '16px' }}>
                            <textarea
                              style={{
                                width: '100%',
                                backgroundColor: '#0f1a36',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                color: '#fff',
                                padding: '10px 15px',
                                minHeight: '100px',
                                fontSize: '14px',
                                resize: 'vertical',
                                paddingLeft: '15px' // Fix left padding
                              }}
                              placeholder="Description"
                              value={editingCategory.description || ''}
                              onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                              rows={4}
                              className="custom-placeholder"
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button
                              style={{
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '8px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '14px'
                              }}
                              onClick={handleUpdateCategory}
                              disabled={isSubmitting}
                            >
                              Save Changes
                            </button>
                            <button
                              style={{
                                backgroundColor: '#6c757d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '8px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '14px'
                              }}
                              onClick={cancelEditing}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#fff', margin: '0 0 4px 0' }}>
                              {category.name}
                            </h4>
                            {category.definition && (
                              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>
                                {category.definition}
                              </p>
                            )}
                          </div>
                          <div style={{ display: 'flex' }}>
                            <button
                              style={{
                                width: '32px',
                                height: '32px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #3498ff',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                color: '#3498ff',
                                marginLeft: '8px'
                              }}
                              onClick={() => startEditing(category)}
                              aria-label="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              style={{
                                width: '32px',
                                height: '32px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #ff3b30',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                color: '#ff3b30',
                                marginLeft: '8px',
                                padding: 0,  // Add this to prevent padding issues
                                overflow: 'hidden', // Add this to ensure content stays within circle
                                boxShadow: 'none', // Prevent any default button shadows
                                outline: 'none'  // Prevent default focus outlines
                              }}
                              onClick={() => {
                                setCategoryToDelete({ id: category.id || category.name, name: category.name });
                                setShowDeleteModal(true);
                              }}
                              aria-label="Delete"
                            >
                              <FaTrash style={{ fontSize: '14px' }} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: "#0f1a36", color: "#fff" }}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the category{" "}
                <strong>{categoryToDelete?.name}</strong>?<br />
                Action items with this category will be moved to <strong>OTHER</strong>.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={async () => {
                    const success = await handleDeleteCategory(categoryToDelete.id, categoryToDelete.name);
                    if (success) {
                      setShowDeleteModal(false);
                    }
                    // If deletion fails, the modal stays open and the user can try again or cancel
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ActionItemsSettings;
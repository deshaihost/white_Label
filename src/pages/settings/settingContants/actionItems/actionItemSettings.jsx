import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../helper/Loader";
import './actionItemSettings.css';
import './actionItemsNew.css';
import ToastHandle from "../../../../helper/ToastMessage";
import MultiSelect from "../../../../component/multiSelect/multiSelect";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useWhiteLabelCss } from "../../../../helper/WhiteLabelCssContext";

// Icon Components
const Edit2Icon = () => (
  <svg className="action-items-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Trash2Icon = () => (
  <svg className="action-items-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ActionItemsSettings = () => {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
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
  const [showEditModal, setShowEditModal] = useState(false);


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
        setShowEditModal(false);
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
    setShowEditModal(true);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setShowEditModal(false);
  };

  useEffect(() => {
    callGetActionItemInstructions();
  }, []);

  // Style for placeholder text
  const placeholderStyle = {
    color: 'rgba(255, 255, 255, 0.4)'
  };

  return (
    <div 
      className="action-items-new-container"
      style={{
        backgroundColor: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#17191F') : '#17191F'
      }}
    >
      <h1 className="action-items-page-title" style={{
        color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
          cssConfig.css_data.text.primary : '#ffffff'
      }}>
        Action Items Settings
      </h1>

      {/* Tabs */}
      <div className="action-items-tabs">
        <button
          className={`action-items-tab ${activeTab === 'instructions' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructions')}
        >
          Action Item Instructions
        </button>
        <button
          className={`action-items-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Manage Categories
        </button>
      </div>

      {/* Instructions Tab Content */}
      {activeTab === 'instructions' && (
        <div>
          {/* Explanation */}
          <p className="action-items-explanation" style={{
            color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
              cssConfig.css_data.text.secondary : '#a6a9b2'
          }}>
            By default, HostBuddy will raise an action item when it can't handle a matter, when it doesn't know the answer, or when it detects that something requires your attention. You can add instructions here to influence how these items are identified.
          </p>

          {/* Add New Instruction */}
          <div className="action-items-add-form">
            <h2 className="action-items-section-title" style={{
              color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                cssConfig.css_data.text.primary : '#ffffff'
            }}>
              {isEditing ? "Edit Instruction" : "Add New Instruction"}
            </h2>

            <div className="action-items-form-group">
              <label className="action-items-form-label" htmlFor="instruction" style={{
                color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                  cssConfig.css_data.text.primary : '#ffffff'
              }}>
                Instruction
              </label>
              <textarea
                id="instruction"
                className="action-items-textarea"
                placeholder="Enter instruction for identifying action items..."
                value={isEditing ? editingInstruction.instruction : newInstruction}
                onChange={(e) => isEditing
                  ? setEditingInstruction({ ...editingInstruction, instruction: e.target.value })
                  : setNewInstruction(e.target.value)
                }
                style={{
                  color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                    cssConfig.css_data.text.secondary : '#ffffff'
                }}
              />
            </div>

            {!showPropertySelector ? (
              <button
                type="button"
                className="action-items-property-link"
                onClick={() => setShowPropertySelector(true)}
              >
                Apply to specific properties...
              </button>
            ) : (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="action-items-form-label" htmlFor="Properties" style={{
                    color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                      cssConfig.css_data.text.primary : '#ffffff'
                  }}>
                    Select Properties
                  </label>
                  <button
                    type="button"
                    className="action-items-property-link"
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
              </div>
            )}

            <div className="action-items-add-btn-container">
              {isEditing ? (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className="action-items-add-btn"
                    style={{ backgroundColor: '#6c757d' }}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="action-items-add-btn"
                    onClick={updateActionItemInstruction}
                  >
                    Update Instruction
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="action-items-add-btn"
                  onClick={addActionItemInstruction}
                >
                  Add Instruction
                </button>
              )}
            </div>
          </div>

          {/* Current Instructions */}
          <div>
            <h2 className="action-items-section-title" style={{
              color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                cssConfig.css_data.text.primary : '#ffffff'
            }}>
              Current Instructions
            </h2>
            {loading ? (
              <div className="action-items-loading">
                <Loader color="#146ef5" />
              </div>
            ) : instructions.length === 0 ? (
              <p className="action-items-empty-state" style={{
                color: !cssLoading && cssConfig?.css_data?.text?.quaternary ? 
                  cssConfig.css_data.text.quaternary : '#999999'
              }}>
                No instructions added yet. Add your first instruction above.
              </p>
            ) : (
              <div className="action-items-instructions-grid">
                {instructions.map((instruction) => (
                  <div className="action-items-instruction-card" key={instruction.instruction_id}>
                    <p className="action-items-instruction-text" style={{
                      color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                        cssConfig.css_data.text.secondary : '#ffffff'
                    }}>
                      {instruction.instruction}
                    </p>
                    <p className="action-items-instruction-applied" style={{
                      color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                        cssConfig.css_data.text.secondary : '#3e88f7'
                    }}>
                      {!instruction.properties || instruction.properties.length === 0
                        ? "Applied to all properties"
                        : instruction.properties.length > 5
                          ? `Applied to: ${instruction.properties.slice(0, 5).join(", ")}, + ${instruction.properties.length - 5} more`
                          : `Applied to: ${instruction.properties.join(", ")}`
                      }
                    </p>

                    {/* Action Icons */}
                    <div className="action-items-instruction-actions">
                      {deletingInstructionId === instruction.instruction_id ? (
                        <Loader color="#146ef5" />
                      ) : (
                        <>
                          <button
                            type="button"
                            className="action-items-icon-btn edit"
                            onClick={() => handleEditClick(instruction)}
                            aria-label="Edit"
                          >
                            <Edit2Icon />
                          </button>
                          <button
                            type="button"
                            className="action-items-icon-btn delete"
                            onClick={() => deleteActionItemInstruction(instruction.instruction_id)}
                            aria-label="Delete"
                          >
                            <Trash2Icon />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories Tab Content */}
      {activeTab === 'categories' && (
        <div>
          {/* Add New Category */}
          <div className="action-items-category-add-form">
            <h2 className="action-items-section-title" style={{
              color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                cssConfig.css_data.text.primary : '#ffffff'
            }}>
              Add New Category
            </h2>

            <div className="action-items-category-input-group">
              <label className="action-items-form-label" htmlFor="categoryName" style={{
                color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                  cssConfig.css_data.text.primary : '#ffffff'
              }}>
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                className="action-items-input"
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                style={{
                  color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                    cssConfig.css_data.text.secondary : '#ffffff'
                }}
              />
            </div>

            <div className="action-items-category-input-group">
              <label className="action-items-form-label" htmlFor="categoryDescription" style={{
                color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                  cssConfig.css_data.text.primary : '#ffffff'
              }}>
                Description
              </label>
              <textarea
                id="categoryDescription"
                className="action-items-textarea"
                style={{ 
                  minHeight: '100px',
                  color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                    cssConfig.css_data.text.secondary : '#ffffff'
                }}
                placeholder="Enter description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>

            <div className="action-items-add-btn-container">
              <button
                type="button"
                className="action-items-add-category-btn"
                onClick={handleAddCategory}
                disabled={isSubmitting || !newCategory.name.trim() || !newCategory.description.trim()}
              >
                <span className="action-items-plus-icon">+</span>
                Add Category
              </button>
            </div>
          </div>

          {/* Existing Categories */}
          <div>
            <h2 className="action-items-section-title" style={{
              color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                cssConfig.css_data.text.primary : '#ffffff'
            }}>
              Existing Categories
            </h2>
            {loadingCategories ? (
              <div className="action-items-loading">
                <Loader color="#146ef5" />
              </div>
            ) : categories.length === 0 ? (
              <p className="action-items-empty-state" style={{
                color: !cssLoading && cssConfig?.css_data?.text?.quaternary ? 
                  cssConfig.css_data.text.quaternary : '#999999'
              }}>
                No categories found. Add your first category above.
              </p>
            ) : (
              <div className="action-items-categories-list">
                {categories
                  .filter(category => category.name?.toUpperCase() !== "OTHER")
                  .map(category => (
                    <div key={category.id || category.name} className="action-items-category-card">
                      <div className="action-items-category-content">
                        <h3 className="action-items-category-name" style={{
                          color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                            cssConfig.css_data.text.secondary : '#ffffff'
                        }}>
                          {category.name}
                        </h3>
                        {category.definition && (
                          <p className="action-items-category-description" style={{
                            color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                              cssConfig.css_data.text.secondary : '#a6a9b2'
                          }}>
                            {category.definition}
                          </p>
                        )}
                      </div>

                      {/* Action Icons */}
                      <div className="action-items-category-actions">
                        <button
                          type="button"
                          className="action-items-icon-btn edit"
                          onClick={() => startEditing(category)}
                          aria-label="Edit"
                        >
                          <Edit2Icon />
                        </button>
                        <button
                          type="button"
                          className="action-items-icon-btn delete"
                          onClick={() => {
                            setCategoryToDelete({ id: category.id || category.name, name: category.name });
                            setShowDeleteModal(true);
                          }}
                          aria-label="Delete"
                        >
                          <Trash2Icon />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="action-items-delete-modal-overlay">
          <div className="action-items-delete-modal">
            <div className="action-items-delete-modal-header">
              <h2 className="action-items-delete-modal-title" style={{
                color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                  cssConfig.css_data.text.primary : '#ffffff'
              }}>
                Delete Category
              </h2>
              <button
                type="button"
                className="action-items-delete-modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <XIcon />
              </button>
            </div>
            <div className="action-items-delete-modal-body" style={{
              color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                cssConfig.css_data.text.secondary : '#d0d3db'
            }}>
              Are you sure you want to delete the category{" "}
              <strong>{categoryToDelete?.name}</strong>?<br />
              Action items with this category will be moved to <strong>OTHER</strong>.
            </div>
            <div className="action-items-delete-modal-footer">
              <button
                type="button"
                className="action-items-modal-btn cancel"
                onClick={() => setShowDeleteModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="action-items-modal-btn delete"
                onClick={async () => {
                  const success = await handleDeleteCategory(categoryToDelete.id, categoryToDelete.name);
                  if (success) {
                    setShowDeleteModal(false);
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="action-items-edit-modal-overlay">
          <div className="action-items-edit-modal">
            <div className="action-items-edit-modal-header">
              <h2 className="action-items-edit-modal-title" style={{
                color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                  cssConfig.css_data.text.primary : '#ffffff'
              }}>
                Edit Category
              </h2>
              <button
                type="button"
                className="action-items-edit-modal-close"
                onClick={cancelEditing}
              >
                <XIcon />
              </button>
            </div>
            <div className="action-items-edit-modal-body">
              <div className="action-items-category-input-group">
                <label className="action-items-form-label" htmlFor="editCategoryName" style={{
                  color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                    cssConfig.css_data.text.primary : '#ffffff'
                }}>
                  Category Name
                </label>
                <input
                  type="text"
                  id="editCategoryName"
                  className="action-items-input"
                  placeholder="Enter category name"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  style={{
                    color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                      cssConfig.css_data.text.secondary : '#ffffff'
                  }}
                />
              </div>

              <div className="action-items-category-input-group">
                <label className="action-items-form-label" htmlFor="editCategoryDescription" style={{
                  color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
                    cssConfig.css_data.text.primary : '#ffffff'
                }}>
                  Description
                </label>
                <textarea
                  id="editCategoryDescription"
                  className="action-items-textarea"
                  style={{ 
                    minHeight: '100px',
                    color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                      cssConfig.css_data.text.secondary : '#ffffff'
                  }}
                  placeholder="Enter description"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                />
              </div>
            </div>
            <div className="action-items-edit-modal-footer">
              <button
                type="button"
                className="action-items-modal-btn cancel"
                onClick={cancelEditing}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="action-items-modal-btn save"
                onClick={handleUpdateCategory}
                disabled={isSubmitting || !editingCategory.name.trim()}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionItemsSettings;
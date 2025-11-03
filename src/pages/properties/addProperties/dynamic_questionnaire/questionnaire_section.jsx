import SelectComponent from "./form_components/select";
import ShortAnswerComponent from "./form_components/short_answer";
import LongAnswerComponent from "./form_components/long_answer";
import CheckboxGroupComponent from "./form_components/checkbox_group";
import React, { useState } from "react";
import Loader from "../../../../helper/Loader";
import AddQuestionModal from "./AddQuestionModal";
import { ChevronDown, ChevronUp } from '../../../../components/Icons';

// Code for the input components in a single section in the dynamic questionnaire (but NOT "Basics" or "External Resources")
const QuestionnaireSection = ({questionnaire_section_name, liveQuestionnaireData, handleInputComponentChange, handlePencilIconClick, handleSaveAndNext, triggeredSaveLoading, property_name, section_num, num_total_sections}) => {

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [currentSubsection, setCurrentSubsection] = useState("");

  const questionnaire_section_data = liveQuestionnaireData.questionnaire[questionnaire_section_name];
  const subsection_order = liveQuestionnaireData.metadata.subsection_order[questionnaire_section_name];

  // Initialize with all sections expanded by default
  const [expandedSections, setExpandedSections] = useState(new Set(subsection_order || []));

  const is_first_section = section_num === 0;
  const is_last_section = section_num === num_total_sections - 1;
  
  const isTopicsToAvoid = questionnaire_section_name === "Topics to Avoid";
  const isSOPs = questionnaire_section_name === "SOPs";
  const shouldShowAddItem = isTopicsToAvoid || isSOPs;

  const toggleSection = (subsectionName) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subsectionName)) {
        newSet.delete(subsectionName);
      } else {
        newSet.add(subsectionName);
      }
      return newSet;
    });
  };

  const handleAddButtonClick = (subsectionName) => {
    setCurrentSubsection(subsectionName);
    setShowAddQuestionModal(true);
  };

  const handleAddQuestion = (subsectionName, questionText, responseText) => {
    const topics_to_avoid_placeholder_text = "(Optional) Clarify the definition of this topic to help the AI apply it to the right messages...";
    const general_placeholder_text = "Enter text...";

    // Create a new question object of long_answer type
    const newQuestion = {
      question_text: questionText,
      question_type: "long_answer",
      response_text: responseText,
      placeholder_text: questionnaire_section_name === "Topics to Avoid" ? topics_to_avoid_placeholder_text : general_placeholder_text,
      hide_for_reservations: "[]"
    };

    // Create a deep copy of the data
    const updatedData = JSON.parse(JSON.stringify(liveQuestionnaireData));
    
    // Initialize section if it doesn't exist
    if (!updatedData.questionnaire[questionnaire_section_name]) {
      updatedData.questionnaire[questionnaire_section_name] = {};
    }
    
    // Initialize subsection if it doesn't exist
    if (!updatedData.questionnaire[questionnaire_section_name][subsectionName]) {
      updatedData.questionnaire[questionnaire_section_name][subsectionName] = [];
      
      // Also make sure it's in the subsection_order if needed
      if (!updatedData.metadata.subsection_order[questionnaire_section_name]) {
        updatedData.metadata.subsection_order[questionnaire_section_name] = [];
      }
      if (!updatedData.metadata.subsection_order[questionnaire_section_name].includes(subsectionName)) {
        updatedData.metadata.subsection_order[questionnaire_section_name].push(subsectionName);
      }
    }
    
    // Add the new question
    updatedData.questionnaire[questionnaire_section_name][subsectionName].push(newQuestion);
    
    // Update the state with the modified data
    const questionIndex = updatedData.questionnaire[questionnaire_section_name][subsectionName].length - 1;
    
    // Create a custom event that includes both the question text and response text
    const customEvent = {
      target: { 
        value: responseText,
        dataset: { 
          questionText: questionText,
          placeholderText: newQuestion.placeholder_text
        }
      }
    };
    
    handleInputComponentChange(
      customEvent,
      questionnaire_section_name,
      subsectionName,
      questionIndex,
      "long_answer"
    );
  };

  return (
    <div style={{ 
      fontFamily: '"DM Sans", sans-serif',
      paddingBottom: '120px'
    }}>
      {/* Instructions text */}
      {questionnaire_section_name === "Topics to Avoid" ? (
        <>
          <p style={{marginBottom:'30px', color:'var(--white-label-text-tertiary, #a6a9b2)', fontSize: '13px'}}>
            In this section, you can <span style={{color:'var(--white-label-status-warning, #FB923C)'}}>add any conversation topics that you want HostBuddy to avoid</span> while communicating with your guests. If a guest's message relates to any of the topics you add here, HostBuddy will not respond to it.
          </p>
          <p style={{marginBottom:'30px', color:'var(--white-label-text-tertiary, #a6a9b2)', fontSize: '13px'}}>
            Unsure what topics to avoid? View the full guide with examples and setup tips in the <a href="https://userguide.hostbuddy.ai/property-profile-setup/setting-topics-to-avoid" target="_blank" rel="noopener noreferrer" style={{color: 'var(--white-label-interactive-primary, #3e88f7)'}}>HostBuddy User Guide</a>.
          </p>
        </>
      ) : questionnaire_section_name === "SOPs" ? (
        <p style={{marginBottom:'30px', color:'var(--white-label-text-tertiary, #a6a9b2)', fontSize: '13px'}}>
          Need help writing SOPs? View the full guide with step-by-step instructions in the <a href="https://userguide.hostbuddy.ai/property-profile-setup/building-standard-operating-procedures" target="_blank" rel="noopener noreferrer" style={{color: 'var(--white-label-interactive-primary, #3e88f7)'}}>HostBuddy User Guide</a>.
        </p>
      ) : (
        <p style={{marginBottom:'30px', color:'var(--white-label-text-tertiary, #a6a9b2)', fontSize: '13px'}}>
          All fields are optional, but the more details you provide, the better HostBuddy can serve your guests.
        </p>
      )}

      {/* Subsections with collapsible headers */}
      {questionnaire_section_data && subsection_order.map((subsectionName) => {
        const subsection = questionnaire_section_data[subsectionName];
        const isExpanded = expandedSections.has(subsectionName);

        return (
          <div
            key={subsectionName}
            style={{
              marginBottom: '24px',
              background: 'var(--white-label-background-secondary, #17191f)',
              borderRadius: '8px',
              border: '1px solid var(--white-label-border-primary, #013280)',
              overflow: 'hidden'
            }}
          >
            {/* Subsection Header - Clickable to expand/collapse */}
            <div
              onClick={() => toggleSection(subsectionName)}
              style={{
                padding: '20px 24px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--white-label-background-secondary, #17191f)',
                borderBottom: isExpanded ? '1px solid var(--white-label-border-primary, #013280)' : 'none'
              }}
            >
              <h3 style={{ 
                fontSize: '18px',
                fontWeight: '500',
                color: 'var(--white-label-text-primary, #fff)',
                margin: 0
              }}>
                {subsectionName}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {isExpanded ? (
                  <ChevronUp size={20} color="var(--white-label-text-quaternary, #676a73)" />
                ) : (
                  <ChevronDown size={20} color="var(--white-label-text-quaternary, #676a73)" />
                )}
              </div>
            </div>

            {/* Subsection Content - Only show when expanded */}
            {isExpanded && (
              <div style={{ padding: '24px' }}>
                {subsection && subsection.map((question, index) => {
                  return (
                    <div 
                      key={index}
                      style={{
                        marginBottom: index < subsection.length - 1 ? '24px' : 0
                      }}
                    >
                      {question.question_type === 'select' && (
                        <SelectComponent 
                          question_object={question} 
                          sec_name={questionnaire_section_name} 
                          subsec_name={subsectionName} 
                          q_ind={index} 
                          handleInputComponentChange={handleInputComponentChange} 
                          handlePencilIconClick={handlePencilIconClick} 
                        />
                      )}
                      {question.question_type === 'short_answer' && (
                        <ShortAnswerComponent 
                          question_object={question} 
                          sec_name={questionnaire_section_name} 
                          subsec_name={subsectionName} 
                          q_ind={index} 
                          handleInputComponentChange={handleInputComponentChange} 
                          handlePencilIconClick={handlePencilIconClick} 
                        />
                      )}
                      {question.question_type === 'long_answer' && (
                        <LongAnswerComponent 
                          question_object={question} 
                          sec_name={questionnaire_section_name} 
                          subsec_name={subsectionName} 
                          q_ind={index} 
                          handleInputComponentChange={handleInputComponentChange} 
                          handlePencilIconClick={handlePencilIconClick} 
                        />
                      )}
                      {question.question_type === 'checkbox_group' && (
                        <CheckboxGroupComponent 
                          question_object={question} 
                          sec_name={questionnaire_section_name} 
                          subsec_name={subsectionName} 
                          q_ind={index} 
                          handleInputComponentChange={handleInputComponentChange} 
                          handlePencilIconClick={handlePencilIconClick} 
                        />
                      )}
                    </div>
                  );
                })}
                
                {/* Add More button at the bottom for Topics to Avoid and SOPs sections */}
                {shouldShowAddItem && (
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={() => handleAddButtonClick(subsectionName)}
                      className="modern-btn-secondary"
                      style={{
                        fontSize: '13px',
                        padding: '8px 20px',
                        height: 'auto'
                      }}
                    >
                      Add more
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <AddQuestionModal 
        show={showAddQuestionModal} 
        handleClose={() => setShowAddQuestionModal(false)} 
        handleAddQuestion={handleAddQuestion} 
        subsectionName={currentSubsection}
        skipPresets={questionnaire_section_name === "SOPs"} // Add this prop to skip presets for SOPs section
      />
    </div>
  );
};

export default QuestionnaireSection;
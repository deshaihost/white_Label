import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import conversationTopics from "./conversation_topics.json";

const AddQuestionModal = ({ show, handleClose, handleAddQuestion, subsectionName, skipPresets = false }) => {
  const [questionType, setQuestionType] = useState(skipPresets ? "free" : "preset");
  const [freeFormQuestion, setFreeFormQuestion] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  
  // Clear fields when modal is opened or closed
  useEffect(() => {
    if (show) {
      setQuestionType(skipPresets ? "free" : "preset");
      setFreeFormQuestion("");
      setSelectedPreset("");
    }
  }, [show, skipPresets]);

  const handleSubmit = () => {
    let questionText = "";
    let responseText = "";
    
    if (questionType === "free") {
      questionText = freeFormQuestion;
      responseText = "";
    } else {
      // For preset option
      const selectedTopic = conversationTopics.find(topic => topic.topic === selectedPreset);
      questionText = selectedTopic.topic;
      responseText = selectedTopic.description;
    }
    
    if (questionText.trim() !== "") {
      handleAddQuestion(subsectionName, questionText, responseText);
      handleClose();
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      contentClassName="modern-modal"
      style={{ 
        fontFamily: '"DM Sans", sans-serif'
      }}
    >
      <div style={{
        background: '#0F1117',
        border: '1px solid #013280',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <Modal.Header 
          style={{
            background: '#17191f',
            borderBottom: '1px solid #013280',
            padding: '20px 24px'
          }}
        >
          <Modal.Title style={{ 
            fontSize: '18px',
            fontWeight: '500',
            color: '#fff',
            margin: 0
          }}>
            Add Item to {subsectionName}
          </Modal.Title>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#676a73',
              fontSize: '24px',
              cursor: 'pointer',
              padding: 0,
              marginLeft: 'auto'
            }}
          >
            ×
          </button>
        </Modal.Header>
        
        <Modal.Body style={{ padding: '24px', background: '#0F1117' }}>
          <Form>
            {!skipPresets && (
              <Form.Group style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  background: '#17191f',
                  padding: '4px',
                  borderRadius: '6px',
                  border: '1px solid #013280'
                }}>
                  <div 
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      textAlign: 'center',
                      background: questionType === "preset" ? '#3e88f7' : 'transparent',
                      color: questionType === "preset" ? '#fff' : '#a6a9b2',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setQuestionType("preset")}
                  >
                    Presets
                  </div>
                  <div 
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      textAlign: 'center',
                      background: questionType === "free" ? '#3e88f7' : 'transparent',
                      color: questionType === "free" ? '#fff' : '#a6a9b2',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setQuestionType("free")}
                  >
                    Custom
                  </div>
                </div>
              </Form.Group>
            )}

            {(questionType === "free" || skipPresets) ? (
              <Form.Group>
                <Form.Label className="modern-label">Question Text</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your question here..." 
                  value={freeFormQuestion} 
                  onChange={(e) => setFreeFormQuestion(e.target.value)}
                  className="modern-input"
                />
              </Form.Group>
            ) : (
              <>
                <Form.Group style={{ marginBottom: '16px' }}>
                  <Form.Label className="modern-label">Select a topic</Form.Label>
                  <Form.Select 
                    value={selectedPreset}
                    onChange={(e) => setSelectedPreset(e.target.value)}
                    className="modern-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Choose...</option>
                    {conversationTopics.map((topic, index) => (
                      <option key={index} value={topic.topic}>{topic.topic}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <div style={{
                  padding: '16px',
                  background: '#17191f',
                  border: '1px solid #013280',
                  borderRadius: '6px',
                  minHeight: '120px'
                }}>
                  {selectedPreset ? (
                    <>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#676a73', 
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Description
                      </p>
                      <p style={{ 
                        fontSize: '14px',
                        color: '#a6a9b2',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {conversationTopics.find(topic => topic.topic === selectedPreset)?.description}
                      </p>
                    </>
                  ) : (
                    <p style={{ 
                      fontSize: '14px',
                      color: '#676a73',
                      textAlign: 'center',
                      margin: '32px 0'
                    }}>
                      Select a preset to see its description
                    </p>
                  )}
                </div>
              </>
            )}
          </Form>
        </Modal.Body>
        
        <Modal.Footer style={{
          background: '#0F1117',
          borderTop: '1px solid #013280',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={handleClose}
            className="modern-btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="modern-btn-primary"
            disabled={(questionType === "free" && freeFormQuestion.trim() === "") || 
                    (questionType === "preset" && !selectedPreset && !skipPresets)}
          >
            Add Item
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AddQuestionModal;

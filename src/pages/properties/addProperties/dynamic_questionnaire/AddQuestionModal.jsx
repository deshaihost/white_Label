import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import conversationTopics from "./conversation_topics.json";

const AddQuestionModal = ({ show, handleClose, handleAddQuestion, subsectionName }) => {
  const [questionType, setQuestionType] = useState("preset");
  const [freeFormQuestion, setFreeFormQuestion] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  
  // Clear fields when modal is opened or closed
  useEffect(() => {
    if (show) {
      setQuestionType("preset");
      setFreeFormQuestion("");
      setSelectedPreset("");
    }
  }, [show]);

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
    <Modal show={show} onHide={handleClose} centered className="auto-fill-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add Question to {subsectionName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4">
            <div className="question-type-tabs">
              <div 
                className={`tab-option ${questionType === "preset" ? "active" : ""}`}
                onClick={() => setQuestionType("preset")}
              >
                Presets
              </div>
              <div 
                className={`tab-option ${questionType === "free" ? "active" : ""}`}
                onClick={() => setQuestionType("free")}
              >
                Custom
              </div>
            </div>
          </Form.Group>

          {questionType === "free" ? (
            <Form.Group className="mb-3">
              <Form.Label>Question Text</Form.Label>
              <Form.Control type="text" placeholder="Enter your question here..." value={freeFormQuestion} onChange={(e) => setFreeFormQuestion(e.target.value)} />
            </Form.Group>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Select 
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  className="bg-dark text-white"
                >
                  <option value="">Select a topic</option>
                  {conversationTopics.map((topic, index) => (
                    <option key={index} value={topic.topic}>{topic.topic}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              <div className="description-box">
                {selectedPreset ? (
                  <>
                    <p className="mb-1 text-white-50"><small>Description:</small></p>
                    <p className="text-white">
                      {conversationTopics.find(topic => topic.topic === selectedPreset)?.description}
                    </p>
                  </>
                ) : (
                  <p className="text-white-50 text-center mt-5">
                    Select a preset to see its description
                  </p>
                )}
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={(questionType === "free" && freeFormQuestion.trim() === "") || 
                  (questionType === "preset" && !selectedPreset)}
        >
          Add Question
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddQuestionModal;

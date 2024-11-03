import './pullOutPanel.css'

const QuickAdd = () => {
  return (
    <div className="quick-add-container">
      <h2 className="quick-add-title">Quick Add To Knowledge Base</h2>
      <p className="quick-add-description">Type or paste any information about your property that you would like HostBuddy to know.</p>

      <label className="quick-add-label">Label (optional)</label>
      <input type="text" className="form-control quick-add-input" placeholder="Enter a label for this information..." />

      <label className="quick-add-label">Content for knowledge base</label>
      <textarea className="quick-add-textarea" placeholder="Enter anything you'd like HostBuddy to know..."/>
    </div>
  );
}

export default QuickAdd;
import React from "react";

const KnowledgeBasePencil = ({ handlePencilIconClick, someResStageIsHidden }) => {
  
  return (
    <button 
      style={{ 
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} 
      onClick={() => handlePencilIconClick()}
    >
      {/* Pencil icon */}
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 18 18" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.8, transition: 'opacity 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
      >
        <path 
          d="M17.71 4.03957C18.1 3.64957 18.1 2.99957 17.71 2.62957L15.37 0.28957C15 -0.10043 14.35 -0.10043 13.96 0.28957L12.12 2.11957L15.87 5.86957M0 14.2496V17.9996H3.75L14.81 6.92957L11.06 3.17957L0 14.2496Z"
          fill={someResStageIsHidden ? "#F97316" : "#676a73"}
        />
      </svg>
    </button>
  );
}

export default KnowledgeBasePencil;

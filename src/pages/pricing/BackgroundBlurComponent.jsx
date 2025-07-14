import React from 'react';

export const BackgroundBlurComponent = () => {
  const boxStyle = {
    height: "279px",
    width: "279px",
  };

  const shapeStyle = {
    backgroundColor: "rgba(20, 110, 245, 1)",
    borderRadius: "139.5px",
    filter: "blur(215.8px)",
    height: "279px",
    // left: 0,
    opacity: 0.46,
    // position: "fixed",
    // top: 0,
    width: "279px",
  };

  return (
    <div style={boxStyle}>
      <div style={shapeStyle} />
    </div>
  );
};

export default BackgroundBlurComponent;

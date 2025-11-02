import React from 'react';
import './sendWhenIfTiles.css';
import { useWhiteLabelCss } from '../../../helper/WhiteLabelCssContext';

const SendWhenIfTile = ({ title, topTextArray, bottomTextArray, tileWidth, top, left, zIndex }) => {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  
  return (
    <div className="send-when-if-tile" style={{ position: 'absolute', top: `${top}px`, left: `${left}px`, width: tileWidth, zIndex: zIndex }}>
      <div className="tile">
        <div className="tile-content title-content">
          <h3 className="tile-title" style={{
            color: !cssLoading && cssConfig?.css_data?.text?.primary ? 
              cssConfig.css_data.text.primary : '#fff'
          }}>
            {title}
          </h3>
        </div>
        <hr className="tile-divider" />
        <div className="tile-content top-content">
          <h3 className="section-title">Send When</h3>
          {topTextArray.map((text, index) => (
            <p key={index} className="tile-text" style={{
              color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                cssConfig.css_data.text.secondary : '#ffffff'
            }}>
              {text}
            </p>
          ))}
        </div>
        <hr className="tile-divider" />
        <div className="tile-content bottom-content">
          <h3 className="section-title">Send If</h3>
          {bottomTextArray.map((text, index) => (
            <p key={index} className="tile-text" style={{
              color: !cssLoading && cssConfig?.css_data?.text?.secondary ? 
                cssConfig.css_data.text.secondary : '#ffffff'
            }}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SendWhenIfTile;
import React from 'react';
import './index.scss';

const TextIcon = ({ icon, text, textWhite = false }) => {
  return (
    <div className={`text-icon ${textWhite ? 'white' : ''}`}>
      {icon && <img src={icon} alt={text || 'Icon'} />}
      {text && <span>{text}</span>}
    </div>
  );
};

export default TextIcon;

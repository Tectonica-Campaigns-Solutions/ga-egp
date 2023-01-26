import React from 'react';
import './index.scss';

const TextIcon = ({ icon, text }) => {
  return (
    <div className="text-icon">
      {icon && <img src={icon} alt={text || 'Icon'} />}
      {text && <span>{text}</span>}
    </div>
  );
};

export default TextIcon;

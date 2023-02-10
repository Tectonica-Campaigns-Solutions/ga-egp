import React from 'react';

const ActionButton = ({ label, onClick, isPrimary = true, customVariant, ...btnProps }) => {
  return (
    <button
      className={`egp-btn ${isPrimary ? 'primary' : 'secondary'} ${customVariant}`}
      onClick={onClick}
      {...btnProps}
    >
      {label}
    </button>
  );
};

export default ActionButton;

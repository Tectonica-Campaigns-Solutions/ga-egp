import React from 'react';
import './index.scss';

function FieldRadio({ field }) {
  return (
    <div className="hubspot-radio-field">
      <label htmlFor="">{field.label}</label>

      <div className="options">
        {field.options.map((item) => (
          <div className="option-item">
            <input type="radio" />
            <label>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FieldRadio;

import React from 'react';
import './index.scss';

function FieldText({ field }) {
  return (
    <div className="hubspot-text-field">
      <label htmlFor="">{field.label}</label>
      <input type="text" name={field.name} />
    </div>
  );
}

export default FieldText;

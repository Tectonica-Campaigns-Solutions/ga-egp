import React from 'react';
import Input from './Input';

const RadioInput = ({ sectionTitle = '', name, value, options, onChange }) => {
  return (
    <>
      {sectionTitle && <p>{sectionTitle}</p>}

      {options.map((option) => {
        return (
          <Input
            label={option.label}
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
            hideInput
            key={option.value}
          />
        );
      })}
    </>
  );
};

export default RadioInput;

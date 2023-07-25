import React from 'react';
import FieldText from './FieldText';
import FieldRadio from './FieldRadio';

function FieldsSelector({ contactField }) {
  return (
    <>
      {contactField.map((field, index) => {
        switch (field.fieldType) {
          case 'text':
            return <FieldText key={`${field.fieldType}-${index}`} field={field} />;
          case 'radio':
            return <FieldRadio key={`${field.fieldType}-${index}`} field={field} />;
          default:
            return '';
        }
      })}
    </>
  );
}

export default FieldsSelector;

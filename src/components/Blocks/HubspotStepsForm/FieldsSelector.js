import React from 'react'
import FieldText from './FieldText';
import FieldRadio from './FieldRadio';

function FieldsSelector({contactField}) {

  return (
    <>
      {contactField.map((field) => {
        switch (field.fieldType) {
          case 'text':
            return <FieldText field={field}/>;
          case 'radio':
            return <FieldRadio field={field}/>;
          default:
            return '';
        }
      })}
    </>
  );
}

export default FieldsSelector
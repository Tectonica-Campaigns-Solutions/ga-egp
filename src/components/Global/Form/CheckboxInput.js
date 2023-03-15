import React from 'react';
import Input from './Input';

import * as styles from './select.module.scss';

const CheckboxInput = ({ sectionTitle = '', name, values, options = [], onChange, ...checkBoxProps }) => {
  return (
    <>
      {sectionTitle && <p className={styles.label}>{sectionTitle}</p>}

      {options.map((option) => {
        return (
          <Input
            label={option.label}
            type="checkbox"
            name={name}
            value={option.value}
            checked={values.includes(option.value)}
            onChange={onChange}
            hideInput
            key={option.value}
          />
        );
      })}
    </>
  );
};

export default CheckboxInput;

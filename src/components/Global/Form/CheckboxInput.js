import React from 'react';
import Input from './Input';

import * as styles from './select.module.scss';

const CheckboxInput = ({ sectionTitle = '', name, value, options = [], onChange, ...checkBoxProps }) => {
  return (
    <>
      {sectionTitle && <p className={styles.label}>{sectionTitle}</p>}

      {options.map((option) => {
        return (
          <>
            <Input
              label={option.label}
              type="checkbox"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={onChange}
              hideInput
            />
          </>
        );
      })}
    </>
  );
};

export default CheckboxInput;

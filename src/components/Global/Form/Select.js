import React, { useId } from 'react';
import * as styles from './select.module.scss';

const Select = ({ label, options = [], renderOption, ...selectProps }) => {
  const selectId = useId();

  return (
    <div className={styles.selectContainer}>
      <label className={styles.label} htmlFor={selectId}>
        Council
      </label>

      <select className={styles.select} htmlFor={selectId} {...selectProps}>
        {options.map((item, index) => renderOption(item, index))}
      </select>
    </div>
  );
};

export default Select;

import React, { useId } from 'react';
import * as styles from './select.module.scss';

const SelectInput = ({ label, options = [], onChange, renderOption, ...selectProps }) => {
  const selectId = useId();

  return (
    <div className={styles.selectContainer}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>

      <select className={styles.select} htmlFor={selectId} onChange={onChange} {...selectProps}>
        {options.map((item, index) => renderOption(item, index))}
      </select>
    </div>
  );
};

export default SelectInput;

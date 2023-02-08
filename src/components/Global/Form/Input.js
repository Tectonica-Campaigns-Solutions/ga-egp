import React, { useId } from 'react';
import * as styles from './input.module.scss';

const Input = ({ areaTitle, label, ...inputProps }) => {
  const inputId = useId();

  return (
    <>
      {areaTitle && <span className={styles.areaTitle}>{areaTitle}</span>}

      <div className={styles.input}>
        <input id={inputId} {...inputProps} />

        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Input;

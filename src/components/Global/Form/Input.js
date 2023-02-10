import React, { useId } from 'react';
import * as styles from './input.module.scss';

const Input = ({ areaTitle, label, isWhite = false, ...inputProps }) => {
  const inputId = useId();

  return (
    <>
      {areaTitle && <span className={styles.areaTitle}>{areaTitle}</span>}

      <div className={`${styles.input} ${isWhite ? styles.inputWhite : ''}`}>
        <input id={inputId} className={`${isWhite ? styles.inputField : ''}`} {...inputProps} />

        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Input;

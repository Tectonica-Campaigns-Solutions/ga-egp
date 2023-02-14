import React, { useId } from 'react';
import * as styles from './input.module.scss';

const Input = ({ areaTitle, label, hideInput = false, isWhite = false, ...inputProps }) => {
  const inputId = useId();

  return (
    <>
      {areaTitle && <span className={styles.areaTitle}>{areaTitle}</span>}

      <div className={`${styles.input}`}>
        <input
          id={inputId}
          className={`${hideInput ? styles.hideInput : ''} ${isWhite ? styles.inputField : ''}`}
          {...inputProps}
        />

        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default Input;

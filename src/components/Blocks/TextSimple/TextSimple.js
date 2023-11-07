import React from 'react';
import * as styles from './textsimple.module.scss';

function TextSimple({ block }) {
  const { text, useContainer = false, smallWidth = false } = block;

  return (
    <div className={`${useContainer ? 'container my-4 my-lg-3' : ''} ${smallWidth ? styles.smallWidth : ''}`}>
      {text && (
        <div className={`${styles.simpleText} link-and-list-styles`} dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </div>
  );
}

export default TextSimple;

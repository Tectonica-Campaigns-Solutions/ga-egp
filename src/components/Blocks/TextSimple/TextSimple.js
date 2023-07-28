import React from 'react';
import * as styles from './textsimple.module.scss';

function TextSimple({ block }) {
  const { text, useContainer = false } = block;

  return (
    <div className={`${useContainer ? 'container my-5' : ''}`}>
      {text && (
        <div className={`${styles.simpleText} link-and-list-styles`} dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </div>
  );
}

export default TextSimple;

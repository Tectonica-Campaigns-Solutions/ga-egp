import React from 'react';
import * as styles from './textsimple.module.css';

function TextSimple({ block }) {
  return (
    <div className="container my-5">
      <div className={styles.simpleText} dangerouslySetInnerHTML={{ __html: block.text }} />
    </div>
  );
}

export default TextSimple;

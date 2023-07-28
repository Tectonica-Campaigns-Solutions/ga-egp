import React from 'react';
import documentIcon from '../../Icons/pdf_icon.svg';
import Link from '../Link';

import './index.scss';

const Document = ({ doc }) => {
  return (
    <Link to={doc.document.url} target="_blank" download style={{ display: 'block' }}>
      <div className="doc-item">
        <img src={documentIcon} alt="Document icon" />

        <span>{doc.language ?? 'Download'}</span>
      </div>
    </Link>
  );
};

export default Document;

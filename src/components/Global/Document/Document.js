import React from 'react';
import documentIcon from '../../Icons/pdf_icon.svg';
import Link from '../Link';

import './index.scss';

const Document = ({ doc }) => {
  return (
    <div className="doc-item">
      <img src={documentIcon} alt="Document icon" />

      <Link to={doc.document.url} target="_blank" download>
        <span>{doc.document.title}</span>
      </Link>
    </div>
  );
};

export default Document;

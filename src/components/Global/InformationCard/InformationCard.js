import React from 'react';
import { isArray } from '../../../utils';
import documentIcon from '../../Icons/pdf_icon.svg';

import './index.scss';

const InformationCard = ({ preTitle, title, intro, documentKey = 'Related Downloads', documents = [] }) => {
  return (
    <div className="information-card">
      <div className="pre-title">{preTitle}</div>

      <h6>{title}</h6>
      <div className="description" dangerouslySetInnerHTML={{ __html: intro }} />

      {isArray(documents) && (
        <div className="docs">
          <span>{documentKey}</span>

          {documents.map((doc) => (
            <div className="doc-item">
              <img src={documentIcon} alt="Document icon" />

              <a href={doc.document.url} target="_blank">
                <span>{doc.document.title}</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InformationCard;

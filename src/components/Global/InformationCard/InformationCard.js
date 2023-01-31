import React from 'react';
import { isArray } from '../../../utils';
import Document from '../Document/Document';

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
            <Document doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InformationCard;

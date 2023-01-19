import React from 'react';
import { isArray } from '../../../utils';

import './index.scss';

function CardPolicy({ title, intro, documents }) {
  return (
    <div className="card-policy">
      <div className="date">
        Adopted: <strong>Madrid, 10-12 May 2013</strong>
      </div>

      <h6>{title}</h6>
      <div className="description" dangerouslySetInnerHTML={{ __html: intro }} />

      {isArray(documents) && (
        <div className="docs">
          <span>Related Downloads</span>

          {documents.map((doc) => (
            <div className="doc-item">
              X{/* TODO: Add PDF icon */}
              <span>{doc.language}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardPolicy;

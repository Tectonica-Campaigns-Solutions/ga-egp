import React from 'react';
import Document from '../../Global/Document/Document';

import './index.scss';

const DetailDocLayout = ({ children, documents, withOffset = false }) => {
  return (
    <div className="detail-doc-layout row">
      <div className={`content ${withOffset ? 'col-lg-7 offset-lg-1' : 'col-lg-8'}`}>{children}</div>

      <div className="col-lg-2 second-content">
        <p className="downloads-title">Related Downloads</p>

        <div className="downloads-container">
          {documents.map((item, index) => (
            <Document key={`${item?.document?.title}-${index}`} doc={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailDocLayout;

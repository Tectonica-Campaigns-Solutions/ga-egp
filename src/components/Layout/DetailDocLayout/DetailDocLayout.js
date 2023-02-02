import React from 'react';
import Document from '../../Global/Document/Document';

import './index.scss';

const DetailDocLayout = ({ children, documents }) => {
  return (
    <div className="detail-doc-layout row">
      <div className="col-lg-8 content">{children}</div>

      <div className="col-lg-2 second-content">
        <p className="downloads-title">Related Downloads</p>

        <div className="downloads-container">
          {documents.map((item) => (
            <Document doc={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailDocLayout;

import React from 'react';

import './index.scss';

const InnerLayout = ({ navMenu = null, children }) => {
  return (
    <div className="inner-layout">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 first">{navMenu}</div>
          <div className="col-lg-9 second">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InnerLayout;

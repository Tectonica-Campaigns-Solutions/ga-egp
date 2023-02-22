import React from 'react';
import Link from '../../Global/Link';

import './index.scss';

const InnerLayout = ({ sideNav, children }) => {
  return (
    <div className="inner-layout">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 first">
            {sideNav && sideNav?.length > 0
              ? sideNav.map((item) => (
                  <div>
                    <Link to={`/${item.content.slug}`}>{item.title}</Link>
                  </div>
                ))
              : sideNav}
          </div>
          <div className="col-lg-9 second">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InnerLayout;

import React from 'react';
import SidebarNav from '../../Global/SidebarNav/SidebarNav';

import './index.scss';

const InnerLayout = ({ sideNav, location, children }) => {
  return (
    <div className="inner-layout">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 first">
            {sideNav && sideNav?.length > 0 ? <SidebarNav menu={sideNav} location={location} /> : sideNav}
          </div>
          <div className="col-lg-9 second">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InnerLayout;

import React from 'react';
import SidebarNav from '../../Global/SidebarNav/SidebarNav';

import './index.scss';

const InnerLayout = ({ navMenu, children }) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <SidebarNav menu={navMenu} />
      </div>
      <div className="col-lg-9 pb-5">{children}</div>
    </div>
  );
};

export default InnerLayout;
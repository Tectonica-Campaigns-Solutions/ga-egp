import React from 'react';
import SidebarNav from '../../Global/SidebarNav/SidebarNav';

import './index.scss';

const InnerLayout = ({ navMenu=null, children }) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        {
          navMenu && <SidebarNav menu={navMenu} />
        }
        
      </div>
      <div className="col-lg-9 pb-5">{children}</div>
    </div>
  );
};

export default InnerLayout;

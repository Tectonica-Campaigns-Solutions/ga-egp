import React from 'react';
import SidebarNav from '../../Global/SidebarNav/SidebarNav';
import collapseIcon from '../../Icons/Collapse Button.svg';

import './index.scss';

const InnerLayout = ({ sideNav, location, allowCollapse = false, children }) => {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);

  const handleOnToggleSidebar = () => {
    setToggleSidebar((prev) => !prev);
  };

  return (
    <div className={`inner-layout ${toggleSidebar ? 'hide' : ''} `}>
      <div className="container">
        <div className="row">
          <div className={`${toggleSidebar ? 'col-1' : 'col-lg-3'} first d-none d-lg-block`}>
            {allowCollapse && <img className="collapse-btn" src={collapseIcon} onClick={handleOnToggleSidebar} />}

            <div className="main-content">
              {sideNav && sideNav?.length > 0 ? <SidebarNav menu={sideNav} location={location} /> : sideNav}
            </div>
          </div>
          <div className="col-lg-9 second">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InnerLayout;

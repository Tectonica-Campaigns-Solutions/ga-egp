import React from 'react';
import Link from '../../Global/Link';

import './index.scss';

const InnerLayout = ({ sideNav, children }) => {
  return (
    <div className="inner-layout">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 first">
            {
              sideNav && sideNav.treeChildren.length > 0 && sideNav.treeChildren.map(item => <div><Link to={`/${item.content.slug}`}>{ item.title }</Link></div>)
            }

          </div>
          <div className="col-lg-9 second">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InnerLayout;

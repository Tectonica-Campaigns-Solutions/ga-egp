import React from 'react';
import Breadcrumb from 'gatsby-plugin-breadcrumb/components/Breadcrumb';

import './index.scss';

function HeroPage({ title, context = null, location = null, date = null }) {
  const {
    breadcrumb: { crumbs },
  } = context;

  // const customCrumbs = crumbs.map((item, index) => {
  //   return { ...item, crumbLabel: item.crumbLabel.replaceAll('-', ' ').toUpperCase()}

  // });

  return (
    <div className="hero-page">
      <div className="container">
        {crumbs && (
          <div className="breadcrumb-section">
            {/* <Breadcrumb crumbs={crumbs} crumbSeparator=" / " /> */}
          </div>
        )}
        {date && <div className="date">{date}</div>}
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default HeroPage;

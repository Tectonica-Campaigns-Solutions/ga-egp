import React from 'react';
import Breadcrumb from 'gatsby-plugin-breadcrumb/components/Breadcrumb';

import './index.scss';

function HeroPage({ title, context = null, location = null, date=null }) {
  const {
    breadcrumb: { crumbs },
  } = context;

  const customCrumbLabel = title;

  return (
    <div className="hero-page">
      <div className="container">
        {context && (
          <div className="breadcrumb-section">
            <Breadcrumb crumbs={crumbs} crumbSeparator=" / " crumbLabel={customCrumbLabel} />
          </div>
        )}
        {
          date && <div>{ date }</div>
        }
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default HeroPage;

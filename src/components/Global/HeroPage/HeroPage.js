import React from 'react';

import './index.scss';

function HeroPage({ title, context = null, location = null, date = null, isDetailView = false, parentTitle = null }) {

  return (
    <div className="hero-page">
      <div className="container">
        {date && <div className="date">{date}</div>}
        { 
          parentTitle && <h2>{ parentTitle}</h2>
        }
        {
          !parentTitle && <h1 className={`${isDetailView ? 'sm' : ''}`}>{title}</h1>
        }
        
      </div>
    </div>
  );
}

export default HeroPage;

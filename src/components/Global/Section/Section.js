import React from 'react';
import Button from '../Button/Button';

import './index.scss';

const Section = ({ title, link = null, bgColor, extraClassNames = '', children }) => {
  return (
    <section className={`egp-section ${bgColor}`}>
      <div className="container">
        <div className="title">
          <h2>{title}</h2>

          {link && (
            <div className="section-cta">
              <Button label={link.label} isPrimary={false} customVariant="light" />
            </div>
          )}
        </div>

        <div className={`row ${extraClassNames}`}>{children}</div>
      </div>
    </section>
  );
};

export default Section;

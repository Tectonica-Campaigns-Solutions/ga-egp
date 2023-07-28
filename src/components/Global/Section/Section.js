import React from 'react';
import { getCtaUrl } from '../../../utils';
import Button from '../Button/Button';

import './index.scss';

const Section = ({ title, introduction = null, link = null, bgColor, extraClassNames = '', children }) => {
  return (
    <section className={`egp-section ${bgColor}`}>
      <div className="container">
        <div className="title">
          <h2>{title}</h2>

          {link && (
            <div className="section-cta">
              <Button url={getCtaUrl(link)} label={link.label} isPrimary={false} customVariant="light" />
            </div>
          )}
        </div>

        {introduction && (
          <div className="introduction link-and-list-styles" dangerouslySetInnerHTML={{ __html: introduction }} />
        )}

        <div className={`main-content row ${extraClassNames}`}>{children}</div>
      </div>
    </section>
  );
};

export default Section;

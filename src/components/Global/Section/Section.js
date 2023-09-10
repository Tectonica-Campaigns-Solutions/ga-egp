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
              
              {/* <Button url={getCtaUrl(link.content)} label={link?.label ? link.label : link.content.label } customVariant="light" /> */}
              <Button url={getCtaUrl(link.link)} label={link.link?.label ? link.link.label : link.link.content.label } customVariant="light" />
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

import React from 'react';
import Link from '../../Global/Link';
import { isArray } from '../../../utils';

import './index.scss';

const PreviewCtaBlock = ({ block }) => {
  const { title, description, backgroundImage, backgroundColor, ctas = [] } = block;

  return (
    <div
      className={`preview-cta-block section-${backgroundColor}`}
      style={{ backgroundImage: `url(${backgroundImage?.url})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {title && <h1>{title}</h1>}
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
          </div>

          {isArray(ctas) && (
            <div className="col-lg-4 offset-lg-2">
              <div className="ctas">
                {ctas.map((cta) => (
                  <Link key={cta.id} to={cta.url.url}>
                    <div dangerouslySetInnerHTML={{ __html: cta.description }} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCtaBlock;

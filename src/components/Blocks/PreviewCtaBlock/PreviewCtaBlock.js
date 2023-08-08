import React, { useState } from 'react';
import { isArray } from '../../../utils';
import ActionButton from '../../Global/Button/ActionButton';
import { navigate } from 'gatsby';

import './index.scss';

const PreviewCtaBlock = ({ block }) => {
  const [selectedCta, setSelectedCta] = useState(null);
  const { title, description, backgroundImage, backgroundColor, ctas = [] } = block;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!selectedCta) return;
    navigate(selectedCta);
  };

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
              <form onSubmit={handleOnSubmit}>
                <div className="ctas">
                  {ctas.map((cta) => (
                    <div className="input-cta">
                      <input
                        type="radio"
                        id={cta.id}
                        name="link_to"
                        value={cta.url?.url}
                        onChange={(event) => setSelectedCta(event.target.value)}
                      />

                      <label for={cta.id} dangerouslySetInnerHTML={{ __html: cta.title }} />
                      <div className="extra-information" dangerouslySetInnerHTML={{ __html: cta.description }} />
                    </div>
                  ))}
                </div>

                <div className="btn-submit-container">
                  <ActionButton label="Continue" type="submit" />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCtaBlock;

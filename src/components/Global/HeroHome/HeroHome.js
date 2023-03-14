import React from 'react';
import HubspotForm from '../../Blocks/HubspotForm/HubspotForm';

import './index.scss';

function HeroHome({ title, image, imageMobile, description, form, textWhite }) {
  const css = `@media (max-width: 750px) {
    .hero-home {
        background-image: url("${imageMobile.images.fallback.src}")
    }
    }
    @media (min-width: 750px) {
        .hero-home {
            background-image: url("${image.images.fallback.src}");
        }
  }`;

  return (
    <>
      <style scoped>{css}</style>
      <div className={`hero-home ${textWhite ? 'text-white' : ''}`}>
        <div className="row">
          <div className="col-xl-9 col-lg-9 container">
            <div className="row">
              <div className="col-10">
                <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
                {description && <div className="text-content" dangerouslySetInnerHTML={{ __html: description }} />}
              </div>
            </div>

            {form && (
              <HubspotForm id={form.formId} formId={form.formId} region={form.region} portalId={form.portalId} />
            )}
          </div>
        </div>

        <div className="col-lg-5"></div>
      </div>
    </>
  );
}

export default HeroHome;

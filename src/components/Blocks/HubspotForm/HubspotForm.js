import React from 'react';
import { Script, navigate } from 'gatsby';

import './index.scss';

const HubspotForm = ({ id, formId, region, portalId, redirectTo = null }) => {
  return (
    <>
      <Script
        src="https://js.hsforms.net/forms/v2.js"
        onLoad={() => {
          window.hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: `#hubspotForm-${id}`,
            onFormSubmit: function ($form) {
              if (redirectTo) {
                navigate(`/${redirectTo.slug}`);
              }
            },
          });
        }}
        onError={(e) => console.error(e)}
      />

      <div id={`hubspotForm-${id}`} className="form-hubspot"></div>
    </>
  );
};

export default HubspotForm;

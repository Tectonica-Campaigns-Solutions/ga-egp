import React from 'react';
import { Script } from 'gatsby';
import * as styles from './hubspot.module.scss';

const HubspotForm = ({ id, formId, region, portalId }) => {
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
          });
        }}
        onError={(e) => console.error(e)}
      />

      <div id={`hubspotForm-${id}`} className={styles.form}></div>
    </>
  );
};

export default HubspotForm;

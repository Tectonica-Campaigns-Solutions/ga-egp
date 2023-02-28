import React from 'react';
import { Script } from 'gatsby';

const HubspotForm = ({ id, formId, region, portalId, tags }) => {
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
            onFormReady: function($form) {
              if(tags){
                let tagsText = tags.map(item => item.name).join(',')
                document.querySelector('input[name="tags"]').value = tagsText;
              }
            }
          });
        }}
        onError={(e) => console.error(e)}
      />
      <div id={`hubspotForm-${id}`}></div>
    </>
  );
};

export default HubspotForm;

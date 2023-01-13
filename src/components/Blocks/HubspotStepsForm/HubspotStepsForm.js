import React, { useContext } from 'react';
import { Script } from 'gatsby';
import queryString from 'query-string';
import { HubspotStepsContext } from './Context/HubspotStepsProvider';

function HubspotStepsForm({ forms, destination, location }) {
  const params = queryString.parse(location.search);

  const { email, step, handleChangeEmail, handleChangeStep } = useContext(HubspotStepsContext);
  console.log({ email, step });

  return (
    <div>
      {!params.submissionGuid ? (
        <>
          primero
          <Script
            src="https://js.hsforms.net/forms/v2.js"
            onLoad={() => {
              window.hbspt.forms.create({
                region: forms[0].region,
                portalId: forms[0].portalId,
                formId: forms[0].formId,
                target: `#hubspotForm-${forms[0].formId}`,
                redirectUrl: location.href,
                onFormSubmit: ($form) => {
                  const currentEmail = $form.querySelector('input[name="email"]').value;

                  handleChangeEmail(currentEmail);
                  handleChangeStep(step + 1);
                },
              });
            }}
            onError={(e) => console.error(e)}
          />
          <div id={`hubspotForm-${forms[0].formId}`}></div>
        </>
      ) : (
        <>
          segundo
          <Script
            src="https://js.hsforms.net/forms/v2.js"
            onLoad={() => {
              window.hbspt.forms.create({
                region: forms[1].region,
                portalId: forms[1].portalId,
                formId: forms[1].formId,
                target: `#hubspotForm-${forms[1].formId}`,
                redirectUrl: `${origin}/${destination}`,
                onFormReady: function ($form) {
                  $form.querySelector('input[name="email"]').value = email;
                },
              });
            }}
            onError={(e) => console.error(e)}
          />
          <div id={`hubspotForm-${forms[1].formId}`}></div>
        </>
      )}
    </div>
  );
}

export default HubspotStepsForm;

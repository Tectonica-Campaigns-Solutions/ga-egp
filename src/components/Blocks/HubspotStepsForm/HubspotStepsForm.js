import React, { useState, useEffect } from 'react'
import { Script } from "gatsby";
import queryString from 'query-string';

function HubspotStepsForm({ forms, destination, location }) {
  const params = queryString.parse(location.search)
  const [step, setStep] = useState(0);
  const [currentEmail, setCurrentEmail] = useState('');
  // if(typeof window !== 'undefined'){
  //   window.addEventListener('message', event => {
  //     if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
  //       setCurrentEmail(event.data.data[0].value)
  //     }
  //  });
  // }
  // console.log(currentEmail)
  return (
    <div>
      {
        !params.submissionGuid ?
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
                    // onFormSubmit: function($form) {
                    //   console.log($form);
                    //   } 
                  });
                }}
                onError={(e) => console.error(e)}
              />
              <div id={`hubspotForm-${forms[0].formId}`}></div>
        </>

        :
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
              onFormReady: function($form) {
                
                $form.querySelector('input[name="email"]').value = 'test@tectonica.co'
               
          }
            });
          }}
          onError={(e) => console.error(e)}
        />
        <div id={`hubspotForm-${forms[1].formId}`}></div>
      </>
        
      }
    </div>
  )
}

export default HubspotStepsForm
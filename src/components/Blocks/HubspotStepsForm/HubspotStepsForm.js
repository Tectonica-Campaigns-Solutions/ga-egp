import React, { useContext } from 'react';
import { Script, navigate } from 'gatsby';
import queryString from 'query-string';
//import { HubspotStepsContext } from './Context/HubspotStepsProvider';

function HubspotStepsForm({ forms, destination, location }) {
  const params = queryString.parse(location.search);
  const numForms = forms.length;

  //const { email, step, handleChangeEmail, handleChangeStep } = useContext(HubspotStepsContext);

  if(typeof window !== 'undefined'){
    if(!params.s){
      window.addEventListener('message', event => {
        if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {    
          let email = event.data.data.find(item => item.name == 'email')
          window.location.href = `${location.origin}${location.pathname}?e=${email.value}&s=1`;
        }
      });
    } else if(params.s && parseInt(params.s) < numForms ){
      window.addEventListener('message', event => {
        
        if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {    
          window.location.href = `${location.origin}${location.pathname}?e=${params.e}&s=${(parseInt(params.s)) + 1}`;
        }
      });
    }else{
      window.location.href = `${location.origin}/${destination}`
    }
  }

  return (
    <div>
      {
        forms.map((item, index) => {
          if(!params.s && index == 0){
            return (
              <>
                <Script
                  src="https://js.hsforms.net/forms/v2.js"
                  onLoad={() => {
                    window.hbspt.forms.create({
                      region: item.region,
                      portalId: item.portalId,
                      formId: item.formId,
                      target: `#hubspotForm-${item.formId}`,
                    });
                  }}
                  onError={(e) => console.error(e)}
                />
                <div id={`hubspotForm-${forms[0].formId}`}></div>
              </>
            )
          }else if(params.s == index){
            return (
              <>
               <Script
                src="https://js.hsforms.net/forms/v2.js"
                onLoad={() => {
                  window.hbspt.forms.create({
                    region: item.region,
                    portalId: item.portalId,
                    formId: item.formId,
                    target: `#hubspotForm-${item.formId}`,
                    onFormReady: function ($form) {
                      $form.querySelector('input[name="email"]').value = params.e;
                    },
                  });
                }}
                onError={(e) => console.error(e)}
              />
              <div id={`hubspotForm-${item.formId}`}></div> 
              </>
            )
          }
        })
      }
    </div>
  );
}

export default HubspotStepsForm;

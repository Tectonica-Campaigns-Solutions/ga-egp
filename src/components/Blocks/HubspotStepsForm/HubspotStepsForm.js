import React, { useEffect, useState } from 'react';
import FieldsSelector from './FieldsSelector';

import './index.scss';

function HubspotStepsForm({ block }) {
  const { steps = [] } = block;

  const [stepActive, setStepActive] = useState(0);

  useEffect(() => {
    fetch('https://api.hubapi.com/properties/v1/contacts/properties').catch((e) => {
      console.log(e);
    });
  });

  // TODO get from hubspot api
  const contactFields = [
    {
      name: 'company_size',
      label: 'Company size',
      fieldType: 'text',
    },
    {
      name: 'comunicaciones',
      label: 'comunicaciones',
      fieldType: 'radio',
      options: [
        {
          value: 'si',
          readOnly: false,
          hidden: false,
          label: 'si',
          displayOrder: 0,
          doubleData: null,
          description: null,
        },
        {
          value: 'no',
          readOnly: false,
          hidden: false,
          label: 'no',
          displayOrder: 1,
          doubleData: null,
          description: null,
        },
      ],
    },
    {
      name: 'date_of_birth',
      label: 'Date of birth',
      fieldType: 'text',
    },
  ];

  return (
    <div className="hubspot-multi-steps-form">
      {/* Header */}
      <div className="header-multi-steps">
        <div className="container">
          <div className="steps-count-items">
            {steps.map((step, index) => (
              <div
                key={`${step.stepPreTitle}-${index}`}
                className={`step-count ${index === stepActive ? 'active' : ''}`}
                onClick={() => setStepActive(index)}
              >
                <span className="index">{index}</span>
                <span className="pre-title">{step.stepPreTitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main form */}
      <div className="container">
        <form name="contact" method="POST" data-netlify="true" action="/">
          {steps.map((item, index) => {
            if (index !== stepActive) return null;

            return (
              <div className="row mt-5" key={`${item.title}-${index}`}>
                <div className="col-lg-4">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="col offset-lg-2">
                  {item.formFields.map((el, index) => {
                    const contactField = contactFields.filter((item) => item.name === el.idHubspotField);
                    return <FieldsSelector key={index} contactField={contactField} />;
                  })}
                </div>
              </div>
            );
          })}

          <input type="hidden" name="form-name" value="contact" />

          <div className="actions">
            <button className="hubspot-send-btn" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HubspotStepsForm;

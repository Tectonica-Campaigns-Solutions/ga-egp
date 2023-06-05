import React, { useEffect } from 'react';
import FieldsSelector from './FieldsSelector';

function HubspotStepsForm({ block }) {
  useEffect(() => {
    fetch('https://api.hubapi.com/properties/v1/contacts/properties')
    .catch(e => {
      console.log(e)
    })
  })
  // TODO get from hubspot api
  const contactFields = [
    {
      "name": "company_size",
      "label": "Company size",
      "fieldType": "text",
    },
    {
      "name": "comunicaciones",
      "label": "comunicaciones",
      "fieldType": "radio",
      "options": [
        {
            "value": "si",
            "readOnly": false,
            "hidden": false,
            "label": "si",
            "displayOrder": 0,
            "doubleData": null,
            "description": null
        },
        {
            "value": "no",
            "readOnly": false,
            "hidden": false,
            "label": "no",
            "displayOrder": 1,
            "doubleData": null,
            "description": null
        }
      ],
    },
    {
      "name": "date_of_birth",
      "label": "Date of birth",
      "fieldType": "text",
    }
  ]
  return (
    <div className="container">
      <form name="contact" method="POST" data-netlify="true" action="/">
        {
          block.steps.map( item =>{
            return (
              <div className="row mt-5">
                <div className="col">{item.description}</div>
                <div className="col">
                  
                    {
                      item.formFields.map( el => {
                        const contactField = contactFields.filter(item => item.name === el.idHubspotField)
                        return (
                          <FieldsSelector contactField={contactField} />
                        )
                      })
                    }
                    
                  
                  
                </div>
              </div>
            )
          })
        }
        <input type="hidden" name="form-name" value="contact" />
        <button type="submit">Send</button>
        </form>
    </div>
  );
}

export default HubspotStepsForm;

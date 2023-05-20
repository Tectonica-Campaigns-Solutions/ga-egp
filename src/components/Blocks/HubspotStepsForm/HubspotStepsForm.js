import React from 'react';

function HubspotStepsForm({ block }) {
  return (
    <div className="container">
        {
          block.steps.map( item =>{
            return (
              <div className="row mt-5">
                <div className="col">{item.description}</div>
                <div className="col">
                  {
                    item.formFields.map( el => {
                      return (
                        <div>{ el.label }</div>
                
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
    </div>
  );
}

export default HubspotStepsForm;

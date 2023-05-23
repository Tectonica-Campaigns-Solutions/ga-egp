import React from 'react';

function HubspotStepsForm({ block }) {
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
                        return (
                          <div>
                            <label>{ el.label }</label>
                            <input type="text" name="name"></input>
                          </div>
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

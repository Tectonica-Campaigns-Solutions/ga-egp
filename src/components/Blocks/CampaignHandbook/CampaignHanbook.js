import React from 'react'
import { Script, navigate } from 'gatsby';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import './index.scss'

const CampaignHanbook = () =>{

  const selectOptions = useStaticQuery(graphql`
    query {
      allMemberParty{
        edges{
          node{
            title
          }
        }
      }
    }
  `);
  return (
    <div className="campaing-handbook pt-3 pb-3">
        <div className="container pt-3 pb-5">

          <div className="row justify-content-center pt-2 pt-lg-3">
            <div className="col-lg-5">

                <Script
                  src="https://js.hsforms.net/forms/v2.js"
                  onLoad={() => {
                    window.hbspt.forms.create({
                      region: "eu1",
                      portalId: "26289884",
                      formId: "546f2eaf-aa7c-4c0c-9e92-92d55732ab74",
                      target: `#hubspotForm-100`,
                      onFormReady: () => {
                        let options = selectOptions.allMemberParty.edges.map(item => item.node.title)
                        options.unshift('I am not a member party')
                        const parent = document.querySelector('input[name="form_member_party"]').parentElement
                        const select = document.createElement("select");
                        const memberPartyField = document.querySelector('input[name="form_member_party"]')
                        memberPartyField.value = 'I am not a member party'
                        select.addEventListener('change', function(e){
                          if(e.target.value != 'I am not a member party'){
                            document.querySelector('.hs-company').style.display = 'none'
                            document.querySelector('.hs_form_assoc_type').style.display = 'block'
                            
                          }else{
                            document.querySelector('.hs-company').style.display = 'block'
                            document.querySelector('.hs_form_assoc_type').style.display = 'none'
                          }
                          memberPartyField.value = e.target.value
                          memberPartyField.dispatchEvent(new Event('input', { bubbles: true }));
                        })
                        for (var i = 0; i < options.length; i++) {
                          var option = document.createElement("option");
                          option.value = options[i];
                          option.text = options[i];
                          select.appendChild(option);
                        }
                        parent.appendChild(select)

                        
                      }
                    });
                  }}
                  onError={(e) => console.error(e)}
                />

                <div id={`hubspotForm-100`}></div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CampaignHanbook
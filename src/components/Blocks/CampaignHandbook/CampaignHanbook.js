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
    <div className="container mt-5 mb-5 campaing-handbook">
      <div className="row justify-content-center">
        <div className="col-lg-8">

            <Script
              src="https://js.hsforms.net/forms/v2.js"
              onLoad={() => {
                window.hbspt.forms.create({
                  region: "eu1",
                  portalId: "26289884",
                  formId: "546f2eaf-aa7c-4c0c-9e92-92d55732ab74",
                  target: `#hubspotForm-100`,
                  onFormReady: () => {
                    console.log(selectOptions.allMemberParty.edges)
                    let options = selectOptions.allMemberParty.edges.map(item => item.node.title)
                    options.unshift('I am not a member party')
                    options.unshift('')
                    const parent = document.querySelector('input[name="form_member_party"]').parentElement
                    const select = document.createElement("select");
                    const memberPartyField = document.querySelector('input[name="form_member_party"]')
                    select.addEventListener('change', function(e){
                      if(e.target.value != 'I am not a member party'){
                        document.querySelector('.hs-company').style.display = 'none'
                      }else{
                        document.querySelector('.hs-company').style.display = 'block'
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
  );
}

export default CampaignHanbook
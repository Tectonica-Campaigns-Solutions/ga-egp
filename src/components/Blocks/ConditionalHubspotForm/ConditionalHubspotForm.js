import React from 'react';
import { Script } from 'gatsby';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';

import './index.scss';
import '../HubspotForm/index.scss';

const ConditionalHubspotForm = ({ block }) => {
  const { formId, region, portalId, redirectTo, hasMemberPartiesLogic } = block.hubspot;

  const selectOptions = useStaticQuery(graphql`
    query {
      allMemberParty {
        edges {
          node {
            title
          }
        }
      }
    }
  `);

  return hasMemberPartiesLogic ? (
    <>
      <div className={`conditional-form block-${block.id} pt-4 pb-4`}>
        <div className="container pt-3 pb-5">
          <div className="row justify-content-center pt-2 pt-lg-2">
            <div className="hb-form-container-custom">
              <Script
                src="https://js.hsforms.net/forms/v2.js"
                onLoad={() => {
                  window.hbspt.forms.create({
                    region: region,
                    portalId: portalId,
                    formId: formId,
                    target: `#hubspotForm-${block.id}`,
                    onFormReady: () => {
                      let options = selectOptions.allMemberParty.edges.map((item) => item.node.title);
                      options.unshift('I am not from a member party');

                      const form = document.querySelector(`.block-${block.id} form`);
                      const parent = form.querySelector('input[name="form_member_party"]').parentElement;
                      const select = document.createElement('select');
                      const memberPartyField = form.querySelector('input[name="form_member_party"]');
                      const electedOficial = form.querySelector('select[name="form_assoc_type"');

                      memberPartyField.value = 'I am not from a member party';

                      select.addEventListener('change', function (e) {
                        if (e.target.value != 'I am not from a member party') {
                          form.querySelector('.hs-company').style.display = 'none';
                          form.querySelector('.hs_form_assoc_type').style.display = 'block';
                        } else {
                          form.querySelector('.hs-company').style.display = 'block';
                          document.querySelector('.hs_form_assoc_type').style.display = 'none';

                          electedOficial.selectedIndex = 0;
                          electedOficial.dispatchEvent(new Event('select', { bubbles: true }));
                        }
                        memberPartyField.value = e.target.value;
                        memberPartyField.dispatchEvent(new Event('input', { bubbles: true }));
                      });

                      for (var i = 0; i < options.length; i++) {
                        var option = document.createElement('option');
                        option.value = options[i];
                        option.text = options[i];
                        select.appendChild(option);
                      }
                      parent.appendChild(select);
                    },
                  });
                }}
                onError={(e) => console.error(e)}
              />

              <div id={`hubspotForm-${block.id}`} className="form-hubspot"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ConditionalHubspotForm;

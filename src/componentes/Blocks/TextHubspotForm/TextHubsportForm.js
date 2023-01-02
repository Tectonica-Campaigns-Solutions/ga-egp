import React, { useEffect } from "react";
import flowerForm from "../../Icons/flower-form.svg";

import "./index.scss";

function TextHubspotForm({ block }) {
  const { text, title } = block;
  const { formId, region, portalId } = block.hubspot;

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "hubspot-contact-form";
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: `#hubspotForm-${block.id}`,
        });
      }
    });
  }, [formId, region, portalId]);

  return (
    <div className="text-hubspot-form">
      <img className="flowers" src={flowerForm} />

      <div className="container">
        <h2>{block.title}</h2>
        <div id={`hubspotForm-${block.id}`} />
      </div>
    </div>
  );
}

export default TextHubspotForm;

import React from "react";
import HubspotForm from "../HubspotForm/HubspotForm";

import "./index.scss";

function TextHubspotForm({ block }) {
  const { text, title } = block;
  const { formId, region, portalId } = block.hubspot;

  return (
    <div className="text-hubspot-form">
      <div className="container">
        <h2>{block.title}</h2>

        <HubspotForm
          id={block.id}
          formId={formId}
          region={region}
          portalId={portalId}
        />
      </div>
    </div>
  );
}

export default TextHubspotForm;

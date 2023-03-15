import React from 'react';
import HubspotForm from '../HubspotForm/HubspotForm';

import './index.scss';

function TextHubspotForm({ block }) {
  const { id, title, backgroundColor, backgroundImage } = block;
  const { formId, region, portalId } = block.hubspot;

  return (
    <div className={`text-hubspot-form ${backgroundColor}`}>
      <div className="container">
        {title && <h2>{title}</h2>}

        <HubspotForm id={id} formId={formId} region={region} portalId={portalId} />
      </div>

      {backgroundImage?.url && (
        <img className="flowers" src={backgroundImage.url} alt={backgroundImage.alt || 'Sunflower image'} />
      )}
    </div>
  );
}

export default TextHubspotForm;

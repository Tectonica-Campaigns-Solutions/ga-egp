import React from 'react';
import HubspotForm from '../HubspotForm/HubspotForm';

import './index.scss';

function TextHubspotForm({ block, centerContent = false }) {
  const { id, title, backgroundColor, variant, backgroundImage, smallTitle = false } = block;
  const { formId, region, portalId, redirectTo } = block.hubspot;

  return (
    <div className={`text-hubspot-form ${backgroundColor} ${centerContent ? 'text-center' : ''}`}>
      <div className="container">
        {title && <h2 className={`${smallTitle ? 'sm' : ''}`}>{title}</h2>}

        <div className={`hubspot-container ${variant} ${centerContent ? 'form-center' : ''}`}>
          <HubspotForm id={id} formId={formId} region={region} portalId={portalId} redirectTo={redirectTo} />
        </div>
      </div>

      {backgroundImage?.url && (
        <img className="flowers" src={backgroundImage.url} alt={backgroundImage.alt || 'Sunflower image'} />
      )}
    </div>
  );
}

export default TextHubspotForm;

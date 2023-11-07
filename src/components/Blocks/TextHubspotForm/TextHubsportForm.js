import React from 'react';
import HubspotForm from '../HubspotForm/HubspotForm';

import './index.scss';

function TextHubspotForm({ block, centerContent = false }) {
  const {
    id,
    title,
    backgroundColor,
    description,
    variant,
    backgroundImage,
    smallTitle = false,
    hasMemberPartiesLogic = false,
  } = block;
  const { formId, region, portalId, redirectTo } = block.hubspot;

  return (
    <div
      className={`text-hubspot-form ${backgroundColor} ${centerContent ? 'text-center' : ''} ${
        variant === 'column-small' ? 'p-0 pb-5' : ''
      }`}
    >
      <div className="container">
        <div className={`hubspot-container ${variant} ${centerContent ? 'form-center' : ''}`}>
          {title && <h2 className={`${smallTitle ? 'sm' : ''}`}>{title}</h2>}
          {description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}

          <HubspotForm
            id={id}
            formId={formId}
            region={region}
            portalId={portalId}
            redirectTo={redirectTo}
            hasMemberPartiesLogic={hasMemberPartiesLogic}
          />
        </div>
      </div>

      {backgroundImage?.url && (
        <img className="flowers" src={backgroundImage.url} alt={backgroundImage.alt || 'Sunflower image'} />
      )}
    </div>
  );
}

export default TextHubspotForm;

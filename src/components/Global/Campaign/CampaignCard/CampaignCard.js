import React from 'react';
import HubspotForm from '../../../Blocks/HubspotForm/HubspotForm';
import ImageWrapper from '../../Image/ImageWrapper';

import './index.scss';
import { isArray } from '../../../../utils';
import Button from '../../Button/Button';

const CampaignCard = ({ campaign }) => {
  const {
    title,
    description,
    backgroundColor = '',
    links = null,
    image = null,
    bannerImage = null,
    form = null,
  } = campaign;

  return (
    <div className={`campaign-card section-${backgroundColor}`} style={{ backgroundImage: `url(${image?.url})` }}>
      <div className="row align-items-center">
        {bannerImage && (
          <div className="col-4">
            <ImageWrapper image={bannerImage} />
          </div>
        )}

        <div className={`${bannerImage ? 'col-7' : 'col-12'}`}>
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />

          {form ? <HubspotForm {...form} /> : null}
        </div>
      </div>

      {isArray(links) && (
        <div className="row mt-5">
          {links.map((link) => (
            <div className="col-lg-6">
              <Button label={link.label} url={link.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignCard;

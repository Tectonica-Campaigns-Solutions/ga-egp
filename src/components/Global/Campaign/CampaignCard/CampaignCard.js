import React from 'react';
import HubspotForm from '../../../Blocks/HubspotForm/HubspotForm';
import ImageWrapper from '../../Image/ImageWrapper';
import { isArray } from '../../../../utils';
import CtaList from '../../Cta/CtaList';

import './index.scss';

const CampaignCard = ({ campaign, fullHeight = false }) => {
  const {
    title,
    description,
    backgroundColor = '',
    ctas = [],
    image = null,
    bannerImage = null,
    form = null,
  } = campaign;

  return (
    <div
      className={`campaign-card bg-${backgroundColor} ${fullHeight ? 'h-100' : ''}`}
      style={{ backgroundImage: `url(${image?.url})` }}
    >
      <div className="row align-items-center">
        {bannerImage && (
          <div className="col-4 banner-image">
            <ImageWrapper image={bannerImage} />
          </div>
        )}

        <div className={`${bannerImage ? 'col-7' : 'col-12'}`}>
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />

          {form ? (
            <div className="campaign-form">
              <HubspotForm {...form} />
            </div>
          ) : null}
        </div>
      </div>

      {isArray(ctas) && <CtaList ctas={ctas} />}
    </div>
  );
};

export default CampaignCard;

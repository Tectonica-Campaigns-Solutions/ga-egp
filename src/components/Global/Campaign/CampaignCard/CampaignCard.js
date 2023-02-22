import React from 'react';
import HubspotForm from '../../../Blocks/HubspotForm/HubspotForm';
import ImageWrapper from '../../Image/ImageWrapper';

import './index.scss';

const CampaignCard = ({ campaign }) => {
  const { title, description, backgroundColor = '', image = null, bannerImage = null, form = null } = campaign;

  return (
    <div className={`campaign-card section-${backgroundColor}`} style={{ backgroundImage: `url(${image?.url})` }}>
      <div className="row">
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
    </div>
  );
};

export default CampaignCard;

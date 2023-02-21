import React from 'react';
import './index.scss';

const CampaignCard = ({ title, description, image = null }) => {
  return (
    <div className="campaign-card" style={{ backgroundImage: `url(${image.url})` }}>
      <div className="row">
        <div className="col-7 offset-5">
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

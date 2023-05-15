import React from 'react';
import Button from '../../Button/Button';
import ImageWrapper from '../../Image/ImageWrapper';

import './index.scss';

const CampaignMain = ({ title, description, image, links = null }) => {
  return (
    <div className="campaign-main">
      {image && (
        <div className="img">
          <ImageWrapper image={image} />
        </div>
      )}

      {title && <h2>{title}</h2>}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}

      {/* Cta */}
      {links && (
        <div className="ctas">
          {links.map((item) => (
            <Button {...item} key={`campaign-link-${item.url}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignMain;

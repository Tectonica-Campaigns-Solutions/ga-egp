import React from 'react';
import ImageWrapper from '../../Image/ImageWrapper';
import CtaList from '../../Cta/CtaList';

import './index.scss';

const CampaignMain = ({ campaign }) => {
  const { title, description, image, ctas = [] } = campaign;

  return (
    <div className="campaign-main">
      {image && (
        <div className="img">
          <ImageWrapper image={image} />
        </div>
      )}

      {title && <h2>{title}</h2>}
      {description && <div className="link-and-list-styles" dangerouslySetInnerHTML={{ __html: description }} />}

      {/* Cta */}
      {ctas && <CtaList ctas={ctas} />}
    </div>
  );
};

export default CampaignMain;

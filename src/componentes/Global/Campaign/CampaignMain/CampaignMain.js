import React from "react";
import Button from "../../Button/Button";
import ImageWrapper from "../../Image/ImageWrapper";

import "./index.scss";

const CampaignMain = ({ title, description, image }) => {
  return (
    <div className="campaign-main">
      {image && (
        <div className="img">
          <ImageWrapper image={image} />
        </div>
      )}

      <h2>{title}</h2>
      <p>{description}</p>

      {/* Cta */}
      <div className="ctas">
        <Button label="Request to Join" />
        <Button label="Member Login  →" customVariant="light" />
      </div>
    </div>
  );
};

export default CampaignMain;

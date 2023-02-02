import React from "react";
import Button from "../../Button/Button";
import ImageWrapper from "../../Image/ImageWrapper";

import "./index.scss";

const CampaignMain = ({ title, description, image, link=null }) => {
  console.log(link)
  return (
    <div className="campaign-main">
      {image && (
        <div className="img">
          <ImageWrapper image={image} />
        </div>
      )}

      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: description }} />

      {/* Cta */}
      {
        link && 
          <div className="ctas">
            {
              link.map(item => <Button label="Request to Join" />)
            }
          </div>
      }
    </div>
  );
};

export default CampaignMain;

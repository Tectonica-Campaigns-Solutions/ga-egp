import React from "react";
import "./index.scss";

const CampaignCard = ({ title, description, imageUrl }) => {
  return (
    <div
      className="campaign-card"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h3>{title}</h3>
      <div
      dangerouslySetInnerHTML={{__html: description}}
    />
    </div>
  );
};

export default CampaignCard;

import React from "react";
import CampaignCard from "../../Global/Campaign/CampaignCard/CampaignCard";
import CampaignMain from "../../Global/Campaign/CampaignMain/CampaignMain";
import Section from "../../Global/Section/Section";

const Campaigns = ({}) => {
  return (
    <Section
      title="Building Green Power"
      linkLabel="all engagement opportunities  →"
      bgColor="section-light-red"
    >
      <div className="col-md-6">
        <CampaignMain
          title="Welcome to the Local Councillors’ Networks"
          description="The Local Councillor’s Network is the community of Green Local Councillors from all over Europe. A space where you can share your projects, experience and knowledge with others, and a place to find relevant events, network and skill sharing opportunities"
          image={{
            url: "https://www.datocms-assets.com/87481/1672133611-madhu-shesharam-kqzzcvyewvk-unsplash.jpg?auto=format",
          }}
        />
      </div>

      <div className="col-md-6">
        <CampaignCard
          title="Join Tilt! and fight for a Green Europe!"
          description="Are you committed to a fairer and Greener Europe? Make sure you join the Tilt Community!"
        />
        <CampaignCard
          title="Join Tilt! and fight for a Green Europe!"
          description="Are you committed to a fairer and Greener Europe? Make sure you join the Tilt Community!"
        />
        <CampaignCard
          title="Join Tilt! and fight for a Green Europe!"
          description="Are you committed to a fairer and Greener Europe? Make sure you join the Tilt Community!"
        />
      </div>
    </Section>
  );
};

export default Campaigns;

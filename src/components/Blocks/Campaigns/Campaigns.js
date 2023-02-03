import React from 'react';
import CampaignCard from '../../Global/Campaign/CampaignCard/CampaignCard';
import CampaignMain from '../../Global/Campaign/CampaignMain/CampaignMain';
import Section from '../../Global/Section/Section';

const Campaigns = ({ block }) => {
  return (
    <Section title={block.title} link={block.link} bgColor="section-light-red" extraClassNames="g-5">
      <div className="col-lg-6">
        {block.highlight && (
          <CampaignMain
            title={block.highlight.title}
            description={block.highlight.description}
            image={block.highlight.image}
            links={block.link}
          />
        )}
      </div>

      <div className="col-lg-6">
        {block.otherCampaigns &&
          block.otherCampaigns.map((item) => {
            return <CampaignCard title={item.title} description={item.description} image={item.image} />;
          })}
      </div>
    </Section>
  );
};

export default Campaigns;

import React from 'react';
import CampaignCard from '../../Global/Campaign/CampaignCard/CampaignCard';
import CampaignMain from '../../Global/Campaign/CampaignMain/CampaignMain';
import Section from '../../Global/Section/Section';

const Campaigns = ({ block }) => {
  const { title, introduction, link, backgroundColor, highlight, otherCampaigns } = block;

  return (
    <Section title={title} introduction={introduction} link={link} bgColor={backgroundColor} extraClassNames="g-4">
      {highlight && (
        <div className="col-lg-6">
          <CampaignMain
            title={highlight.title}
            description={highlight.description}
            image={highlight.image}
            links={highlight.links}
          />
        </div>
      )}

      <div className={`${highlight ? 'col-lg-6' : 'col'}`}>
        {highlight ? (
          <>{otherCampaigns && otherCampaigns.map((item) => <CampaignCard campaign={item} key={item.id} />)}</>
        ) : (
          <div className="row gy-4">
            {otherCampaigns &&
              otherCampaigns.map((campaign) => (
                <div className="col-lg-6" key={campaign.id}>
                  <CampaignCard campaign={campaign} fullHeight />
                </div>
              ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Campaigns;

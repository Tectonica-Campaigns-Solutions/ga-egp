import React from 'react';
import CampaignCard from '../../Global/Campaign/CampaignCard/CampaignCard';
import CampaignMain from '../../Global/Campaign/CampaignMain/CampaignMain';
import Section from '../../Global/Section/Section';

const Campaigns = ({ block }) => {
  const hasHighlightBlock = block.highlight;

  return (
    <Section
      title={block.title}
      introduction={block.introduction}
      link={block.link}
      bgColor={block.backgroundColor}
      extraClassNames="g-4"
    >
      {hasHighlightBlock && (
        <div className="col-lg-6">
          <CampaignMain
            title={block.highlight.title}
            description={block.highlight.description}
            image={block.highlight.image}
            links={block.link}
          />
        </div>
      )}

      <div className={`${hasHighlightBlock ? 'col-lg-6' : 'col'}`}>
        {hasHighlightBlock ? (
          <>
            {block.otherCampaigns &&
              block.otherCampaigns.map((item) => {
                return <CampaignCard campaign={item} key={item.id} />;
              })}
          </>
        ) : (
          <div className="row">
            {block.otherCampaigns &&
              block.otherCampaigns.map((campaign) => (
                <div className="col-lg-6" key={campaign.id}>
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Campaigns;

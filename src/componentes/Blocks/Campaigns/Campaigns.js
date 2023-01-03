import React from "react";
import CampaignCard from "../../Global/Campaign/CampaignCard/CampaignCard";
import CampaignMain from "../../Global/Campaign/CampaignMain/CampaignMain";
import Section from "../../Global/Section/Section";

const Campaigns = ({ block }) => {
  return (
    <Section
      title={block.title}
      link={block.link}
      bgColor="section-light-red"
      extraClassNames="g-5"
    >
      {
        block.highlight && block.highlight.map( (item, index) => {
          if(index === 0){
            return (
            <div className="col-md-6">
              <CampaignMain
                title={item.title }
                description={item.description}
                image={{
                  url: "https://www.datocms-assets.com/87481/1672133611-madhu-shesharam-kqzzcvyewvk-unsplash.jpg?auto=format",
                }}
              />
            </div>
            )
          }
        })
      }
       <div className="col-md-6">
      {
        block.highlight && block.highlight.map( (item, index) => {
          if(index !== 0){
            return (
              <CampaignCard
              title={item.title }
              description={ item.description }
            />
            )
          }
        })
      }
      </div>
    </Section>
  );
};

export default Campaigns;

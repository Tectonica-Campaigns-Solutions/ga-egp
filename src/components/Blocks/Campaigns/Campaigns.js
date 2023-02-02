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
      <div className="col-lg-6">
      {block.highlight && 
          <CampaignMain
            title={block.highlight.title}
            description={block.highlight.description}
            image={block.highlight.image}
            links={block.link}
          />
      }
      </div>
      {/* {block.highlight &&
        block.highlight.map((item, index) => {
          if (index === 0) {
            return (
              <div className="col-lg-6">
                <CampaignMain
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </div>
            );
          }
        })} */}

      <div className="col-lg-6">
        {
          block.otherCampaigns && block.otherCampaigns.map(item => {
            return(
              <div>other</div>
            )
          })
        }
        {/* {block.highlight &&
          block.highlight.map((item, index) => {
            if (index !== 0) {
              return (
                <CampaignCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              );
            }
          })} */}
      </div>
    </Section>
  );
};

export default Campaigns;

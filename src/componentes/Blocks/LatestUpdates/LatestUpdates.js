import React from "react";
import CardUpdate from "../../Global/CardUpdate/CardUpdate";
import Section from "../../Global/Section/Section";

const LatestUpdates = ({}) => {
  return (
    <Section title="Updates" linkLabel="See all Updates  →">
      <div className="col-md-4">
        <CardUpdate
          date="10 DEC 2022"
          title="6th European Greens Congress: Getting Ready for the 2024 European Elections!"
          image={{
            url: "https://www.datocms-assets.com/87481/1672133110-header.png?auto=format&w=2560",
          }}
        />
      </div>
      <div className="col-md-4">
        <CardUpdate
          date="10 DEC 2022"
          title="6th European Greens Congress: Getting Ready for the 2024 European Elections!"
          image={{
            url: "https://www.datocms-assets.com/87481/1672133110-header.png?auto=format&w=2560",
          }}
        />
      </div>
      <div className="col-md-4">
        <CardUpdate
          isPodcast
          date="15 OCT 2022"
          title="6th European Greens Congress: Getting Ready for the 2024 European Elections!"
          image={{
            url: "https://www.datocms-assets.com/87481/1672133110-header.png?auto=format&w=2560",
          }}
        />
      </div>
    </Section>
  );
};

export default LatestUpdates;

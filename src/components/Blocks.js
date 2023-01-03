import React from "react";
import NarrativeBlock from "./Blocks/NarrativeBlock/NarrativeBlock";
import TextHubsportForm from "./Blocks/TextHubspotForm/TextHubsportForm";
import Logos from "./Blocks/Logos/Logos";
import HighlightedPositions from "./Blocks/HighlightedPositions/HighlightedPositions";
import UpcomingEvents from "./Blocks/UpcomingEvents/UpcomingEvents";
import Campaigns from "./Blocks/Campaigns/Campaigns";

export default function Blocks({ blocks }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__typename) {
          case "DatoCmsNarrativeBlock":
            return <NarrativeBlock block={block} key={block.id} />;
          case "DatoCmsTextHubspotForm":
            return <TextHubsportForm block={block} key={block.id} />;
          case "DatoCmsLogosBlock":
            return <Logos block={block} key={block.id} />;
          case "DatoCmsHighlightedPosition":
            return <HighlightedPositions block={block} key={block.id} />;
          case "DatoCmsUpcomingEvent":
            return <UpcomingEvents />;
          case "DatoCmsCampaing":
            return <Campaigns block={block} key={block.id} />;
          default:
            return "";
        }
      })}
    </>
  );
}

import React from 'react';
import NarrativeBlock from './Blocks/NarrativeBlock/NarrativeBlock';
import TextHubsportForm from './Blocks/TextHubspotForm/TextHubsportForm';
import Logos from './Blocks/Logos/Logos';
import HighlightedPositions from './Blocks/HighlightedPositions/HighlightedPositions';
import UpcomingEvents from './Blocks/UpcomingEvents/UpcomingEvents';
import Campaigns from './Blocks/Campaigns/Campaigns';
import SocialFollow from './Blocks/SocialFollow/SocialFollow';
import LatestUpdates from './Blocks/LatestUpdates/LatestUpdates';
import GroupPerson from './Blocks/GroupPerson/GroupPerson';
import TextSimple from './Blocks/TextSimple/TextSimple';
import TwoColumns from './Blocks/TwoColumns/TwoColumns';
import SocialGrid from './Blocks/SocialGrid/SocialGrid';
import VerticalCtaList from './Blocks/VerticalCtaList/VerticalCtaList';
import ListSessions from './Blocks/ListSessions/ListSessions';
import HubspotStepsForm from './Blocks/HubspotStepsForm/HubspotStepsForm';
import BlockDonation from './Blocks/BlockDonation/BlockDonation';
import EmbedVideo from './Blocks/EmbedVideo/EmbedVideo';
import EmbedIframe from './Blocks/EmbedIframe/EmbedIframe';
import PreviewCtaBlock from './Blocks/PreviewCtaBlock/PreviewCtaBlock';
import CampaignHanbook from './Blocks/CampaignHandbook/CampaignHanbook';

export default function Blocks({ blocks }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__typename) {
          case 'DatoCmsNarrativeBlock':
            return <NarrativeBlock block={block} key={block.id} />;
          case 'DatoCmsTextHubspotForm':
            return <TextHubsportForm block={block} key={block.id} />;
          case 'DatoCmsLogosBlock':
            return <Logos block={block} key={block.id} />;
          case 'DatoCmsHighlightedPosition':
            return <HighlightedPositions block={block} key={block.id} />;
          case 'DatoCmsUpcomingEvent':
            return <UpcomingEvents key={block.id} block={block} />;
          case 'DatoCmsCampaing':
            return <Campaigns block={block} key={block.id} />;
          case 'DatoCmsSocialFollow':
            return <SocialFollow block={block} key={block.id} />;
          case 'DatoCmsLatestBlog':
            return <LatestUpdates block={block} key={block.id} />;
          case 'DatoCmsGroupPerson':
            return <GroupPerson block={block} key={block.id} />;
          case 'DatoCmsTextSimple':
            return <TextSimple block={block} key={block.id} />;
          case 'DatoCmsTwoColumn':
            return <TwoColumns block={block} key={block.id} />;
          case 'DatoCmsSocialGrid':
            return <SocialGrid block={block} key={block.id} />;
          case 'DatoCmsVerticalCtaList':
            return <VerticalCtaList block={block} key={block.id} />;
          case 'DatoCmsListSession':
            return <ListSessions block={block} key={block.id} />;
          case 'DatoCmsFormWithStep':
            return <HubspotStepsForm key={block.id} block={block} />;
          case 'DatoCmsBlockDonation':
            return <BlockDonation key={block.id} block={block} />;
          case 'DatoCmsEmbedVideo':
            return <EmbedVideo key={block.id} block={block} />;
          case 'DatoCmsEmbedIframe':
            return <EmbedIframe key={block.id} block={block} />;
          case 'DatoCmsPreviewCta':
            return <PreviewCtaBlock key={block.id} block={block} />;
          case 'DatoCmsHandbookForm':
            return <CampaignHanbook key={block.id} />;
          default:
            return '';
        }
      })}
    </>
  );
}

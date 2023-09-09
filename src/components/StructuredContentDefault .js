import React from 'react';
import { StructuredText } from 'react-datocms';
import Accordion from './Global/Accordion/Accordion';
import EmbedAudio from './Blocks/EmbedAudio/EmbedAudio';
import ImageWrapper from './Global/Image/ImageWrapper';
import EmbedVideo from './Blocks/EmbedVideo/EmbedVideo';

const StructuredContentDefault = ({ content }) => {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'DatoCmsAcordion':
            return <Accordion items={record.items} renderChild={(item) => <div>{item.text}</div>} />;
          case 'DatoCmsEmbedAudio':
            return <EmbedAudio file={record.file} iframeContent={record.iframeContent} />;
          case 'DatoCmsImage':
            return <div><ImageWrapper image={record.image}/></div>;
          case 'DatoCmsEmbedIframe':
            return <div className="mt-3 mb-3" dangerouslySetInnerHTML={{__html: record.embedCode}} />;
          case 'DatoCmsEmbedVideo':
            return <EmbedVideo key={record.id} block={record} />;;
          default:
            return <></>;
        }
      }}
    />
  );
};

export default StructuredContentDefault;

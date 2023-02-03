import React from 'react';
import { StructuredText } from 'react-datocms';
import Accordion from './Global/Accordion/Accordion';
import EmbedAudio from './Blocks/EmbedAudio/EmbedAudio';

const StructuredContentDefault = ({ content }) => {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'DatoCmsAcordion':
            return <Accordion items={record.items} renderChild={(item) => <div>{item.text}</div>} />;
          case 'DatoCmsEmbedAudio':
            return <EmbedAudio />;
          default:
            return <></>;
        }
      }}
    />
  );
};

export default StructuredContentDefault;

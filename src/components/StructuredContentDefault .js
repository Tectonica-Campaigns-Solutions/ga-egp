import React from 'react';
import { StructuredText } from 'react-datocms';
import Accordion from './Global/Accordion/Accordion';

const StructuredContentDefault = ({ content }) => {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'DatoCmsAcordion':
            return <Accordion items={record.items} renderChild={(item) => <div>{item.text}</div>} />;
          default:
            return <></>;
        }
      }}
    />
  );
};

export default StructuredContentDefault;

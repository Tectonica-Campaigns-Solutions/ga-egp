import React from 'react';
import { StructuredText } from 'react-datocms';
import Acordion from './Global/Acordion/Acordion';

const StructuredContentDefault = ({ content }) => {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'DatoCmsAcordion':
            return <Acordion items={record.items} />;
          default:
            return <></>;
        }
      }}
    />
  );
};

export default StructuredContentDefault;

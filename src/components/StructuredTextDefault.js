import React from 'react';
import { StructuredText } from 'react-datocms';

const StructuredTextDefault = ({ content }) => {
  return (
    <StructuredText
      data={content}
    />
  );
};

export default StructuredTextDefault;

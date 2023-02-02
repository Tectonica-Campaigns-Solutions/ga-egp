import React from 'react';
import InformationCard from '../InformationCard/InformationCard';

function CardPolicy({ title, intro, documents, model }) {
  return (
    <InformationCard
      preTitle={
        <>
          Adopted: <strong>Madrid, 10-12 May 2013</strong>
        </>
      }
      title={title}
      intro={intro}
      documents={documents}
    />
  );
}

export default CardPolicy;

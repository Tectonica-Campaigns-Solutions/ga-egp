import React from 'react';
import InformationCard from '../InformationCard/InformationCard';
import { removeUnderscoreFromString } from '../../../utils';

function CardPolicy({ item }) {
  const { title, documents, intro, model = null } = item;

  const isPolicyPaper = model ? model.apiKey === 'policy_paper' : false;
  const policyType = isPolicyPaper ? removeUnderscoreFromString(model?.apiKey) : model?.apiKey;

  // TODO: Add correct slug or use path to model util
  const url = isPolicyPaper ? null : 'slug';

  return (
    <InformationCard
      preTitle={
        <>
          {isPolicyPaper ? (
            <>
              Adopted: <strong>Madrid, 10-12 May 2013</strong>
            </>
          ) : (
            <>
              Council: <strong>Copenhagen Congress 2022</strong>
            </>
          )}
        </>
      }
      tag={policyType}
      title={title}
      intro={intro}
      documents={documents}
      url={url}
    />
  );
}

export default CardPolicy;

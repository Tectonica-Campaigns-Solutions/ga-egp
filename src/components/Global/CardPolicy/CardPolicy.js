import React from 'react';
import InformationCard from '../InformationCard/InformationCard';
import { pathToModel, removeUnderscoreFromString } from '../../../utils';

function CardPolicy({ item }) {
  const { title, documents, intro, model = null, slug, council = null } = item;

  const isPolicyPaper = model ? model.apiKey === 'policy_paper' : false;
  const policyType = isPolicyPaper ? removeUnderscoreFromString(model?.apiKey) : model?.apiKey;

  // TODO: Add correct slug or use path to model util
  const url = isPolicyPaper ? null : pathToModel(model.apiKey, slug);

  return (
    <InformationCard
      preTitle={
        <>
          {isPolicyPaper ? (
            <>
              Adopted: <strong>Madrid, 10-12 May 2013</strong>
            </>
          ) : (
            council && (
              <>
                Council: <strong>{council.title || 'N/A'}</strong>
              </>
            )
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

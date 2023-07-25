import React from 'react';
import { isArray } from '../../../utils';
import Document from '../Document/Document';
import Link from '../Link';
import Tag from '../Tag/Tag';

import './index.scss';

const InformationCard = ({
  tag,
  preTitle,
  title,
  intro,
  documentKey = 'Related Downloads',
  documents = [],
  url = null,
}) => {
  React.useEffect(() => {
    const paragraphs = document.querySelectorAll('#intro p');

    // Remove empties paragraphs
    paragraphs.forEach((paragraph) => {
      if (paragraph.innerHTML.trim() === '') {
        console.log(paragraph.innerHTML);
        paragraph.style.display = 'none';
      } else if (paragraph.innerHTML === '&nbsp;') {
        paragraph.style.display = 'none';
      }
    });
  }, []);

  return (
    <div className="information-card">
      <div className="header-information">
        {tag && <Tag title={tag} />}
        <div className="pre-title">{preTitle}</div>
      </div>

      <Link to={url} className={`${url ? 'active' : 'disable'}`}>
        <h6>{title}</h6>
      </Link>

      <div id="intro" className="description" dangerouslySetInnerHTML={{ __html: intro }} />

      {isArray(documents) && (
        <div className="docs">
          <span>{documentKey}</span>

          {documents.map((doc) => (
            <Document key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InformationCard;

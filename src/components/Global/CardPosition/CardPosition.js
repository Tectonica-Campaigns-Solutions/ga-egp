import React from 'react';
import Link from '../Link';
import Button from '../Button/Button';
import { pathToModel } from '../../../utils';

import './index.scss';

function CardPosition({ position, small = false, showButtons = true }) {
  const positionUrl = pathToModel(position.model.apiKey, position.slug);

  return (
    <Link to={!showButtons ? positionUrl : null}>
      <div
        className={`card-position ${small ? 'small' : ''}`}
        style={{ backgroundImage: `url(${position.imageCard.url})` }}
      >
        <div className="text-content">
          <h3>{position.title}</h3>

          {showButtons && (
            <div className="ctas">
              <Button label="Read More" isPrimary={false} url={positionUrl} />
              <Button label="Related Reading  →" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CardPosition;

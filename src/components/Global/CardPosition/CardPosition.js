import React from 'react';
import Link from '../Link';
import Button from '../Button/Button';
import { pathToModel } from '../../../utils';
import flower from '../../Icons/flower.png';
import { GatsbyImage } from 'gatsby-plugin-image';

import './index.scss';

function CardPosition({ position, small = false, showButtons = true }) {
  const positionUrl = pathToModel(position.model.apiKey, position.slug);

  return (
    <Link to={!showButtons ? positionUrl : null}>
      <div
        className={`card-position color-${position.backgroundColor} ${small ? 'small' : ''}`}
        style={{ backgroundImage: `url(${flower})` }}
      >
        <GatsbyImage image={position.imageCard.gatsbyImageData} className="image-position" alt={position.imageCard?.alt ? position.imageCard?.alt : 'position'} />

        <div className="text-content">
          <h3 className={`${position.textWhite ? 'white' : ''}`}>{position.title}</h3>

          {showButtons && (
            <div className="ctas">
              <Button label="Read More" customVariant={'white'} url={positionUrl} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CardPosition;

import React from 'react';
import Link from '../Link';
import Button from '../Button/Button';
import { pathToModel } from '../../../utils';
import flower from '../../Icons/flower.png';
import './index.scss';
import { GatsbyImage } from 'gatsby-plugin-image';

function CardPosition({ position, small = false, showButtons = true }) {
  const positionUrl = pathToModel(position.model.apiKey, position.slug);
  console.log(position)
  return (
    <Link to={!showButtons ? positionUrl : null}>
      <div
        className={`card-position color-${position.backgroundColor} ${small ? 'small' : ''}`}
        style={{ backgroundImage: `url(${flower})` }}
      >
        <GatsbyImage image={position.imageCard.gatsbyImageData} className="image-position"/>
        <div className="text-content">
          <h3 className={`${position.textWhite ? 'white' : ''}`}>{position.title}</h3>

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

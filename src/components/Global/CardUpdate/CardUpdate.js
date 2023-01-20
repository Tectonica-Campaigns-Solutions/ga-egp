import React from 'react';
import Link from '../Link';
import Tag from '../Tag/Tag';
import ImageWrapper from '../Image/ImageWrapper';
import podcastArrow from '../../Icons/podcast-arrow.svg';
import { isArray, pathToModel } from '../../../utils';

import './index.scss';

const CardUpdate = ({ post }) => {
  // Force re-deploy
  const {
    slug,
    meta: { publishedAt },
    model: { apiKey },
    title,
    tags,
    image,
    isPodcast = false,
  } = post;

  const postUrl = pathToModel(apiKey, slug);

  return (
    <article className={`card-update ${isPodcast ? 'podcast' : ''}`}>
      <div className="information">
        <div className="meta">
          <span>{publishedAt}</span>

          {isPodcast && (
            <span className="podcast-tag">
              <img src={podcastArrow} alt="Podcast arrow" />
              Podcast
            </span>
          )}
        </div>

        {isArray(tags) && (
          <div className="tags">
            <Tag title="europe & democracy" />
          </div>
        )}

        <Link to={postUrl} className="title">
          {title}
        </Link>
      </div>

      <Link to={postUrl}>
        <ImageWrapper image={image} />
      </Link>
    </article>
  );
};

export default CardUpdate;

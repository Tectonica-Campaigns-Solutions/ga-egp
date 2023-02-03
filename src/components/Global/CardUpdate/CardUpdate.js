import React from 'react';
import Link from '../Link';
import Tag from '../Tag/Tag';
import ImageWrapper from '../Image/ImageWrapper';
import podcastArrow from '../../Icons/podcast-arrow.svg';
import { isArray, pathToModel, basePathTag } from '../../../utils';

import './index.scss';

const CardUpdate = ({ post }) => {
  const {
    slug,
    meta: { publishedAt },
    model: { apiKey },
    title,
    tags,
    image,
    isPodcast = apiKey === 'podcast' ?? true,
  } = post;

  const postUrl = pathToModel(apiKey, slug);
  const basePath = basePathTag(apiKey)
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

        <div>
          {isArray(tags) && (
            <div className="tags">
              {tags.map((tag, index) => (
                <Tag key={index} basePath={basePath} title={tag.title} slug={tag.slug} />
              ))}
            </div>
          )}

          <Link to={postUrl} className="title">
            {title}
          </Link>
        </div>
      </div>

      <Link to={postUrl}>
        <ImageWrapper image={image} />
      </Link>
    </article>
  );
};

export default CardUpdate;

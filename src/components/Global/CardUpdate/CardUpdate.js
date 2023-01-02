import React from "react";
import { Link } from "gatsby";
import Tag from "../Tag/Tag";
import ImageWrapper from "../Image/ImageWrapper";
import podcastArrow from "../../Icons/podcast-arrow.svg";

import "./index.scss";

const CardUpdate = ({ date, title, image, isPodcast = false }) => {
  return (
    <article className={`card-update ${isPodcast ? "podcast" : ""}`}>
      <div className="information">
        <div className="meta">
          <span>{date}</span>

          {isPodcast && (
            <span className="podcast-tag">
              <img src={podcastArrow} alt="Podcast arrow" />
              Podcast
            </span>
          )}
        </div>

        <div className="tags">
          <Tag title="europe & democracy" />
        </div>

        <Link to="/" className="title">
          {title}
        </Link>
      </div>

      <ImageWrapper image={image} />
    </article>
  );
};

export default CardUpdate;

import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import podcastArrow from '../../Icons/podcast-arrow.svg';

import './styles.scss';
import ImageWrapper from '../Image/ImageWrapper';

function HeroPodcast({
  title,
  date = null,
  parentTitle = null,
  breadcrumb = null,
  children = null,
  breadcrumbDetail = null,
  image,
}) {
  return (
    <div className="hero-podcast">
      <div className="container">
        {breadcrumb && (
          <div>
            <Breadcrumb textWhite items={breadcrumb} breadcrumbDetail={breadcrumbDetail} />
          </div>
        )}

        <div>
          <div className="row">
            <div className="col-lg-6">
              <div className="date-container">
                {date && <div className={'heroDate'}>{date}</div>}

                <span className="podcast-tag">
                  <img src={podcastArrow} alt="Podcast arrow" />
                  Podcast
                </span>
              </div>

              {parentTitle && <h2>{parentTitle}</h2>}
              {!parentTitle && <h1 className={`heroTitle`}>{title}</h1>}
            </div>

            <div className="col-lg-5 offset-lg-1">{image && <ImageWrapper image={{ ...image, title: null }} />}</div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default HeroPodcast;

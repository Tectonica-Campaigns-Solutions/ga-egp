import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const GlobalImage = ({ image, ...props }) => {
  if (image?.gatsbyImageData) {
    return <GatsbyImage image={{ ...image.gatsbyImageData }} {...props} alt={image?.alt ? image.alt : 'image'} />;
  } else if (image?.url) {
    return <img src={image.url} alt={image.alt || 'Image'} loading="lazy" />;
  } else {
    return '';
  }
};

export default GlobalImage;

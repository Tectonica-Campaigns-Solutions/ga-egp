import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const GlobalImage = ({ image, ...props }) => {
  if (image?.gatsbyImageData) {
    return <GatsbyImage image={{ ...image.gatsbyImageData }} {...props} alt="image" />;
  } else if (image?.url) {
    return <img src={image.url} alt={image.alt || 'Image'} />;
  } else {
    return '';
  }
};

export default GlobalImage;

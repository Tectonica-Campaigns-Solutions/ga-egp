import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const GlobalImage = ({ image, ...props }) => {
  if (image?.gatsbyImageData) {
    return <GatsbyImage image={{ ...image.gatsbyImageData }} {...props} />;
  }
  else if(image?.url){
    return <img src={image.url} />
  }else{
    return '';
  }
};

export default GlobalImage;

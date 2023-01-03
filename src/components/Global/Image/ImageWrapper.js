import React from "react";
import CTSlider from "./CTSlider";
import GlobalImage from "./GlobalImage";

import "./index.scss";

export default function ImageWrapper({ image, ...props }) {
  if (Array.isArray(image) && image.length > 1) {
    return (
      <CTSlider>
        {image.map((img) => (
          <GlobalImage image={img} {...props} />
        ))}
      </CTSlider>
    );
  }

  return (
    <div className="image-wrapper">
      <GlobalImage image={Array.isArray(image) ? image[0] : image} {...props} />

      {image?.title && (
        <div className="caption">
          <span className="image-caption">{image.title}</span>
        </div>
      )}
    </div>
  );
}

import React from "react";
import ImageWrapper from "../../Global/Image/ImageWrapper";
import EGPSlider from "../../Global/EGPSlider/EGPSlider";
import { isArray } from "../../../utils";

import "./index.scss";

function Logos({ block }) {
  const { title = null, intro = null, logos } = block;

  return (
    <div className={`logos-block`}>
      <div className="container">
        {title && <h2>{title}</h2>}

        {intro && (
          <div className="intro" dangerouslySetInnerHTML={{ __html: intro }} />
        )}

        {isArray(logos) && (
          <div className="row logos-list justify-content-center g-5">
            <EGPSlider
              autoplay
              renderActions={false}
              slidesToShow={6}
              slidesToScroll={6}
            >
              {logos.map((logo) => (
                <div className="col-lg-2 col-md-3 col-6">
                  <a href={logo.url} target="_blank">
                    <ImageWrapper image={logo.icon} />
                  </a>
                </div>
              ))}
            </EGPSlider>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logos;

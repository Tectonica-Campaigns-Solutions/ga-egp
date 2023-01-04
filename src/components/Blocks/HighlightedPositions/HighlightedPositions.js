import React from "react";
import CardPosition from "../../Global/CardPosition/CardPosition";
import { isArray } from "../../../utils";
import EGPSlider from "../../Global/EGPSlider/EGPSlider";
import "./index.scss";

function HighlightedPositions({ block }) {
  return (
    <div className="highlighted-positions">
      <div className="container">
        <div className="row">
          <div className="col-xxl-4 col-text">
            <h3>{block.pretitle}</h3>
            <h2>{block.title}</h2>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: block.description }}
            />
          </div>

          {isArray(block.positions) && (
            <div className="col-xxl-8 col-slide">
              <div className="row gx-5">
                <EGPSlider>
                  {block.positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                </EGPSlider>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HighlightedPositions;

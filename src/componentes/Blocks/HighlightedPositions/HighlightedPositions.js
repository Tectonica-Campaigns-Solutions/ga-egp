import React from "react";
import CardPosition from "../../Global/CardPosition/CardPosition";
import { isArray } from "../../../utils";
import EGPSlider from "../../Global/EGPSlider/EGPSlider";

import LatestUpdates from "../LatestUpdates/LatestUpdates";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import Campaigns from "../Campaigns/Campaigns";

import "./index.scss";

function HighlightedPositions({ block }) {
  console.log(block);

  return (
    <div className="highlighted-positions">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h3>{block.pretitle}</h3>
            <h2>{block.title}</h2>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: block.description }}
            />
          </div>

          {isArray(block.positions) && (
            <div className="col-lg-8">
              <div className="row gx-5">
                <EGPSlider>
                  {block.positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                </EGPSlider>
              </div>
            </div>
          )}

          {/* Blocks for testing */}
          <div className="mt-5 pt-5">
            <Campaigns />
            <UpcomingEvents />
            <LatestUpdates />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightedPositions;

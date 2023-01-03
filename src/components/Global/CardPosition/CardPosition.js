import React from "react";
import Button from "../Button/Button";

import "./index.scss";

function CardPosition({ position }) {
  return (
    <div
      className="card-position"
      style={{ backgroundImage: `url(${position.imageCard.url})` }}
    >
      <div className="text-content">
        <h3>{position.title}</h3>

        <div className="ctas">
          <Button label="Read More" isPrimary={false} />
          <Button label="Related Reading  →" />
        </div>
      </div>
    </div>
  );
}

export default CardPosition;

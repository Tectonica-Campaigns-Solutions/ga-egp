import React from "react";
import Button from "../Button/Button";

import "./index.scss";

const Section = ({
  title,
  linkLabel,
  linkUrl,
  bgColor,
  extraClassNames = "",
  children,
}) => {
  return (
    <section className={`egp-section ${bgColor}`}>
      <div className="container">
        <div className="title">
          <h2>{title}</h2>
          <Button
            label={linkLabel}
            url={linkUrl}
            isPrimary={false}
            customVariant="light"
          />
        </div>

        <div className={`row ${extraClassNames}`}>{children}</div>
      </div>
    </section>
  );
};

export default Section;

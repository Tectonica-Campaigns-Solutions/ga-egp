import React from "react";
import Button from "../Button/Button";

import "./index.scss";

const Section = ({
  title,
  link=null,
  bgColor,
  extraClassNames = "",
  children,
}) => {
  console.log(link)
  return (
    <section className={`egp-section ${bgColor}`}>
      <div className="container">
        <div className="title">
          <h2>{title}</h2>
          {
            link && 
              <Button
                label={link.label}
                isPrimary={false}
                customVariant="light"
              />
          }
        </div>

        <div className={`row ${extraClassNames}`}>{children}</div>
      </div>
    </section>
  );
};

export default Section;

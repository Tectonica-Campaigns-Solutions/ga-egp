import React, { useEffect } from "react";
import { GatsbyImage, withArtDirection } from "gatsby-plugin-image";

import "./index.scss";

function HeroHome({ title, image, imageMobile, description, form, textWhite }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "hubspot-contact-form";
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: form.region,
          portalId: form.portalId,
          formId: form.formId,
          target: `#hubspotForm-${form.id}`,
        });
      }
    });
  }, [form]);

  const images = withArtDirection(image, [
    {
      media: "(max-width: 992px)",
      image: imageMobile,
    },
  ]);

  return (
    <div
      className={`hero-home ${textWhite ? "text-white" : ""}`}
      style={{ backgroundImage: `url(${image.images.fallback.src})` }}
    >
      {/* <GatsbyImage image={images} /> */}

      <div class="row">
        <div className="col-md-7 text container">
          <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
          {description && (
            <div
              className="text-content"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {form && <div id={`hubspotForm-${form.id}`} />}
        </div>
      </div>

      <div className="col-md-5"></div>
    </div>
  );
}

export default HeroHome;

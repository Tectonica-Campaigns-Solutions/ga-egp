import React, { useEffect } from "react";
import "./index.scss";

function HeroHome({ title, image, imageMobile, description, form, textWhite }) {
  const css = `@media (max-width: 750px) {
    .hero-home {
        background-image: url("${imageMobile.images.fallback.src}")
    }
    }
    @media (min-width: 750px) {
        .hero-home {
            background-image: url("${image.images.fallback.src}");
        }
  }`;

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

  return (
    <>
      <style scoped>{css}</style>
      <div className={`hero-home ${textWhite ? "text-white" : ""}`}>
        <div class="row">
          <div className="col-md-7 text container">
            <div
              className="title"
              dangerouslySetInnerHTML={{ __html: title }}
            />

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
    </>
  );
}

export default HeroHome;

import React, { useEffect } from 'react';
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'

function HeroHome({ title, image, imageMobile, description, form, textWhite }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'hubspot-contact-form';
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
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
      media: '(max-width: 992px)',
      image: imageMobile
    }
  ])
  return (
    <div className={`hero-home ${ textWhite ? 'text-white': ''}`}>
      <GatsbyImage image={images} />
      <div className="text container">
        <h1>{ title }</h1> 
        {description && <div className="text-content" dangerouslySetInnerHTML={{ __html: description }} />}
        {
          form && <div id={`hubspotForm-${form.id}`} />
        }
      </div>
    </div>
  )
}

export default HeroHome
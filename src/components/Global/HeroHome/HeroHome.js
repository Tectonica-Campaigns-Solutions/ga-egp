import React, { useEffect } from 'react';
import HubspotForm from '../../Blocks/HubspotForm/HubspotForm';

import './index.scss';

function HeroHome({
  title,
  image,
  imageMobile,
  description,
  form,
  textWhite,
  firstPartTitle,
  secondPartTitle,
  colorWords,
}) {
  useEffect(() => {
    setInterval(function () {
      const show = document.querySelector('span[data-show]');
      if (!show) return;

      const next = show.nextElementSibling || document.querySelector('span.animation:first-child');
      const up = document.querySelector('span.animation[data-up]');
      if (up) {
        up.removeAttribute('data-up');
      }

      show.removeAttribute('data-show');
      show.setAttribute('data-up', '');

      next.setAttribute('data-show', '');
    }, 4000);
  }, []);

  const css = `
    @media (max-width: 750px) {
      .hero-home {
        background-image: url("${imageMobile.images.fallback.src}");
      }
    }
    
    @media (min-width: 750px) {
      .hero-home {
          background-image: url("${image.images.fallback.src}");
      }
    }
  `;

  return (
    <>
      <style scoped>{css}</style>

      <div className={`hero-home ${textWhite ? 'text-white' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              {/* <div className="title" dangerouslySetInnerHTML={{ __html: title }} /> */}

              <div className="title">
                <span dangerouslySetInnerHTML={{ __html: firstPartTitle }} />
                <span style={{ display: 'inline-block' }}>for </span>
                <span className="mask">
                  <span className="animation" data-show style={{ paddingLeft: '10px' }}>
                    test
                  </span>
                  {colorWords.map((item, index) => {
                    return (
                      <span
                        className="animation"
                        style={{ paddingLeft: '10px' }}
                        dangerouslySetInnerHTML={{ __html: item.word }}
                      />
                    );
                  })}
                </span>
                <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: secondPartTitle }} />
              </div>

              {description && <div className="text-content" dangerouslySetInnerHTML={{ __html: description }} />}
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-8 col-12 box-form">
              {form && (
                <HubspotForm id={form.formId} formId={form.formId} region={form.region} portalId={form.portalId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroHome;

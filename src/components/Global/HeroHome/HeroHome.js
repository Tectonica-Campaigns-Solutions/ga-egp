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
            <div className="col-xxl-6 col-12">
              {/* <div className="title link-and-list-styles" dangerouslySetInnerHTML={{ __html: title }} /> */}

              <div className="title">
                <span className="link-and-list-styles" dangerouslySetInnerHTML={{ __html: firstPartTitle }} />
                <span className="letter-title">for </span>
                <span className="mask">
  
                  {colorWords.map((item, index) => {
                    return index == 0  ? (
                      <span className="animation" data-show style={{ paddingLeft: '10px' }} dangerouslySetInnerHTML={{ __html: item.word }} />
                    ): 
                    (
                      <span
                        key={`${item.word}-${index}`}
                        className="animation link-and-list-styles"
                        style={{ paddingLeft: '10px' }}
                        dangerouslySetInnerHTML={{ __html: item.word }}
                      />
                    )
                    
                  })}
                </span>
                <span
                  className="link-and-list-styles"
                  style={{ display: 'block' }}
                  dangerouslySetInnerHTML={{ __html: secondPartTitle }}
                />
              </div>

              {description && (
                <div className="text-content link-and-list-styles" dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12 col-12 box-form">
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

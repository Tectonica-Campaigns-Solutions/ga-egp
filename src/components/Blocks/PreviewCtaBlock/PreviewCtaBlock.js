import React, { useState } from 'react';
import { isArray } from '../../../utils';
import ImageWrapper from '../../Global/Image/ImageWrapper';


import './index.scss';

const PreviewCtaBlock = ({ block }) => {
  const [open, setOpen] = useState(1)
  const { title, description, backgroundImage, backgroundColor, ctas = [] } = block;

  const handleClicksAcord = (e) => {
    if(e == open){
      setOpen(null)
    }else{
      setOpen(e)
    }
  }
  return (
    <>
    
      <div
        className={`preview-cta-block section-${backgroundColor}`}
        style={{ backgroundImage: `url(${backgroundImage?.url})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              {title && <h1>{title}</h1>}
              {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
            </div>

            
          </div>
        </div>
      </div>
      <div className="container acordions-login pt-2 pt-lg-5 pb-5">
        <div className="row justify-content-center">

          {isArray(ctas) && (
              <div className="col-lg-6">
                  <div className="ctas">
                    {ctas.map((cta, i) => (
                       
                      <div key={i} className={`item-acord ${open == i ? 'open': ''}`} onClick={() => handleClicksAcord(i)}>
                        <div className="title-acord-item">{ cta.title }</div>
                        <div className="content">
                          <a href={cta.url?.url}>
                            <ImageWrapper image={cta?.image} />
                          </a>
                        </div>
                        
                      </div>
                      // <div className="input-cta">
                      //   <input
                      //     type="radio"
                      //     id={cta.id}
                      //     name="link_to"
                      //     value={cta.url?.url}
                      //     onChange={(event) => setSelectedCta(event.target.value)}
                      //   />

                      //   <label for={cta.id} dangerouslySetInnerHTML={{ __html: cta.title }} />
                      //   <div className="extra-information" dangerouslySetInnerHTML={{ __html: cta.description }} />
                      // </div>
                    ))}
                  </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default PreviewCtaBlock;

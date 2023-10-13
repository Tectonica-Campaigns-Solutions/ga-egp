import React, { useState } from 'react';
import { isArray } from '../../../utils';
import ImageWrapper from '../../Global/Image/ImageWrapper';


import './index.scss';

const PreviewCtaBlock = ({ block }) => {
  const [open, setOpen] = useState(null)
  const { title, description, backgroundImage, backgroundColor, accordionItemsCta = [] } = block;

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
      <div className="container acordions-login pt-3 pt-lg-5 pb-5">
        <div className="row justify-content-center">

          {isArray(accordionItemsCta) && (
              <div className="col-lg-6">
                  <div className="ctas">
                    {accordionItemsCta.map((cta, i) => (
                       
                      <div key={i} className={`item-acord ${open == i ? 'open': ''}`} onClick={() => handleClicksAcord(i)}>
                        <div className="title-acord-item">{ cta.title }</div>
                        <div className="content">
                          {
                              cta.cta.map(el => <a href={el.url?.url}>
                                <ImageWrapper image={el?.image} />
                              </a>)
                          }
                        </div>
                        
                      </div>
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

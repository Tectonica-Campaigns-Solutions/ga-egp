import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Button from '../Button/Button';
import ImageWrapper from '../Image/ImageWrapper';
import Link from '../Link';

import * as styles from './herocustom.module.scss'

function HeroCustom({ title, ctas=null, imageHeader=null, description= null, context = null, location = null, date = null, isDetailView = false, parentTitle = null }) {
  console.log(ctas)
  return (
    <div className={ styles.heroCustom}>
      <div>
        <div className="container">
          <Breadcrumb
            items={[
              { title: 'Home', slug: '1' },
              { title: 'Positions', slug: '2' },
              { title: 'Another link', slug: '2' },
              { title: 'Extra link', slug: '2' },
            ]}
          />
        </div>

        <div>
          <ImageWrapper image={imageHeader} />
          <div className="container">
            <div className="row">
              <div className={ctas && ctas.length > 0 ? 'col-lg-6' : 'col-12'}>
                {date && <div className="date">{date}</div>}
                {parentTitle && <h2>{parentTitle}</h2>}
                {!parentTitle && <h1 className={`${isDetailView ? 'sm' : ''}`}>{title}</h1>}
                <div className={styles.intro} dangerouslySetInnerHTML={{ __html: description }} />
              </div>
             
           
                  {
                  ctas && <div className="col-lg-6">
                    { ctas.map(item => <div>{item.title} {item.url} {item.description}</div>)}
                  </div>
                }
              
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCustom;

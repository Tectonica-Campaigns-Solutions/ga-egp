import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import DonationLink from '../../Blocks/BlockDonation/DonationLink';
import RadioInput from '../Form/RadioInput';
import toggleIcon from '../../Icons/cta-vector.svg';

import * as styles from './herocustom.module.scss';

function HeroCustom({
  title,
  ctas = null,
  extraCtas = null,
  imageHeader = null,
  description = null,
  date = null,
  isDetailView = false,
  parentTitle = null,
  breadcrumb = null,
  bgColor = null,
  overlap = false,
}) {
  const [donationType, setDonationType] = useState('payment');
  const [moreAmountsToggle, setMoreAmountsToggle] = useState(false);

  return (
    <div
      className={`${styles.heroCustom} section-${bgColor} ${overlap ? 'withOverlap' : ''}`}
      style={{ backgroundImage: `url(${imageHeader?.url})` }}
    >
      <div>
        {breadcrumb && (
          <div className="container">
            <Breadcrumb items={breadcrumb} textWhite bgPink={bgColor === 'pink'} />
          </div>
        )}

        <div>
          <div className="container">
            <div className="row">
              <div className={ctas && ctas.length > 0 ? 'col-lg-6' : 'col-12'}>
                {date && <div className="date">{date}</div>}
                {parentTitle && <h2>{parentTitle}</h2>}
                {!parentTitle && <h1 className={`${isDetailView ? 'sm' : ''}`}>{title}</h1>}

                {description && (
                  <div
                    className={`${styles.description} link-and-list-styles`}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </div>

              {ctas && ctas.length > 0 && (
                <div className={`col-lg-5 offset-lg-1`}>
                  <div className={`${styles.ctasBox}`}>
                    <h5>How much will you give?</h5>

                    <div className={`${styles.inputs}`}>
                      <RadioInput
                        name="donationType"
                        value={donationType}
                        onChange={(e) => setDonationType(e.target.value)}
                        options={[
                          {
                            label: 'Once',
                            value: 'payment',
                          },
                          {
                            label: 'Monthly',
                            value: 'subscription',
                          },
                        ]}
                      />
                    </div>

                    <div className={`${styles.ctaGrid}`}>
                      {ctas.map((item, index) => {
                        if (item.__typename == 'DatoCmsCtaDonation' && donationType == item.donationType) {
                          return <DonationLink item={item} key={`${item.url?.label}-${index}`} />;
                        }
                      })}
                    </div>

                    {extraCtas && (
                      <div>
                        <h6
                          className={`${moreAmountsToggle ? styles.hOpen : ''}`}
                          onClick={() => setMoreAmountsToggle((prev) => !prev)}
                        >
                          more amounts
                          <img src={toggleIcon} alt="Collapse icon" />
                        </h6>

                        <div
                          className={`${styles.ctaGrid} ${styles.extraCtas} ${moreAmountsToggle ? styles.open : ''}`}
                        >
                          {extraCtas.map((item, index) => {
                            if (item.__typename == 'DatoCmsCtaDonation' && donationType == item.donationType) {
                              return <DonationLink item={item} key={`${item.url?.label}-${index}`} />;
                            }
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCustom;

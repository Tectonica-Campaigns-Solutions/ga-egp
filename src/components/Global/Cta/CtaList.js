import React from 'react';
import Cta from './Cta';
import { getCtaTitle, getCtaUrl } from '../../../utils';

import * as styles from './cta.module.scss';

const CtaList = ({ ctas, whiteVariant = false }) => {
  return (
    <div className={styles.ctas}>
      {ctas.map((cta, index) => (
        <Cta
          key={index}
          url={getCtaUrl(cta)}
          label={getCtaTitle(cta)}
          isButton={cta.isButton}
          customVariant={whiteVariant && !cta.isButton && 'white'}
        />
      ))}
    </div>
  );
};

export default CtaList;

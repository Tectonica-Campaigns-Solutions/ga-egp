import * as React from 'react';
import { isArray } from '../../../utils';
import SocialLink from '../../Global/SocialLink/SocialLink';

const SocialGrid = ({ block }) => {
  const { title, items = [], smallIcons = false } = block;

  return (
    <section className="mt-5">
      {title && <h3>{title}</h3>}

      {/* Social links */}
      <div className="row gap-3 mb-5">
        {isArray(items) &&
          items.map((link) => (
            <div className="col-lg-5" key={link.id}>
              <SocialLink url={link.url} name={link.socialNetwork} title={link.title} smallIcons={smallIcons} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default SocialGrid;

import React from 'react';
import { Link } from 'gatsby';

import './index.scss';

function BlockDonation({ block }) {
  return (
    <div className="block-donation">
      <div className="container">
        <div className="main-content">
          <h2>{block.title}</h2>

          {block.cta && (
            <div className="cta-list">
              {block.cta.map((item) => (
                <div className="cta-item">
                  <Link to={item.url}>{item.label}</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {block.backgroundImage?.url && (
          <img
            className="flowers"
            src={block.backgroundImage.url}
            alt={block.backgroundImage.alt || 'Sunflower image'}
          />
        )}
      </div>
    </div>
  );
}

export default BlockDonation;

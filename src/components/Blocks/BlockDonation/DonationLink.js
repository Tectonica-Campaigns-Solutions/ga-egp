import React from 'react';
import './index.scss';

const DonationLink = ({ item }) => {
  return (
    <div className={`donation-link d-flex align-items-center`}>
      <a className="cta-item" href={`/.netlify/functions/checkout?priceid=${item.priceId}`}>
        {item.amount}
      </a>
    </div>
  );
};

export default DonationLink;

import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Link from '../Link';
import EGPMap from '../EGPMap/EGPMap';

function FilterMembers({ members, introduction }) {
  const handleOnClickCountry = (e) => {
    const countryId = e.target?.id;

    if (!countryId) {
      console.warn('No country found.');
      return;
    }

    const currentUrl = window.location.pathname;

    // Navigate to country page
    navigate(currentUrl + countryId);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4">
          <div dangerouslySetInnerHTML={{ __html: introduction }} />
          {members.map((item) => {
            return (
              <div>
                <Link to={item.node.slug}>{item.node.title}</Link>
              </div>
            );
          })}
        </div>

        <div className="col-lg-8">
          <EGPMap handleOnClickCountry={handleOnClickCountry} />
        </div>
      </div>
    </div>
  );
}

export default FilterMembers;

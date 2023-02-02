import React from 'react';
import { navigate } from 'gatsby';
import Link from '../Link';
import EGPMap from '../EGPMap/EGPMap';
import { isArray } from '../../../utils';

import './index.scss';

function FilterMembers({ members, introduction }) {
  const handleOnClickCountry = (e) => {
    const countryId = String(e.target?.id).toLowerCase();

    if (!countryId) {
      console.warn('No country found.');
      return;
    }

    const currentUrl = window.location.pathname;

    // Navigate to country page
    navigate(currentUrl + countryId);
  };

  return (
    <div className="filter-members mb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="intro" dangerouslySetInnerHTML={{ __html: introduction }} />

            {isArray(members) && (
              <ul>
                {members.map((item) => {
                  return (
                    <li>
                      <Link to={item.node.slug}>{item.node.title}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="col-map">
        <EGPMap handleOnClickCountry={handleOnClickCountry} />
      </div>
    </div>
  );
}

export default FilterMembers;

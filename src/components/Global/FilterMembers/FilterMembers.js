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

  const isoCodes = Array.from(new Set(members.map((m) => m.node.slug)));

  const handleOnChangeSelect = (e) => {
    const countryId = e.target.value;
    const currentUrl = window.location.pathname;
    navigate(currentUrl + countryId);
  };

  return (
    <div className="filter-members mb-5">
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div className="intro link-and-list-styles" dangerouslySetInnerHTML={{ __html: introduction }} />

            {isArray(members) && (
              <ul className="desktop-items">
                {members.map((item) => {
                  return (
                    <li key={item.node.id}>
                      <Link to={item.node.slug}>{item.node.title}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="col-xl-6 col-7 ">
            <div className="col-map mobile-map">
              <EGPMap handleOnClickCountry={handleOnClickCountry} isoCodes={isoCodes} />
            </div>
          </div>
        </div>

        {/* Mobile map */}
        <div className="row mobile-container">
          {isArray(members) && (
            <div className="col-12">
              <h3>Select a country to see Member Parties list</h3>
              <select className="mobile-items" onChange={handleOnChangeSelect}>
                <option>Choose an option</option>

                {members.map((item) => {
                  return (
                    <option key={item.node.id} value={item.node.slug}>
                      {item.node.title}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterMembers;

import React from 'react';
import Link from '../Link';
import { isArray } from '../../../utils';

const FooterGroupLinks = ({ item }) => {
  const { label, childrenLinks } = item;
  return (
    <div className="group-links">
      <h4>{label}</h4>
      {childrenLinks && (
        <div className="links">
          <ul>
            {childrenLinks.map((item) => (
              <li key={item.id}>
                <Link to={item.link}>{item.label ? item.label : item.link.label }</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FooterGroupLinks;

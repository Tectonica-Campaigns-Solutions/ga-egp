import React from 'react';
import Link from '../Link';
import { isArray } from '../../../utils';

const FooterGroupLinks = ({ item }) => {
  const { id, label, links } = item;

  return (
    <div className="group-links">
      <h4>{label}</h4>

      {isArray(links) && (
        <div className="links">
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <Link to={link}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // return (
  //   <div
  //     className={`col-md col-sm-6 mb-4 mb-md-0 ct-footer-links ${
  //       isButton
  //         ? "is-button d-flex justify-content-lg-end justify-content-sm-start align-items-start"
  //         : ""
  //     }`}
  //     key={item.id}
  //   >
  //     {item.label && (
  //       <>
  //         <h3>{item.label}</h3>
  //         <Divider />
  //       </>
  //     )}

  //     {item.mainLink && (
  //       <Link to={item.mainLink} className={isButton ? "btn btn-primary" : ""}>
  //         {item.label ? item.label : item.mainLink.label}
  //       </Link>
  //     )}

  //     {isArray(item.links) && (
  //       <ul>
  //         {item.links.map((link) => (
  //           <li key={link.id}>
  //             <Link to={link} className={isButton ? "btn btn-primary" : ""}>
  //               {link.label}
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
};

export default FooterGroupLinks;

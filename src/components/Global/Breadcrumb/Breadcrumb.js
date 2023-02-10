// import React from 'react';
// import Link from '../Link';
// import { isArray } from '../../../utils';

// import * as styles from './breadcrumb.module.scss';

// const Breadcrumb = ({ items }) => {
//   if (!isArray(items)) return null;

//   const isActiveLink = false;

//   const renderSeparator = (index) => {
//     if (index === 0) {
//       return null;
//     }
//     return <span>/</span>;
//   };

//   const findNodeById = (nodes, id) => {
//     for (const node of nodes) {
//       if (node.id === id) return node;

//       const { treeChildren } = node;

//       if (treeChildren) {
//         const nodeFound = findNodeById(treeChildren, id);
//         if (nodeFound) return nodeFound;
//       }
//     }
//   };

//   return (
//     <div className={styles.egpBreadcrumb}>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>
//             <Link to={item.slug} className={`${isActiveLink ? 'active' : ''}`}>
//               {renderSeparator(index)}
//               {item.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Breadcrumb;

import React from 'react';
import Link from '../Link';
import { isArray, findSiblingsMenu } from '../../../utils';
import { StaticQuery, graphql } from "gatsby"

import * as styles from './breadcrumb.module.scss'

const Breadcrumb = ({ items }) => {

  //TODO get all treeparent in array and reverse to pass to breadcrum component
  console.log(items)

  if (!items.treeParent) return null;

  const isActiveLink = false;

  const renderSeparator = (index) => {
    if (index === 0) {
      return null;
    }
    return <span>/</span>;
  };

  return (
    <div className={styles.egpBreadcrumb}>
      holaa
      <ul>
        {/* {items.map((item, index) => (
          <li key={index}>
            <Link  to={item.slug} className={`${isActiveLink ? 'active' : ''}`}>
              {renderSeparator(index)}
              {item.title}
            </Link>
          </li>
        ))} */}
      </ul>
    </div>
  );

};

export default Breadcrumb;




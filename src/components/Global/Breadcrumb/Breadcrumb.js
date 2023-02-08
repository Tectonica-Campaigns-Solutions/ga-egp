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

const PrintBreadcrumb = ({ items, currentId }) => {

  const findNodeById = (items, currentId) => {
    for (const node of items) {
      if (node?.content?.id === currentId) return node;

      const { treeChildren } = node;

      if (treeChildren) {
        const nodeFound = findNodeById(treeChildren, currentId);
        if (nodeFound) return nodeFound;
      }
    }
  };

  const itemsBreadcrumb = findNodeById(items, currentId);
  console.log(itemsBreadcrumb)

  return ( 
    <div>Breadcrumb</div>
    // <div className={styles.egpBreadcrumb}>
    //   <ul>
    //     <li><Link>{ itemsBreadcrumb.treeParent.title}</Link></li> / 
    //     <li className={styles.currentActive}>{itemsBreadcrumb.title}</li>
    //   </ul>
    //   {/* <ul>
    //     { itemsBreadcrumb.map((item, index) => <li key={index}>{ item.title }</li>) }
    //   </ul> */}
    // </div>
    // <div>Hola</div>
  )
}

const Breadcrumb = ({ currentId }) => {
  return (
    <StaticQuery
        query={graphql`
          query {
            allDatoCmsMenu(filter: { root: { eq: true } }) {
              nodes {
                title
                url
                content{
                  ... on DatoCmsPage{
                    id
                  }
                  ...on DatoCmsListNews{
                    id
                  }
                  ...on DatoCmsListEvent{
                    id
                  }
                  ... on DatoCmsListMember{
                    id
                  }
                  ...on DatoCmsListPosition{
                    id
                  }
                }
                treeChildren{
                  title
                  treeParent{
                    title
                    content{
                      
                      ... on DatoCmsPage{
                        id
                        slug
                      }
                      ...on DatoCmsListNews{
                        id
                        slug
                      }
                      ...on DatoCmsListEvent{
                        id
                        slug
                      }
                      ... on DatoCmsListMember{
                        id
                        slug
                      }
                      ...on DatoCmsListPosition{
                        id
                        slug
                      }
                    }
                    treeChildren{
                      treeParent{
                        content{
                          __typename
                          ... on DatoCmsPage{
                            id
                          }
                          ...on DatoCmsListNews{
                            id
                          }
                          ...on DatoCmsListEvent{
                            id
                          }
                          ... on DatoCmsListMember{
                            id
                          }
                          ...on DatoCmsListPosition{
                            id
                          }
                        }
                      }
                      content{
                        __typename
                      }
                    }
                  }
                  content{
                    ... on DatoCmsPage{
                      slug
                      id
                    }
                  }
                }
            }
        }
          }
        `}
        render={data => (
         <PrintBreadcrumb items={data.allDatoCmsMenu.nodes} currentId={currentId} /> 
        )}
        />
  )
  // if (!isArray(items)) return null;

  // const isActiveLink = false;

  // const renderSeparator = (index) => {
  //   if (index === 0) {
  //     return null;
  //   }
  //   return <span>/</span>;
  // };

  // return (
  //   <div className={styles.egpBreadcrumb}>
  //     <ul>
  //       {items.map((item, index) => (
  //         <li key={index}>
  //           <Link  to={item.slug} className={`${isActiveLink ? 'active' : ''}`}>
  //             {renderSeparator(index)}
  //             {item.title}
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  //);

};

export default Breadcrumb;




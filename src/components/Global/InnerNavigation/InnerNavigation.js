import * as React from "react";
import { useStaticQuery } from "gatsby";
import { graphql } from "gatsby";

const InnerNavigation = ({ location }) => {
  const innerMenu = useStaticQuery(graphql`
    query {
      datoCmsNavigation(codeId: { eq: "inner_navigation" }) {
        ...Navigation
      }
    }
  `);
  const navLinks = innerMenu.datoCmsNavigation.navigationItems;
  return (
    <div className="my-5">
      {

      navLinks.map(item => <div>{ item.label }</div> )
      }

    </div>
  )

    

};

export default InnerNavigation;
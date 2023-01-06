import * as React from 'react';
import Nav from './Global/Nav/Nav';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';

const Header = ({ location }) => {
  const mainMenu = useStaticQuery(graphql`
    query {
      datoCmsNavigation(codeId: { eq: "main_menu" }) {
        ...Navigation
      }
    }
  `);

  return (
    <header>
      <Nav navData={mainMenu} path={location?.pathname} />
    </header>
  );
};

export default Header;

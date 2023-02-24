import * as React from 'react';
import { useState } from 'react';
import Nav from './Global/Nav/Nav';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import SearchEngine from './Global/Search/SearchEngine';

const Header = ({ location, navbarWhite = false }) => {
  const [searchEngineVisible, setSearchEngineVisible] = useState(false);

  const mainMenu = useStaticQuery(graphql`
    query {
      allDatoCmsMenu(filter: { root: { eq: true } }) {
        nodes {
          ...MainNavigation
        }
      }
    }
  `);

  return (
    <header>
      <SearchEngine searchEngineVisible={searchEngineVisible} setSearchEngineVisible={setSearchEngineVisible} />

      <Nav
        navData={mainMenu}
        navbarWhite={navbarWhite}
        path={location?.pathname}
        setSearchEngineVisible={setSearchEngineVisible}
      />
    </header>
  );
};

export default Header;

import * as React from 'react';
import { useState } from 'react';
import Nav from './Global/Nav/Nav';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import SearchEngine from './Global/Search/SearchEngine';

const Header = ({ location, navbarWhite = false, navbarYellowHover = false, hideLinks = false }) => {
  const [searchEngineVisible, setSearchEngineVisible] = useState(false);

  const mainMenu = useStaticQuery(graphql`
    query {
      allDatoCmsMenu(filter: { root: { eq: true } }, sort: { position: ASC }) {
        nodes {
          ...MainNavigation
        }
      }
    }
  `);

  return (
    <header data-datocms-noindex className="position-relative">
      <SearchEngine searchEngineVisible={searchEngineVisible} setSearchEngineVisible={setSearchEngineVisible} />

      <Nav
        navData={mainMenu}
        navbarWhite={navbarWhite}
        navbarYellowHover={navbarYellowHover}
        location={location}
        setSearchEngineVisible={setSearchEngineVisible}
        hideLinks={hideLinks}
      />
    </header>
  );
};

export default Header;

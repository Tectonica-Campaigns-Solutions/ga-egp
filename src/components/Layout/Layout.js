import * as React from 'react';
import { Slice } from 'gatsby';
import PropTypes from 'prop-types';
import TopMessage from '../Global/TopMessage/TopMessage';

import '../../styles/main.scss';
import SearchEngine from '../Global/Search/SearchEngine';

const Layout = ({ navbarWhite = false, location, children }) => {
  return (
    <>
      <TopMessage />
      <SearchEngine />
      <Slice alias="header" location={location} navbarWhite={navbarWhite} />
      <main>{children}</main>
      <Slice alias="footer" />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

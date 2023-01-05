import * as React from 'react';
import { Slice } from 'gatsby';
import PropTypes from 'prop-types';
import TopMessage from '../Global/TopMessage/TopMessage';

import '../../styles/main.scss';

const Layout = ({ location, children }) => {
  return (
    <>
      <TopMessage />
      <Slice alias="header" location={location} />
      <main>{children}</main>
      <Slice alias="footer" />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

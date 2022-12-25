import * as React from 'react';
import PropTypes from 'prop-types';
import TopMessage from './Global/TopMessage/TopMessage';
import Header from './Header';
import Footer from './Global/Footer/Footer';

import '../styles/main.scss';

const Layout = ({ location, children }) => {
  return (
    <>
      <TopMessage />
      <Header location={location} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

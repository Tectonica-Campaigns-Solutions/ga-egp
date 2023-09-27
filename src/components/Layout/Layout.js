import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TopMessage from '../Global/TopMessage/TopMessage';
import Header from '../Header';
import Footer from '../Global/Footer/Footer';

import '../../styles/main.scss';

const Layout = ({ navbarWhite = false, navbarYellowHover = false, location, children }) => {

  useEffect(() => {
    const trackingHubspot = document.createElement('script');
    trackingHubspot.id = 'hs-script-loader';
    trackingHubspot.src = 'https://js-eu1.hs-scripts.com/26289884.js';
    document.body.appendChild(trackingHubspot);
  })
  return (
    <>
      <TopMessage />
      <Header location={location} navbarWhite={navbarWhite} navbarYellowHover={navbarYellowHover} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

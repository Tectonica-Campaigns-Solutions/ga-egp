import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TopMessage from '../Global/TopMessage/TopMessage';
import Header from '../Header';
import Footer from '../Global/Footer/Footer';

import '../../styles/main.scss';

const Layout = ({
  navbarWhite = false,
  navbarYellowHover = false,
  location,
  children,
  hideLinks = false,
  hideFooter = false,
}) => {
  useEffect(() => {
    const trackingHubspot = document.createElement('script');
    trackingHubspot.id = 'hs-script-loader';
    trackingHubspot.src = 'https://js-eu1.hs-scripts.com/26289884.js';
    document.body.appendChild(trackingHubspot);

    const titoCode = document.createElement('script');
    titoCode.src = 'https://js.tito.io/v2/with/inline/without/widget-css';
    document.body.appendChild(titoCode);
  });

  return (
    <>
      <TopMessage />
      <Header
        location={location}
        navbarWhite={navbarWhite}
        navbarYellowHover={navbarYellowHover}
        hideLinks={hideLinks}
      />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

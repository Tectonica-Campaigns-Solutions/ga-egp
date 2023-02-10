import React, { useState, useEffect } from 'react';
import Link from '../Link';
import logo from '../../Icons/logo.svg';
import searchIcon from '../../Icons/icons-search.svg';
import userIcon from '../../Icons/icons-user.svg';

import './index.scss';

const LinkItem = ({ link, label, isButton }) => {
  return (
    <li className="nav-item">
      <Link to={link} className={isButton ? 'btn btn-primary' : ''}>
        {label}
      </Link>
    </li>
  );
};

const DropdownItem = ({ link, label, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mouseEnter = () => {
    setDropdownOpen(true);
  };

  const mouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <li className="dropdown nav-item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <Link to={link} type="button" aria-label="Expand" aria-expanded="false" data-bs-toggle="dropdown">
        {label}
      </Link>

      <ul className={`dropdown-menu ${dropdownOpen ? 'open' : null}`}>
        {children?.map((link) => (
          <li className="dropdown-item" key={link?.id}>
            <Link className="dropdown-link" to={link.content.slug}>
              {link?.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default function Nav({ navData, path }) {
  // data
  const navLinks = navData.allDatoCmsMenu.nodes;
  // // Use States --------
  const [expanded, setExpanded] = useState(false);
  // // Sticky Nav handlers are here
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const position = window.pageYOffset;
      setScrollPosition(position);
    }
  };

  // Use effect for sticky nav
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Event Handlers -----
  const handleNavClick = () => {
    setExpanded(!expanded);
  };

  const isHome = !path || path === '/';

  return (
    <nav
      className={`navbar navbar-expand-lg ${isHome ? 'home-nav' : ''} ${expanded ? 'expanded' : ''} ${
        scrollPosition > 75 ? 'sticky-nav' : ''
      }`}
    >
      <Link className="navbar-brand" to={'/'}>
        <img src={logo} alt="EGP Logo" />
      </Link>

      <button
        type="button"
        data-target="#navNav"
        aria-expanded="false"
        aria-controls="navNav"
        data-toggle="collapse"
        className="navbar-toggler"
        aria-label="Toggle navigation"
        onClick={() => handleNavClick()}
      >
        <span className={`${expanded ? 'open-toggle ' : ''} navbar-toggler-icon`} />
      </button>

      <div className={` ${expanded ? 'show' : ''} collapse navbar-collapse egp-nav`} id="navNav">
        <ul className="navbar-nav mr-auto">
          {navLinks?.map((link, index) =>
            link.treeChildren.length === 0 ? (
              <LinkItem key={index} link={link?.content.slug} label={link?.title} isButton={link?.isButton} />
            ) : (
              <DropdownItem key={index} link={link?.content?.slug} label={link?.title} children={link?.treeChildren} />
            )
          )}

          {/* Final icons */}
          <div className="nav-actions">
            <Link to="">
              <img src={searchIcon} alt="" />
            </Link>
            <Link to="">
              <img src={userIcon} alt="" />
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
}

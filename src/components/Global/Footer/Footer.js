import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby-link";
import { isArray, getCtaUrl } from "../../../utils";
import FooterGroupLinks from "./FooterGroupLinks";
import logoCorner from "../../Icons/footer_logo_corner.svg";
import sunflower from "../../Icons/footer_sunflower.svg";

import "./index.scss";

function Footer() {
  const {
    menuFooter,
    menuLegal,
    partnersFooter,
    information,
    copyright,
    email,
    phone,
    address,
    socialLinks,
  } = useStaticQuery(graphql`
    query footer {
      menuFooter: datoCmsNavigation(codeId: { eq: "menu_footer" }) {
        ...Navigation
      }
      menuLegal: datoCmsNavigation(codeId: { eq: "menu_legal" }) {
        ...Navigation
      }
      partnersFooter: datoCmsNavigation(codeId: { eq: "our_partners" }) {
        title
        ...Navigation
      }
      information: datoCmsGlobalSetting(codeId: { eq: "information_gs" }) {
        value
        image {
          url
        }
      }
      copyright: datoCmsGlobalSetting(codeId: { eq: "copyright_gs" }) {
        value
      }
      email: datoCmsGlobalSetting(codeId: { eq: "email_gs" }) {
        value
      }
      phone: datoCmsGlobalSetting(codeId: { eq: "phone_gs" }) {
        value
      }
      address: datoCmsGlobalSetting(codeId: { eq: "address_gs" }) {
        value
      }
      socialLinks: datoCmsSocialFollow {
        title
        links {
          label
          mainLink {
            url
          }
          icon {
            url
          }
        }
      }
    }
  `);

  console.log({ socialLinks });

  return (
    <footer className="footer">
      <div className="container">
        {/* First row */}
        <div className="row">
          <div className="col-lg-8">
            {/* Partners section */}
            <div className="row">
              <div className="col partners">
                <h3>{partnersFooter.title}</h3>

                {isArray(partnersFooter.navigationItems) && (
                  <div className="partners-list">
                    {partnersFooter.navigationItems.map((partner) => (
                      <Link to={getCtaUrl(partner.mainLink)}>
                        <img src={partner.icon.url} alt={partner.label} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Links section */}
            {isArray(menuFooter.navigationItems) && (
              <div className="row">
                {menuFooter.navigationItems.map((navItem) => (
                  <div className="col-lg-3">
                    <FooterGroupLinks item={navItem} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hubspot form */}
          <div className="col-lg-3 offset-lg-1">Form here</div>
        </div>

        {/* Second row */}
        <div className="row" style={{ marginTop: "78px" }}>
          <div className="col-lg-8">
            {/* Copyright section */}
            <div className="row align-items-end">
              <div className="col-lg-6 copyright">
                <div className="content">
                  <p>{copyright.value}</p>
                  <p>{address.value}</p>
                  <p>{phone.value}</p>
                  <p>{email.value}</p>
                </div>
              </div>

              {/* Support section */}
              <div className="col-lg-5 support">
                <div className="content">
                  {information.image.url && (
                    <div className="image">
                      <img src={information.image.url} alt="Logo" />
                    </div>
                  )}
                  <p>{information.value}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social links here */}
          {isArray(socialLinks.links) && (
            <div className="col-lg-3 offset-lg-1 social-links">
              {socialLinks.links.map((socialLink) => (
                <Link to={getCtaUrl(socialLink.mainLink)}>
                  <img src={socialLink.icon.url} alt={socialLink.label} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Third row - Legal menu */}
        {isArray(menuLegal.navigationItems) && (
          <div className="row" style={{ marginTop: "60px" }}>
            <div className="col-lg">
              <div className="bottom-links">
                {menuLegal.navigationItems.map((navItem) => (
                  <Link to={getCtaUrl(navItem.mainLink)}>{navItem.label}</Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assets styles */}
      <img src={logoCorner} alt="Logo bottom corner" className="logo-corner" />
      <img src={sunflower} alt="Sunflower bottom" className="sunflower" />
    </footer>
  );
}

export default Footer;

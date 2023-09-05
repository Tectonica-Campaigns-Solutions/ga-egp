import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Link from '../Link';
import { isArray, getCtaUrl } from '../../../utils';
import FooterGroupLinks from './FooterGroupLinks';
import TextHubspotForm from '../../Blocks/TextHubspotForm/TextHubsportForm';

import './index.scss';

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
    formFooter,
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
      formFooter: datoCmsFormFooter {
        title
        id
        hubspot {
          ... on DatoCmsHubspot {
            formId
            region
            portalId
          }
        }
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

  return (
    <footer className="footer" data-datocms-noindex>
      <div className="container">
        {/* First row */}
        <div className="row">
          <div className="col-xxl-8 col-xl-7">
            {/* Partners section */}
            <div className="row">
              <div className="col partners">
                <h3>{partnersFooter.title}</h3>

                {isArray(partnersFooter.navigationItems) && (
                  <div className="partners-list">
                    {partnersFooter.navigationItems.map((partner) => (
                      <Link key={partner.id} to={getCtaUrl(partner.mainLink)}>
                        <img src={partner.icon.url} alt={partner.label} loading="lazy" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Links section */}
            {isArray(menuFooter.navigationItems) && (
              <div className="row gy-4">
                {menuFooter.navigationItems.map((navItem) => (
                  <div key={navItem.id} className="col-lg-3 col-md-6 col-6 mb-sm-4 mb-0">
                    <FooterGroupLinks item={navItem} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hubspot form */}
          <div className="col-xxl-3 col-xl-4 offset-xxl-1 form-footer">
            {formFooter && formFooter.hubspot && <TextHubspotForm block={formFooter} />}
          </div>
        </div>

        {/* Second row */}
        <div className="row mt-5">
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
                <Link key={socialLink.label} to={socialLink.mainLink} target="_blank">
                  <img src={socialLink.icon?.url} alt={socialLink.label} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Third row - Legal menu */}
        {isArray(menuLegal.navigationItems) && (
          <div className="row mt-5">
            <div className="col-lg">
              <div className="bottom-links">
                {menuLegal.navigationItems.map((navItem) => (
                  <Link key={navItem.label} to={getCtaUrl(navItem.mainLink)}>
                    {navItem.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;

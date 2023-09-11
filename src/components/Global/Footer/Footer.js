import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Link from '../Link';
import { isArray, getCtaUrl } from '../../../utils';
import FooterGroupLinks from './FooterGroupLinks';
import TextHubspotForm from '../../Blocks/TextHubspotForm/TextHubsportForm';

import './index.scss';

function Footer() {
  const { menuFooter, menuLegal, partnersFooter, footer } = useStaticQuery(graphql`
    query footer {
      footer: datoCmsFooterSetting {
        address
        support
        title
        footerForm {
          ... on DatoCmsHubspot {
            formId
            region
            portalId
          }
        }
        supportLogo {
          url
          gatsbyImageData
          alt
        }
        socialLinks {
          label
          mainLink {
            url
          }
          icon {
            url
          }
        }
      }
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
    }
  `);

  const formBlock = { hubspot: footer.footerForm, title: footer.title, id: '100' };

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
                      <Link key={partner.id} to={partner.mainLink?.url ?? ''} target="_blank">
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
            {formBlock && <TextHubspotForm block={formBlock} />}
          </div>
        </div>

        {/* Second row */}
        <div className="row mt-5">
          <div className="col-lg-8">
            {/* Copyright section */}
            <div className="row align-items-end">
              <div className="col-lg-6 copyright">
                <div className="content">
                  <div dangerouslySetInnerHTML={{ __html: footer.address }} />
                </div>
              </div>

              {/* Support section */}
              <div className="col-lg-5 support">
                <div className="content">
                  {footer.supportLogo && (
                    <div className="image">
                      <img src={footer.supportLogo.url} alt="Logo" />
                    </div>
                  )}
                  <p>{footer.support}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social links here */}
          {isArray(footer.socialLinks) && (
            <div className="col-lg-3 offset-lg-1 social-links">
              {footer.socialLinks.map((socialLink) => (
                <Link key={socialLink.label} to={socialLink.mainLink?.url ?? ''} target="_blank">
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
                  <Link
                    key={navItem.label}
                    to={getCtaUrl(navItem.mainLink) ?? navItem.mainLink?.url ?? ''}
                    target={navItem.mainLink?.url ? '_blank' : ''}
                  >
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

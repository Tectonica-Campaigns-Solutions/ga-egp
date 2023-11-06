import React, { useState } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/SeoDatoCms';

import './subscription.scss';

const UnsubscriptionPage = ({ data: { favicon, siteTitle } }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSavePreferences = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/unsub-all`, { email: email });
      setIsSuccess(response.status === 200);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideLinks hideFooter>
      <SeoDatoCMS favicon={favicon} siteTitle={siteTitle}>
        <title>Unsubscription | European Greens</title>
        <meta property="og:site_name" content="Unsubscription"></meta>
      </SeoDatoCMS>

      {isSuccess ? (
        <div className="success">
          <div className="container">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
                <g clipPath="url(#clip0_4892_25916)">
                  <mask id="mask0_4892_25916" maskUnits="userSpaceOnUse" x="16" y="16" width="44" height="44">
                    <path d="M59.2 16.1454H16.1455V59.1999H59.2V16.1454Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_4892_25916)">
                    <path
                      d="M54.9582 23.6004L31.8737 46.6848L20.3874 35.1985C19.9379 34.7489 19.317 34.4708 18.6303 34.4708C17.2581 34.4708 16.1455 35.5834 16.1455 36.9556C16.1455 37.6423 16.4237 38.2631 16.8732 38.7127L30.1228 51.9499C30.5724 52.3994 31.1932 52.6788 31.8799 52.6788C32.5666 52.6788 33.1875 52.4007 33.637 51.9499L58.4724 27.1146C58.9219 26.665 59.2001 26.0442 59.2001 25.3575C59.2001 23.9853 58.0874 22.8727 56.7153 22.8727C56.0286 22.8727 55.4077 23.1508 54.9582 23.6004Z"
                      fill="#57B45F"
                    />
                  </g>
                  <path
                    d="M37.6727 73.5954C57.5123 73.5954 73.5954 57.5123 73.5954 37.6727C73.5954 17.8331 57.5123 1.75 37.6727 1.75C17.8331 1.75 1.75 17.8331 1.75 37.6727C1.75 57.5123 17.8331 73.5954 37.6727 73.5954Z"
                    stroke="#57B45F"
                    strokeWidth="3.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4892_25916">
                    <rect width="76" height="76" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <h1>{email || 'example@mail.com'}</h1>
            <p>Your email preferences were updated.</p>
          </div>
        </div>
      ) : (
        <div className="subscription-form unsub">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <h1>Unsubscribe from emails</h1>

                <form>
                  <p>
                    You'll be unsubscribed from all emails from test other than important account-related
                    correspondence.
                  </p>

                  <div className="sub-options">
                    <div className="sub-option-item">
                      <label htmlFor="email">Email address</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Button */}
                    <button className="submit-btn" type="submit" onClick={handleSavePreferences} disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'unsubscribe'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UnsubscriptionPage;

export const PageQuery = graphql`
  query Page {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
  }
`;

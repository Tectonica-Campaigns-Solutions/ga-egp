import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';
import Layout from '../components/Layout/Layout';

import './subscription.scss';

const SubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    marketingEmail: false,
    marketingStatutory: false,
    marketingEvents: false,
    serviceEmail: false,
    salesEmail: false,
    serviceEmailPrivacy: false,
    unsubAll: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window && localStorage.getItem('email')) {
      const emailSaved = localStorage.getItem('email');

      async function fetchContactData() {
        setIsLoading(true);

        try {
          const response = await axios.post(`/api/get-subscription-preferences`, {
            emailSaved: emailSaved,
          });

          const contactData = response.data;

          setPreferences({
            marketingEmail: contactData ? contactData.find((c) => c.id === '153977537').status === 'SUBSCRIBED' : false,
            marketingEvents: contactData
              ? contactData.find((c) => c.id === '239874603').status === 'SUBSCRIBED'
              : false,
            marketingStatutory: contactData
              ? contactData.find((c) => c.id === '238585646').status === 'SUBSCRIBED'
              : false,
            salesEmail: contactData ? contactData.find((c) => c.id === '165739283').status === 'SUBSCRIBED' : false,
            serviceEmail: contactData ? contactData.find((c) => c.id === '154225269').status === 'SUBSCRIBED' : false,
            serviceEmailPrivacy: contactData
              ? contactData.find((c) => c.id === '262959417').status === 'SUBSCRIBED'
              : false,
            unsubAll: false,
          });
        } catch (error) {
          console.error('Error al obtener los datos del contacto', error);
        } finally {
          setIsLoading(false);
        }
      }

      if (emailSaved) {
        setEmail(emailSaved);
        fetchContactData();
      }
    }
  }, []);

  const handleSavePreferences = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`/api/post-subscription-preferences`, {
        email: email,
        preferences: preferences,
      });
      setIsSuccess(response.status === 200);
      localStorage.setItem('email', email);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = (preferenceName, isChecked) => {
    if (isChecked) {
      setPreferences({
        ...preferences,
        unsubAll: false,
        [preferenceName]: true,
      });
    } else {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        [preferenceName]: false,
      }));
    }
  };

  const handleUnsubscribeAllChange = (isChecked) => {
    if (isChecked) {
      setPreferences({
        unsubAll: true,
        marketingEmail: false,
        marketingStatutory: false,
        marketingEvents: false,
        serviceEmail: false,
        salesEmail: false,
        serviceEmailPrivacy: false,
      });
    } else {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        unsubAll: false,
      }));
    }
  };

  return (
    <Layout hideLinks hideFooter>
      {isSuccess ? (
        <div className="success">
          <div className="container">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
                <g clip-path="url(#clip0_4892_25916)">
                  <mask
                    id="mask0_4892_25916"
                    // style="mask-type:luminance"
                    maskUnits="userSpaceOnUse"
                    x="16"
                    y="16"
                    width="44"
                    height="44"
                  >
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
                    stroke-width="3.5"
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
        <div className="subscription-form">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <h1>Update email preferences for</h1>

                <form onSubmit={handleSavePreferences}>
                  <input
                    name="email"
                    required={true}
                    placeholder="example@mail.com"
                    type="email"
                    inputMode="email"
                    className="main-input2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="sub-options">
                    <h3>Choose which emails you would like to receive:</h3>

                    <div className="sub-option-item">
                      <input
                        type="checkbox"
                        name="marketing-email"
                        id="marketing-email"
                        checked={preferences.marketingEmail}
                        onChange={(e) => handlePreferenceChange('marketingEmail', e.target.checked)}
                      />
                      <label htmlFor="marketing-email">
                        <span>Marketing Email | Marketing</span>
                        <span>Newsletter and email updates</span>
                      </label>
                    </div>

                    <div className="sub-option-item">
                      <input
                        type="checkbox"
                        name="marketing-statutory"
                        id="marketing-statutory"
                        checked={preferences.marketingStatutory}
                        onChange={(e) => handlePreferenceChange('marketingStatutory', e.target.checked)}
                      />
                      <label htmlFor="marketing-statutory">
                        <span>Marketing Email | Statutory</span>
                        <span>Emails about our statutory processes</span>
                      </label>
                    </div>

                    <div className="sub-option-item">
                      <input
                        type="checkbox"
                        name="marketing-events"
                        id="marketing-events"
                        checked={preferences.marketingEvents}
                        onChange={(e) => handlePreferenceChange('marketingEvents', e.target.checked)}
                      />
                      <label htmlFor="marketing-events">
                        <span>Marketing Email | Events</span>
                        <span>Emails about events you registered for</span>
                      </label>
                    </div>

                    <div className="sub-option-item">
                      <input
                        type="checkbox"
                        name="service-email"
                        id="service-email"
                        checked={preferences.serviceEmail}
                        onChange={(e) => handlePreferenceChange('serviceEmail', e.target.checked)}
                      />
                      <label htmlFor="service-email">
                        <span>Service Email | Service</span>
                        <span>Feedback requests and service information</span>
                      </label>
                    </div>

                    <div className="sub-option-item">
                      <input
                        type="checkbox"
                        name="sales-email"
                        id="sales-email"
                        checked={preferences.salesEmail}
                        onChange={(e) => handlePreferenceChange('salesEmail', e.target.checked)}
                      />
                      <label htmlFor="sales-email">
                        <span>Sales Email | One to one</span>
                        <span>One to one emails</span>
                      </label>
                    </div>

                    <div className="sub-option-item last">
                      <input
                        type="checkbox"
                        name="service-privacy"
                        id="service-privacy"
                        checked={preferences.serviceEmailPrivacy}
                        onChange={(e) => handlePreferenceChange('serviceEmailPrivacy', e.target.checked)}
                      />
                      <label htmlFor="service-privacy">
                        <span>Service Email | Privacy</span>
                        <span>Emails about privacy policy updates</span>
                      </label>
                    </div>

                    {/* UN-SUB ALL CHECK */}
                    <div className="unsub-check">
                      <input
                        type="checkbox"
                        name="unsub-all"
                        id="unsub-all"
                        checked={preferences.unsubAll}
                        onChange={(e) => handleUnsubscribeAllChange(e.target.checked)}
                      />
                      <label htmlFor="unsub-all">
                        <span>Unsubscribe from all emails</span>
                      </label>
                    </div>

                    {/* Button */}
                    <button className="submit-btn" type="submit" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'UPDATE EMAIL PREFERENCES'}
                    </button>
                  </div>
                </form>

                {error && <p>Error here</p>}

                <div className="info">
                  <p>
                    If this is not your address, an email was most likely forwarded to you from someone else and you can
                    safely ignore this message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SubscriptionPage;

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

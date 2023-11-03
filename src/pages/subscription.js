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

  useEffect(() => {
    if (window && localStorage.getItem('email')) {
      const emailSaved = localStorage.getItem('email');

      async function fetchContactData() {
        setIsLoading(true);

        try {
          const response = await axios.post(`/api/subscription`, {
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
      // await axios.patch(
      //   `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      //   {
      //     properties: {
      //       newsletter: preferences.newsletter,
      //       promociones: preferences.promociones,
      //     },
      //   },
      //   {
      //     headers: {
      //       Authorization: 'Bearer YOUR_HUBSPOT_API_KEY',
      //     },
      //   }
      // );
      localStorage.setItem('email', email);
    } catch (error) {
      console.error('Error al actualizar las preferencias de suscripción', error);
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

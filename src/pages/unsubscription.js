import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';
import Layout from '../components/Layout/Layout';

import './subscription.scss';

const UnsubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({ newsletter: false, promociones: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePreferences = async () => {
    // Realiza una solicitud a la API de HubSpot para actualizar las preferencias de suscripción del contacto
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
    } catch (error) {
      console.error('Error al actualizar las preferencias de suscripción', error);
    } finally {
      setIsLoading(false);
    }
  };

  // onChange={(e) => setPreferences({ ...preferences, newsletter: e.target.checked })}

  return (
    <Layout hideLinks hideFooter>
      <div className="subscription-form unsub">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h1>Unsubscribe from emails</h1>

              <form>
                <p>
                  You'll be unsubscribed from all emails from test other than important account-related correspondence.
                </p>

                <div className="sub-options">
                  <div className="sub-option-item">
                    <label htmlFor="email" value={email} onChange={(e) => setEmail(e.target.value)}>
                      Email address
                    </label>
                    <input id="email" type="email" name="email" />
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

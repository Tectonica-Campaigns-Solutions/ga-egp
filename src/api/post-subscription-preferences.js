import axios from 'axios';

const MAP = {
  marketingEmail: {
    id: '153977537',
    legalBasis: 'CONSENT_WITH_NOTICE',
    legalBasisExplanation: '<p>Choose which emails you would like to receive:</p>\n<p>Marketing Email</p>',
  },
  marketingStatutory: {
    id: '238585646',
    legalBasis: 'CONSENT_WITH_NOTICE',
    legalBasisExplanation:
      '<p>Choose which emails you would like to receive:</p>\n<p>Marketing Email | Statutory<br>Emails about our statutory processes</p>',
  },
  marketingEvents: {
    id: '239874603',
    legalBasis: 'CONSENT_WITH_NOTICE',
    legalBasisExplanation:
      '<p>Choose which emails you would like to receive:</p>\n<p>Marketing Email | Events<br>Emails about events you registered for</p>',
  },
  serviceEmail: {
    id: '154225269',
    legalBasis: 'CONSENT_WITH_NOTICE',
    legalBasisExplanation:
      '<p>Choose which emails you would like to receive:</p>\n<p>Service Email | Service<br>Feedback requests and service information</p>',
  },
  salesEmail: {
    id: '165739283',
    legalBasis: 'CONSENT_WITH_NOTICE',
    legalBasisExplanation:
      '<p>Choose which emails you would like to receive:</p>\n<p>Sales Email | One to one<br>One to one emails</p>',
  },
  serviceEmailPrivacy: {
    id: '262959417',
    legalBasis: 'CONSENT_WITH_NOTICE',
    legalBasisExplanation:
      '<p>Choose which emails you would like to receive:</p>\n<p>Service Email | Privacy<br>Emails about privacy policy updates</p>',
  },
};

export default async function handler(req, res) {
  const { email, preferences } = req.body;

  try {
    const requests = [];

    // Un-sub all checked?
    if (preferences.unsubAll) {
      const unsubscribePromises = [];

      for (const key in MAP) {
        const { id, legalBasis, legalBasisExplanation } = MAP[key];
        unsubscribePromises.push(unsubscribe(email, id, legalBasis, legalBasisExplanation));
      }

      Promise.allSettled(unsubscribePromises)
        .then((results) => {
          console.log('Unsubscribe results:', results);
          res.status(200).send('ok');
        })
        .catch((error) => {
          console.error('Error:', error);
          res.status(400).send('error');
          return;
        });

      return;
    }

    // Normal preference update
    for (const preference in preferences) {
      if (preferences[preference] && MAP[preference]) {
        const { id, legalBasis, legalBasisExplanation } = MAP[preference];

        const requestData = {
          emailAddress: email,
          subscriptionId: id,
          legalBasis,
          legalBasisExplanation,
        };

        const url = `https://api.hubapi.com/communication-preferences/v3/subscribe`;

        requests.push(
          axios.post(url, requestData, {
            headers: {
              Authorization: `Bearer ${process.env.HUBSPOT_API}`,
            },
          })
        );
      }
    }

    const responses = await Promise.allSettled(requests);

    responses.forEach((response, index) => {
      if (response.status === 'fulfilled') {
        console.log(`${Object.keys(preferences)[index]} updated`);
      } else {
        const errorReason = response.reason;
        console.error(`Error updating preference: ${Object.keys(preferences)[index]}`);

        if (errorReason.response && errorReason.response.data) {
          const errorData = errorReason.response.data;
          const msg = errorData.message;

          if (msg.includes('cannot be updated because they have unsubscribed')) {
            res.status(400).send('Preferences cannot be updated because you have unsubscribed previously.');
          }
        }
      }
    });

    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    res.status(400).send('error');
  }
}

const unsubscribe = async (email, subscriptionId, legalBasis, legalBasisExplanation) => {
  const url = 'https://api.hubapi.com/communication-preferences/v3/unsubscribe';
  const requestData = {
    emailAddress: email,
    subscriptionId,
    legalBasis,
    legalBasisExplanation,
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

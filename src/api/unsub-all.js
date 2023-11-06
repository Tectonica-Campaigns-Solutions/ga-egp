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
  const { email } = req.body;

  if (!email) {
    res.status(400).send('error: empty email');
    return;
  }

  try {
    const unsubscribePromises = [];

    for (const key in MAP) {
      const { id, legalBasis, legalBasisExplanation } = MAP[key];
      unsubscribePromises.push(unsubscribe(email, id, legalBasis, legalBasisExplanation));
    }

    Promise.allSettled(unsubscribePromises)
      .then((results) => {
        res.status(200).send('ok');
      })
      .catch((error) => {
        // console.error('Error:', error);
        res.status(400).send('error');
        return;
      });
  } catch (error) {
    res.status(400);
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

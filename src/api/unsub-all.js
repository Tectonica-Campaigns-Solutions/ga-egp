import axios from 'axios';

export default async function handler(req, res) {
  const { email } = req.body;

  try {
    const response = await axios.get(`https://api.hubapi.com/communication-preferences/v3/status/email/${emailSaved}`, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API}`,
      },
    });

    res.status(200).json(response.data.subscriptionStatuses);
  } catch (error) {
    res.status(400);
  }
}


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const {priceid } = event.queryStringParameters
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    success_url: `${process.env.URL}/success.html`,
    cancel_url: process.env.URL,
    line_items: [
      {
        price: priceid,
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: 'nationality',
        label: {
          type: 'custom',
          custom: 'Nationality',
        },
        type: 'dropdown',
        dropdown: {
          options: [
            {
              label: 'Spain',
              value: 'ES',
            },
            {
              label: 'France',
              value: 'FR',
            },
          ],
        },
      },
    ],
  });

  return {
    statusCode: 302,
    headers: {
        "Location": session.url,
    },
};
};
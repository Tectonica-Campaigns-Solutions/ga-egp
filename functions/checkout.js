
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const countries = require('./countries.json')

exports.handler = async (event) => {
  const {priceid, mode } = event.queryStringParameters

  const session = await stripe.checkout.sessions.create({

    mode: mode,
    payment_method_types: ['card'],
    success_url: `${process.env.BASE_URL}/donation-thank-you`,
    cancel_url: process.env.BASE_URL,
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
          options: countries,
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
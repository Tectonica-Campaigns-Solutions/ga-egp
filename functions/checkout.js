
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {

  console.log(event)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${process.env.URL}/success.html`,
    cancel_url: process.env.URL,
    line_items: [
      {
        price: 'price_1NaFWgDNqIs82qAr9rQX7cou',
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: 'nationality',
        label: {
          type: 'custom',
          custom: 'Personalized engraving',
        },
        type: 'text',
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
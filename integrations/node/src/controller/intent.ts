/**
 * intent.ts
 * Airwallex Payments Demo. Created by Shirly.Chen
 *
 * This file describes that how to create a paymentIntent and retrieve a paymentIntent.
 */
import express from 'express';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import config from '../config';

const intentRouter = express.Router();

// Create the PaymentIntent on the backend.
// Since this is a demo, to simplify the flow you can using a get call to create an intent, when doing integration you can change to post along with payload your shopper provided
intentRouter.post('/create', async (req, res) => {
  const createIntentUrl = `${config.airwallex.clientPciApiHost}/api/v1/pa/payment_intents/create`;
  try {
    const { amount, currency, order } = req.body || {}
    // STEP #1: Before create intent, should get authorized token first.
    const token = await getToken();
    // STEP #2: Create the paymentIntent.
    // The payment amount and currency, as well as the merchant order ID must be provided.
    const intentRes = await axios.post(
      createIntentUrl,
      {
        // Unique request ID specified by the merchant.
        request_id: uuid(),
        // Payment amount.
        amount,
        // Payment currency.
        currency,
        // The order ID created in merchant's order system that corresponds to this PaymentIntent.
        merchant_order_id: uuid(),
        // You can find more api information from https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents_create/post.
        order
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.status(200).json(intentRes.data);
  } catch (err) {
    // Handle api error here
    return res.status(500).json({ error: err.message });
  }
});

// Retrieve a PaymentIntent.
intentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const createIntentUrl = `${config.airwallex.clientPciApiHost}/api/v1/pa/payment_intents/${id}`;
  try {
    // STEP #1: Before retrieve a intent, should get authorized token first.
    const token = await getToken();

    // STEP #2: Retrieve a paymentIntent by the intentId
    const intentRes = await axios.get(createIntentUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(intentRes.data);
  } catch (err) {
    // Handle api error here
    return res.status(500).json({ error: err.message });
  }
});

// Use your own apiKey and clientId to get the airwallex authorized token.
// Use your test keys for development and live keys for real charges in production.
// If your want to change your environment keys, please go to .env file.
let cachedToken = '';
const getToken = async () => {
  if (cachedToken) {
    return cachedToken;
  }
  const loginUrl = `${config.airwallex.clientApiHost}/api/v1/authentication/login`;
  const loginHeader = {
    'x-client-id': config.airwallex.clientId,
    'x-api-key': config.airwallex.apiKey,
    'Content-Type': 'application/json'
  };
  const loginRes = await axios.post(
    loginUrl,
    {},
    {
      headers: loginHeader,
    },
  );
  const token = loginRes.data.token;
  cachedToken = token;
  // Cache token for a while
  setTimeout(() => (cachedToken = ''), 20 * 60 * 1000);
  return token;
};

export default intentRouter;

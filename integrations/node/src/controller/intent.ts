/**
 * intent.ts
 * Airwallex Payments Demo. Created by Shirly.Chen
 *
 * This file describes that how to create a paymentIntent and retrieve a paymentIntent.
 */
import express from 'express';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
//@ts-ignore
import config from '../config.ts';
import bodyParser from 'body-parser';
const intentRouter = express.Router();

// Create the PaymentIntent on the backend.
// Since this is a demo, to simplify the flow you can using a get call to create an intent, when doing integration you can change to post along with payload your shopper provided
intentRouter.post('/create', async (req: any, res: any) => {
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
        order,
        risk_control_options: {
          skip_risk_processing: true,
        },
        payment_method_options: {
          card: {
            three_ds_action: "FORCE_3DS"
          }
      }
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
intentRouter.get('/:id', async (req: any, res: any) => {
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



// 3DS API INTEGRATION STEP5: after trigger hidden form, 3ds return url will be called with acs response
// Then, you need submit issuer response to airwallex BE by calling confirm continue api
// If the api response is success, redirect to 3ds success page, the 3ds success page will send a successful message to its parent window
// If the api response is failed, redirect to 3ds success page, the 3ds success page will send a failed message to its parent window
// If the api response still need next action, return a html and send a trigger challenge message to its parent window
// go to ../cdn/3dsForNativeApi.html to check the next steps
intentRouter.post('/elements/3ds/:id', bodyParser.urlencoded(),  async (req: any, res: any) => {
  const { id } = req.params;
  const { origin } = req.query || {};
  try {
    const token = await getToken();
    const confirmContinueUrl = `${config.airwallex.clientPciApiHost}/api/v1/pa/payment_intents/${id}/confirm_continue`;
    const confirmContinueRes = await axios.post(
      confirmContinueUrl,
      { 
        // Unique request ID specified by the merchant.
        request_id: uuid(),
        type: '3ds_continue',
        three_ds: {
          acs_response: decodeURI({...req.body}),
          return_url: `http://localhost:3002/api/v1/intent/elements/3ds/${id}?origin=${origin}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (confirmContinueRes?.data?.status === 'SUCCEEDED') {
      return res.redirect(`${origin}/3dsSuccess`);
    } else if(confirmContinueRes?.data?.next_action?.stage === 'WAITING_USER_INFO_INPUT') {
      // if it still need challenge, send event to parent window to trigger 3dsChallenge flow.
      const eventData = {
        type: '3dsChallenge',
        data: confirmContinueRes?.data
      }
      // eslint-disable-next-line no-useless-escape
      return res.send(`<html><body><script type=\"text/javascript\">window.parent.postMessage(${eventData}, '*');</script></body></html>`)
    } else {
      return res.redirect(`${origin}/3dsFailure`);
    }

  } catch (error) {
    console.log(error);
    return res.redirect(`${origin}/3dsFailure`);
  }
});

// Handle 3ds return url callback
intentRouter.post('/:id/confirm', async (req: any, res: any) => {
  const { id } = req.params;
  const confirmIntentUrl = `${config.airwallex.clientPciApiHost}/api/v1/pa/payment_intents/${id}/confirm`;
  try {
    const { card, origin } = req.body || {}
    const token = await getToken();
    // The payment amount and currency, as well as the merchant order ID must be provided.
    const intentRes = await axios.post(
      confirmIntentUrl,
      { 
        // Unique request ID specified by the merchant.
        request_id: uuid(),
        payment_method: {
          type: "card",
          card,
        },
        payment_method_options: {
          card: {
            three_ds: {
              return_url: `http://localhost:3002/api/v1/intent/elements/3ds/${id}?origin=${origin}`
            }
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.status(200).json(intentRes.data);
  } catch (err) {
    console.log(err);
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

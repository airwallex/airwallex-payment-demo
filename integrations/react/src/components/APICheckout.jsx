/**
 * APICheckout.jsx
 * Airwallex Payment Demo - React.  Created by Chao Ding.
 * IMPORTANTE: This demo would work in sandbox due to CORS
 *
 * airwallex-payment-elements api integration in React.js
 * Comments with "Example" demonstrate how states can be integrated
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/fraud.md
 * This demo won't work due to the CORS issue when confirm. It used to demo how to integrate the
 */

import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import {
  handle3ds, // Used to handle the 3ds flow
  get3dsReturnUrl, // Used to get 3ds return URL if you want airwallex to handle 3ds for you
  getBrowserInfo, // Used to get browser info which will used in 3DS flow
} from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const host_Name = 'replace-with-your-host-name'; // This is just for mock, without this you may encounter CORS issue
const env = 'staging';

const Card = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Example: show submission processing state
  const [errorMessage, setErrorMessage] = useState(false); // Example: set error state

  // Step1: Prepare the return_url and device_data which will be used for 3ds
  const return_url = get3dsReturnUrl(env);
  const device_data = getBrowserInfo({
    intent_id,
    env,
  });

  // STEP #2: Prepare the payload for the confirm request
  const payload = {
    request_id: uuid(),
    save_payment_method: 'true',
    payment_method: {
      type: 'card',
      card: {
        number: '4916994064252017',
        expiry_month: '12',
        expiry_year: '2023',
        cvc: '998',
        name: 'Chao',
      },
      billing: {
        date_of_birth: '2011-10-12',
        email: 'accept@airwallex.com',
        first_name: 'Chao',
        last_name: 'Ding',
        phone_number: '8617601215499',
        address: {
          country_code: 'CN',
          state: 'Shanghai',
          city: 'Shanghai',
          street: 'Pudong District',
          postcode: '201304',
        },
      },
      metadata: {
        test: 'test',
      },
    },
    payment_method_options: {
      card: {
        auto_capture: 'true',
        three_ds: {
          return_url,
        },
      },
    },
    device_data,
  };

  // STEP3: Call the confirm API with your payload
  const onTriggerConfirm = async () => {
    setIsSubmitting(true); // Example: sets loading state
    setErrorMessage(''); // Example: reset error message

    try {
      const confirmRes = await axios.post(`${host_Name}/api/v1/pa/payment_intents/${intent_id}/confirm`, payload, {
        withCredentials: false,
        headers: {
          'client-secret': client_secret,
          'Content-Type': 'application/json',
        },
      });
      setIsSubmitting(false);

      // Step4: Deal with the confirm response
      // If the confirm response contains the next_action field witch means the transaction need go to 3DS flow,
      // You could call the handle3ds function witch will handle the 3ds flow on behalf of you
      // If the confirm response doesn't contains the next_action field, then it means the transaction is success
      if (confirmRes.data.next_action) {
        await handle3ds({
          env,
          intent: {
            id: intent_id,
            client_secret,
          },
          next_action: confirmRes.data.next_action,
          cardBin: payload.payment_method.card.number.slice(0, 6),
          challengeWindowSize: '04',
        });
      }
      console.log('confirm success');
      alert(JSON.stringify(confirmRes));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>api integration</h2>
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      <div className="field-container">
        {/* STEP #3b: Add a submit button to trigger the payment request */}
        <button
          onClick={onTriggerConfirm}
          disabled={isSubmitting} // Example: disables button when submitting to prevent resubmission
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Card;

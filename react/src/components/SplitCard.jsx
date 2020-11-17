import React, { useEffect } from "react";
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from "airwallex-payment-elements";

const intentid = "replace-with-your-intent-id";
const client_secret = "replace-with-your-client-secret";

const SplitCard = () => {
  useEffect(() => {
    loadAirwallex({
      env: "staging",
      origin: window.location.origin,
    }).then(() => {
      const cardNumEle = createElement("cardNumber");
      cardNumEle.mount("cardNumber");
      const cvcEle = createElement("cvc");
      cvcEle.mount("cvc");
      const expiryEle = createElement("expiry");
      expiryEle.mount("expiry");
    });

    const onReady = (event) => {
      /*
      ... Handle event
    */
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener("onReady", onReady);
    return () => {
      window.removeEventListener("onReady", onReady);
    };
  });

  const triggerConfirm = async () => {
    try {
      const cardNumEle = getElement("cardNumber");
      const confirmResult = await confirmPaymentIntent({
        element: cardNumEle,
        id: intentid,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      });
      console.log(`confirm success with ${JSON.stringify(confirmResult)}`);
    } catch (err) {
      console.log(`confirm fail with ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h2>Option #4: Split Card element integration</h2>
      <div class="field-container">
        <div class="field-label">Card number</div>
        <div id="cardNumber" />
      </div>
      <div class="field-container">
        <div class="field-label">Expiry</div>
        <div id="expiry" />
      </div>
      <div class="field-container">
        <div class="field-label">Cvc</div>
        <div id="cvc" />
      </div>
      <button onClick={triggerConfirm}>Confirm</button>
    </div>
  );
};

export default SplitCard;

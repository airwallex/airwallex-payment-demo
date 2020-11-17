import React from "react";
import { loadAirwallex, createElement } from "airwallex-payment-elements";

const intentid = "replace-with-your-intent-id";
const client_secret = "replace-with-your-client-secret";

const Wechat = () => {
  loadAirwallex({
    env: "staging",
    origin: window.location.origin,
  }).then(() => {
    const wechat = createElement("wechat", {
      intent: {
        id: intentid,
        client_secret,
      },
    });
    wechat.mount("wechat");

    window.addEventListener("onSuccess", (event) => {
      /*
        ... Handle event
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    });
  });

  return (
    <div>
      <h2>Option #5: Wechat element integration</h2>
      <div id="wechat"></div>
    </div>
  );
};

export default Wechat;

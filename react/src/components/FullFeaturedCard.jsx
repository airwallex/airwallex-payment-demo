import React, { useEffect } from "react";
import { loadAirwallex, createElement } from "airwallex-payment-elements";

const intentid = "replace-with-your-intent-id";
const client_secret = "replace-with-your-client-secret";

const FullFeaturedCard = () => {
  useEffect(() => {
    loadAirwallex({
      env: "staging",
      origin: window.location.origin,
    }).then(() => {
      const fullFeaturedCard = createElement("fullFeaturedCard", {
        intent: {
          id: intentid,
          client_secret,
        },
      });
      fullFeaturedCard.mount("fullFeaturedCard");
    });

    const onSuccess = (event) => {
      /*
      ... Handle event
    */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener("onSuccess", onSuccess);
    return () => {
      window.removeEventListener("onSuccess", onSuccess);
    };
  }, []);
  return (
    <div>
      <h2>Option #3: Full Featured Card integration</h2>
      <div id="fullFeaturedCard"></div>
    </div>
  );
};

export default FullFeaturedCard;

import React, { useEffect } from "react";
import { loadAirwallex, createElement } from "airwallex-payment-elements";

const intentid = "int_1OF0qMxLz3b8s8unOzIAMjT4qep";
const client_secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDUyMjk2NzEsImV4cCI6MTYwNTIzMzI3MSwiYWNjb3VudF9pZCI6ImFjNjZjZmRmLWM2ZTgtNGYxYy05NzIzLTYyNzI1NDQyZmExNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzFPRjBxTXhMejNiOHM4dW5PeklBTWpUNHFlcCJ9.ltQOAo--yV1aNDjAsnP-TM9m2NMudqR_dHS2OL5lFeA";

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

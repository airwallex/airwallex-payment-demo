import React, { useEffect } from "react";
import { createElement, loadAirwallex } from "airwallex-payment-elements";

const intentid = "int_1OF0qMxLz3b8s8unOzIAMjT4qep";
const client_secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDUyMjk2NzEsImV4cCI6MTYwNTIzMzI3MSwiYWNjb3VudF9pZCI6ImFjNjZjZmRmLWM2ZTgtNGYxYy05NzIzLTYyNzI1NDQyZmExNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzFPRjBxTXhMejNiOHM4dW5PeklBTWpUNHFlcCJ9.ltQOAo--yV1aNDjAsnP-TM9m2NMudqR_dHS2OL5lFeA";

const DropIn = () => {
  useEffect(() => {
    loadAirwallex({
      env: "staging",
      origin: window.location.origin,
    }).then(() => {
      const dropIn = createElement("dropIn", {
        intent: {
          id: intentid,
          client_secret,
        },
      });
      dropIn.mount("dropIn");
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
      <h2>Option #2: DropIn integration</h2>
      <div id="dropIn"></div>
    </div>
  );
};

export default DropIn;

import React from "react";
import { redirectToCheckout, loadAirwallex } from "airwallex-payment-elements";

const intentid = "int_1OF0qMxLz3b8s8unOzIAMjT4qep";
const client_secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDUyMjk2NzEsImV4cCI6MTYwNTIzMzI3MSwiYWNjb3VudF9pZCI6ImFjNjZjZmRmLWM2ZTgtNGYxYy05NzIzLTYyNzI1NDQyZmExNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzFPRjBxTXhMejNiOHM4dW5PeklBTWpUNHFlcCJ9.ltQOAo--yV1aNDjAsnP-TM9m2NMudqR_dHS2OL5lFeA";

const Hpp = () => {
  const redirectHpp = async () => {
    try {
      await loadAirwallex({
        env: "staging",
      });
      await redirectToCheckout({
        env: "staging",
        id: intentid,
        client_secret: client_secret,
      });
    } catch (error) {
      // handle errors here
    }
  };

  return (
    <div>
      <h2>Option #1: Hosted payment page (HPP) integration</h2>
      <button onClick={redirectHpp}>Redirect to HPP</button>
    </div>
  );
};

export default Hpp;

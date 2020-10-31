<template>
  <div>
    <h2>Option #4: Split Card element integration</h2>
    <div class="field-container">
      <div class="field-label">Card number</div>
      <div id='cardNumber' />
    </div>
    <div class="field-container">
      <div class="field-label">Expiry</div>
      <div id='expiry' />
    </div>
    <div class="field-container">
      <div class="field-label">Cvc</div>
      <div id='cvc' />
    </div>
    <button @click="triggerConfirm()">Confirm</button>
  </div>
</template>

<script>
  import { createElement, confirmPaymentIntent, loadAirwallex, getElement } from 'airwallex-payment-elements';

 const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDQxMzM0MTUsImV4cCI6MTYwNDEzNzAxNSwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X2hIVmdKSWpLemlEdHhmdmpoelBlTVdsR0p2dyJ9.EZLyAefUtbSOhlIjwANUZ8_HgJPZQ_mGxwaVc5i3pNc';
const intentid = 'int_hHVgJIjKziDtxfvjhzPeMWlGJvw';

  loadAirwallex({
    env: 'staging',
    origin: window.location.origin
  }).then(() => {
    const cardNumEle = createElement('cardNumber');
    cardNumEle.mount('cardNumber');
    const cvcEle = createElement('cvc');
    cvcEle.mount('cvc');
    const expiryEle = createElement('expiry');
    expiryEle.mount('expiry');
  });

  window.addEventListener('onReady', (event) => {
    /*
      ... Handle event
    */
    console.log(JSON.stringify(event.detail));
  });

  const triggerConfirm = async () => {
    try {
      const cardNumEle = getElement('cardNumber');
      const confirmResult = await confirmPaymentIntent({
        element: cardNumEle,
        id: intentid,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true
          }
        }
      });
      console.log(`confirm success with ${JSON.stringify(confirmResult)}`);
    } catch (err) {
      console.log(`confirm fail with ${JSON.stringify(err)}`);
    }
  }

  export default {
    name: 'CardEle',
  }
</script>

<style>
  .field-container {
    margin: 0 auto 16px;
    width: 300px;
  }
  .field-container div {
    border: 1px solid;
    padding: 4px 8px;
    margin-top: 8px;
  }
  div.field-label {
    text-align: left;
    border: 0;
  }
</style>

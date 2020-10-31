<template>
  <div>
    <h2>Option #3: Full Featured Card integration</h2>
    <div id='fullFeaturedCard'></div>
  </div>
</template>

<script>
  import {createElement, loadAirwallex} from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDQxMzM0MTUsImV4cCI6MTYwNDEzNzAxNSwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X2hIVmdKSWpLemlEdHhmdmpoelBlTVdsR0p2dyJ9.EZLyAefUtbSOhlIjwANUZ8_HgJPZQ_mGxwaVc5i3pNc';
const intentid = 'int_hHVgJIjKziDtxfvjhzPeMWlGJvw';

  loadAirwallex({
    env: 'staging',
    origin: window.location.origin
  }).then(() => {
    const card = createElement('fullFeaturedCard', {
      intent: {
        id: intentid,
        client_secret,
      },
    });
    card.mount('fullFeaturedCard');
  })

  window.addEventListener('onSuccess', (event) => {
        /*
          ... Handle event
        */
        console.log(JSON.stringify(event.detail));
      })

  export default {
    name: 'FullFeaturedCard',
  }
</script>

<style>
  #fullFeaturedCard {
    width: 540px;
    margin: 48px auto;
  }
</style>

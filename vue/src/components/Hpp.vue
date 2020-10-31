<template>
  <div>
    <h2>Option #1: Hosted payment page (HPP) integration</h2>
    <button @click="redirectHpp()">Redirect to HPP</button>
  </div>
</template>

<script>
import { redirectToCheckout,loadAirwallex } from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDQxMzM0MTUsImV4cCI6MTYwNDEzNzAxNSwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X2hIVmdKSWpLemlEdHhmdmpoelBlTVdsR0p2dyJ9.EZLyAefUtbSOhlIjwANUZ8_HgJPZQ_mGxwaVc5i3pNc';
const intentid = 'int_hHVgJIjKziDtxfvjhzPeMWlGJvw';

loadAirwallex({
  env: 'staging',
});

const redirectHpp = async () => {
  await redirectToCheckout({
    env: 'staging',
    id: intentid,
    client_secret: client_secret,
  });
};

export default {
  name: 'Hpp',
  data () {
    return {
      redirectHpp
    }
  }
}
</script>

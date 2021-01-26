<!--
  instructions.vue
  Airwallex Payment Demo - Vue.  Created by Josie Ku.

  This file is the main instruction page that introduces the
  demo and provides some trouble-shooting tips.  This is not
  required for the integration.
-->
<template>
  <div>
    <h2>Welcome! Here are some tips to help you navigate this project:</h2>
    <div class="instruction-container">
      <p id="bullet">
        1. Feeling confused about these Airwallex functions?
      </p>
      <p>
        Here is the documentation to all our airwallex-payment-elements functions. You will find detailed guides to
        implementing each payment method with different web frameworks as well as common errors.
      </p>
      <a href="https://github.com/airwallex/airwallex-payment-demo/tree/master/docs" target="_blank" rel="noreferrer">
        https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
      </a>
      <p id="bullet">
        2. If you run into the following error:
      </p>
      <p id="error">
        Access denied, authentication failed
      </p>
      <p>
        Remember to change the<span id="code">intent_id</span>and <span id="code">client_secret</span>in your component
        file!
      </p>
      <p id="bullet">
        3. Send us your suggestions!
      </p>
      <p>
        Have some ideas on other ways to integrate airwallex-payment-elements?&nbsp;
        <a href="https://www.airwallex.com/contact-sales">Let us know!</a> We want to build the best product for you.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
};
</script>
<style scoped>
div.instruction-container {
  padding: 10px 50px;
  text-align: left;
}
span#code {
  font-family: monospace;
  background-color: lightgrey;
  font-size: 16px;
  margin: 0px 5px;
}
p#bullet {
  font-weight: bold;
}
</style>

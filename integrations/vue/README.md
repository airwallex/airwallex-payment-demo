# Airwallex Payment Elements with Vue.js

This directory contains the Vue.js implementation of [Airwallex Payment Element](https://www.npmjs.com/package/airwallex-payment-elements).

## Requirements

- [node.js](https://nodejs.org/en/)
- `npm` or `yarn` package manager

## Installation and Development

1. Clone the root [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) project to your local machine

`git clone https://github.com/airwallex/airwallex-payment-demo`

2. Navigate into the react directory with `cd vue`

3. Install the package with `yarn` or `npm install`

4. Run the project in development mode with `yarn dev` or `npm start`. See the project at [localhost:8080](http://localhost:8080)

## Usage

Each of the payment methods are written as separate components found in the [/src/components](/integrations/vue/src/components) folder.

To test each of the payment methods, be sure to replace the `intent_id` and `client_secret` variables at the top of each file with your own unique keys. These values can be created with the backend API integration with [PaymentIntent](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

```jsx
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
```

## More docs on Vue.js

For a detailed explanation on how Vue.js works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Authors

Chao Ding, Josie Ku, and Jessica Zhou

# Airwallex Payment Elements with React Typescript

This directory contains the React and Typescript implementation of [Airwallex Payment Element](https://www.npmjs.com/package/airwallex-payment-elements).

## Requirements

- [node.js](https://nodejs.org/en/)
- `npm` or `yarn` package manager

## Installation and Development

1. Clone the root [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) project to your local machine

`git clone https://github.com/airwallex/airwallex-payment-demo`

2. Navigate into the react directory with `cd react-ts`

3. Install the package with `yarn` or `npm install`

4. Run the project in development mode with `npm start` or `yarn start`. See the project at [localhost:3000](http://localhost:3000)

## Usage

Each of the payment methods are demo-ed as a separate component found in the [/src/components](/src/components) folder.

To test each of the payment methods, be sure to replace the `intent_id` and `client_secret` variables at the top of each file with your own unique keys. These values can be created with the backend API integration with [PaymentIntent](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

```jsx
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
```

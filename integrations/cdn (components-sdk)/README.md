# Components SDK - CDN Demo

This directory contains an implementation of [Airwallex Payment Element](https://www.npmjs.com/package/@airwallex/components-sdk) using static html files. The HTML files are served using [Serve](https://www.npmjs.com/package/serve).

## Requirements

- [node.js](https://nodejs.org/en/)
- `npm` or `yarn` package manager

## Installation and Development

1. Clone the root [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) project to your local machine

`git clone https://github.com/airwallex/airwallex-payment-demo`

2. Navigate into the react directory with `cd integrations/cdn (components-sdk)`

3. Install the package with `yarn` or `npm install`

4. Run the project in development mode with `npm start` or `yarn start`. See the project at [localhost:5000](http://localhost:5000)

## Usage

Each of the payment methods are written as a separate html file found in [/integrations/cdn](/integrations/cdn) folder.

```html
<!-- STEP #1: Import @airwallex/components-sdk bundle -->
<script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
```

Also, to test each of the payment methods, be sure to replace the `intent_id` and `client_secret` variables in the file with your own unique keys. These values can be created with the backend API integration with [PaymentIntent](https://www.airwallex.com/docs/components-sdk/api#/Payment_Acceptance/Payment_Intents/Intro).

```jsx
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
```

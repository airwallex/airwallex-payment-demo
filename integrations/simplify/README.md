# Airwallex Payment Elements - CDN Demo

This directory contains an simplest implementation of [Airwallex Payment Element](https://www.npmjs.com/package/airwallex-payment-elements) using static html files.

## Requirements

- [node.js](https://nodejs.org/en/)
- `npm` or `yarn` package manager

## Installation and Development

1. Clone the root [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) project to your local machine

`git clone https://github.com/airwallex/airwallex-payment-demo`

2. Navigate into the react directory with `cd integrations/simplify`

3. Install the package with `yarn` or `npm install`

4. Run the project in development mode with `npm start` or `yarn start`. See the project at [localhost:5000](http://localhost:5000)

## Usage

Each of the payment methods are written as a separate html file found in [/integrations/simplify](/integrations/simplify) folder.

Also, to test each of the payment methods, be sure to replace the `replace-with-your-client-secret` variables in the file with your own unique keys. These values can be created with the backend API integration with [PaymentIntent](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

## Authors

Chao Ding

# Airwallex Payment Elements with Angular

This directory contains the Angular implementation of [Airwallex Payment Element](https://www.npmjs.com/package/airwallex-payment-elements). This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Requirements

- [node.js](https://nodejs.org/en/)
- `npm` or `yarn` package manager
- [Angular CLI](https://github.com/angular/angular-cli)

## Installation and Development

1. Clone the root [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) project to your local machine

`git clone https://github.com/airwallex/airwallex-payment-demo`

2. Navigate into the react directory with `cd integrations/angular`

3. Install the package with `yarn` or `npm install`

4. Run the project in development mode with `npm start` or `yarn start` or `ng serve`. See the project at [localhost:4200](http://localhost:4200)

## Usage

Each of the payment methods are written as a separate component found in the [/src/app](/integrations/angular/src/app) folder.

To test each of the payment methods, be sure to replace the `intent_id` and `client_secret` variables at the top of each `x.component.ts` file with your own unique keys. These values can be created with the backend API integration with [PaymentIntent](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

```jsx
const intent_id = "replace-with-your-intent-id";
const client_secret = "replace-with-your-client-secret";
```

## Documentation on Angular

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Authors

Roy Yang and Josie Ku

# Airwallex Payment Demo - Node Server

This directory contains a simple example of a Node server integrated with the [Airwallex Payment API](https://www.airwallex.com/docs/api). The server demonstrates how to create and retrieve [payment intents](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

## Prerequisites

- [node.js](https://nodejs.org/en/)
- `npm` or `yarn` package manager

## Installation and Development

1. Clone the root [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) project to your local machine

```
git clone https://github.com/airwallex/airwallex-payment-demo
```

2. Navigate into the react directory with `cd node`

3. Install the package with `yarn install` or `npm install`

4. Copy the contents of `.env_copy` into a `.env` file, run `cp .env_copy .env`

5. Run the project in development mode with `npm start` or `yarn start`. See the project at [localhost:3000](http://localhost:3000)

## Configuration

You must change your application keys in the [.env](/node/.env) file to create/retrieve payment intents.

Your `CLIENT_ID` and `API_KEY` can be found on the Airwallex Webapp Platform under Account Settings > Developer. **Do not share these keys** because they allow access to your payments.

## Usage

For demo purposes, both routes below can be accessed with a GET request. Be sure to change the create route to a POST request in production to protect your keys and payment details.

- **Create a payment intent** at [http://localhost:3002/api/v1/intent/create](http://localhost:3002/api/v1/intent/create)
- **Retrieve a payment intent** at [http://localhost:3002/api/v1/intent/:id](http://localhost:3002/api/v1/intent/:id)
  - remember to change id to a live intentId in the url

Find more details about the Airwallex API [here](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents_create/post)!

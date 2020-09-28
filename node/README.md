# Airwallex Payment Demo - Node Server

Node server example of payment implementation.

## Pre-installation

- [Install node.js](https://nodejs.org/en/)

## Install

    $ git clone  [git@github.com](mailto:git@github.com):airwallex/airwallex-payment-demo.git

    $ cd node

    $ yarn install

### Configure

you can change your application keys in .env file

### Start demo

    $ yarn start

### Go to browser and open [Localhost](http://localhost:3002/apis/v1/intent/create)
- [create a payment intent](http://localhost:3002/apis/v1/intent/create)
- [retrieve a payment intent](http://localhost:3002/apis/v1/intent/:id),remember to change id to a live intentId in the url

Those static node show example of integration apis, for more details you can check on  [AIRWALLEX API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents_create/post)

# Components SDK - Hosted Payment Page Integration

The HPP checkout option redirects customers to an Airwallex checkout page, allowing merchants to accept payments without the full responsibility of handling payment acceptance and displaying payment options.

![](assets/hpp.gif)

\* _An example of an HPP integration with a button click for redirection._

## Guide

The following steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

Want more details? See the integration in [React](/integrations/cdn (components-sdk)/hpp.html).

### 1. At the start of your file, import `@airwallex/components-sdk`.

```js
import Airwallex from '@airwallex/components-sdk';
```

or add the bundle as a script in your HTML head

```html
<script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
```

### 2. Initialize the Airwallex package with the appropriate environment

```js
await window.AirwallexComponentsSDK.init({
  env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
  origin: window.location.origin, // Setup your event target to receive the browser events message
});
```

`init` takes in options to set up the payment environment. See docs for further customizations [here](/docs/components-sdk#init).

The Airwallex package only needs to be mounted once in an application (and everytime the application reloads).

### 3. Add a checkout button

```html
<button id="hpp">Checkout</button>
```

We will add the button listener in the next step.

### 4. Add a button handler to trigger the redirect

```js
window.AirwallexComponentsSDK.payment.redirectToCheckout({
  env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
  intent_id: 'replace-with-your-intent-id',
  client_secret: 'replace-with-your-client-secret',
  currency: 'replace-with-your-currency',
  country_code: 'replace-with-your-country-code',
});
```

`redirectToCheckout` will redirect customers to an Airwallex checkout page that matches the payment intent details (provided by Payment Intent `id` prop). Customers will do their payment transaction there.

Merchants can add more features to the checkout including the success or failure url to redirect customers back to the merchant site. More details about the `redirectToCheckout` function can be found [here](/docs/components-sdk#redirectToCheckout).

## Documentation

See the full documentation for `@airwallex/components-sdk` [here](/docs).

## Integration Examples

Check out [airwallex-payment-demo](/../../tree/master) for integration examples with different web frameworks!

## Full Code Example

### Redirect to HPP for checkout

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Airwallex Checkout Playground</title>
    <!-- STEP #1: Import @airwallex/components-sdk bundle -->
    <script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
  </head>
  <body>
    <h1>Hosted payment page (HPP) integration</h1>
    <!-- STEP #3: Add a checkout button -->
    <button id="hpp">Redirect to HPP for checkout</button>
    <script>
      // STEP #2: Initialize the Airwallex package with the appropriate environment
      await window.AirwallexComponentsSDK.init({
        env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      document.getElementById('hpp').addEventListener('click', () => {
        // STEP #4: Add a button handler to trigger the redirect to HPP
        window.AirwallexComponentsSDK.payment.redirectToCheckout({
          env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
          mode: 'payment',
          intent_id: 'replace-with-your-intent-id',
          client_secret: 'replace-with-your-client-secret',
          currency: 'replace-with-your-currency',
          country_code: 'replace-with-your-country-code'
        });
      });
    </script>
  </body>
</html>
```

### Redirect to HPP for recurring

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Airwallex Checkout Playground</title>
    <!-- STEP #1: Import @airwallex/components-sdk bundle -->
    <script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
  </head>
  <body>
    <h1>Hosted payment page (HPP) integration</h1>
    <!-- STEP #3: Add a checkout button -->
    <button id="hpp">Redirect to HPP for recurring</button>
    <script>
      // STEP #2: Initialize the Airwallex package with the appropriate environment
      await window.AirwallexComponentsSDK.init({
        env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      document.getElementById('hpp').addEventListener('click', () => {
        // STEP #4: Add a button handler to trigger the redirect to HPP
        Airwallex.redirectToCheckout({
          env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
          mode: 'recurring',
          client_secret: 'replace-with-your-client-secret',
          customer_id: 'replace-with-your-customer-id',
          currency: 'replace-with-your-currency',
          country_code: 'replace-with-your-country-code',
          recurringOptions: {
            /**
             * The subsequent transactions are triggered by `merchant` or `customer`
             */
            next_triggered_by: 'merchant',
            /**
             * The reason why merchant trigger transaction. Only applicable when next_triggered_by is `merchant`
             */
            merchant_trigger_reason: 'scheduled',
            /**
             * Currency of the initial PaymentIntent to verify the PaymentConsent. Three-letter ISO currency code
             */
            currency: 'replace-with-your-currency',
          },
        });
      });
    </script>
  </body>
</html>
```

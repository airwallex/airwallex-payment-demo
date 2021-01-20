# Airwallex Payment Elements - Hosted Payment Page Integration

The HPP checkout option redirects customers to an Airwallex checkout page, allowing merchants to accept payments without the full responsibility of handling payment acceptance and displaying payment options.

![](assets/hpp.gif)

\* _An example of an HPP integration with a button click for redirection._

## Guide

The following steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

### 1. At the start of your file, import `airwallex-payment-elements`.

```js
import Airwallex from 'airwallex-payment-elements';
```

or add the bundle as a script in your HTML head

```html
<script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
```

Be sure to replace the x.x.x with the `airwallex-payment-elements` package version you'd like to use.

### 2. Initialize the Airwallex package with the appropriate environment

```js
Airwallex.loadAirwallex({
  env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
  origin: window.location.origin, // Setup your event target to receive the browser events message
});
```

`loadAirwallex` takes in options to set up the payment environment. See docs for further customizations [here](/docs/main.md#loadAirwallex).

The Airwallex package only needs to be mounted once in an application (and everytime the application reloads).

### 3. Add a checkout button

```html
<button id="hpp">Checkout</button>
```

We will add the button listener in the next step.

### 4. Add a button handler to trigger the redirect

```js
Airwallex.redirectToCheckout({
  env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
  id: 'replace-with-your-intent-id',
  client_secret: 'replace-with-your-client-secret',
});
```

`redirectToCheckout` will redirect customers to an Airwallex checkout page that matches the payment intent details (provided by Payment Intent `id` prop). Customers will do their payment transaction there.

Merchants can add more features to the checkout including the success or failure url to redirect customers back to the merchant site. More details about the `redirectToCheckout` function can be found [here](/docs/main.md#redirectToCheckout).

## Documentation

See the full documentation for `airwallex-payment-elements` [here](/docs/main.md).

## Integration Examples

Check out [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) for integration examples with different web frameworks!

## Full Code Example

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Airwallex Checkout Playground</title>
    <!-- Step #1: Import airwallex-payment-elements bundle -->
    <script src="https://checkout.airwallex.com/assets/bundle.0.0.xx.min.js"></script>
  </head>
  <body>
    <h1>Hosted payment page (HPP) integration</h1>
    <!-- Step #3: Add a checkout button -->
    <button id="hpp">Redirect to HPP</button>
    <script>
      // Step #2: Initialize the Airwallex package with the appropriate environment
      Airwallex.init({
        env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      document.getElementById('hpp').addEventListener('click', () => {
        // Step #4: Add a button handler to trigger the redirect to HPP
        Airwallex.redirectToCheckout({
          env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
          id: 'replace-with-your-intent-id',
          client_secret: 'replace-with-your-client-secret',
        });
      });
    </script>
  </body>
</html>
```

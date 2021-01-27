# Airwallex Payment Elements - Redirect Element Integration

The Redirect element allows merchants to redirect to an alternative payment method such as Alipay, Dana, Kaokaopay, etc. This element gives merchant control over the overall look and feel of their checkout page, while delegating the responsibility of payment processing to Airwallex. The element is a checkout button that will redirect users to another payment page. The button style is currently not customizable.

![](assets/redirect.png)

\* _An example of a Redirect element._

## Guide

The following Steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

Want more details? See the integration in [React](/integrations/react/src/components/Redirect.jsx).

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

### 3. Add an empty container for the redirect element to be injected into

```html
<div id="redirect"></div>
```

We will mount the redirect element into the empty div in Step 5.

### 4. Create the redirect element

This creates the specified [Element](/docs/main.md#Element) object. We specify the type as **`redirect`**.

```js
const element = Airwallex.createElement('redirect', {
  intent: {
    // Required, the redirect element uses intent_id and client_secret to prepare checkout
    id: 'replace-with-your-intent-id',
    client_secret: 'replace-with-your-client-secret',
  },
  method: 'replace-with-your-redirect-method', // Required, 'alipaycn', 'alipayhk' , 'gcash' , 'dana', 'kakaopay' , 'tng'
});
```

You **must provide intent details and payment method** to create the redirect element.

More importantly, the payment method must be one that the Merchant has enabled to accept. For example, if the Merchant hasn't enabled Dana as a payment method, a redirect element with the 'dana' redirect method will not work.

There are also additional options as a second parameter to the `createElement` function that can overwrite styles and other functions. [See docs](/docs/main.md#createElement) for more details.

### 5. Mount the redirect element

Next, we need to mount the redirect element to the DOM.

```js
element.mount('redirect');
```

This function will append the redirect element to your div with an id `redirect` as created in Step 3. **Ensure that there are no other elements in the document with the same id**.

The **element should only be mounted once** in a single payment flow.

### 6. Add an `onReady` event listener to handle events when the element is mounted

```js
window.addEventListener('onReady', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. Add an `onSuccess` event listener to handle events when the payment is successful.

```js
window.addEventListener('onSuccess', (event) => {
  /*
    ... Handle event on success
  */
  window.alert(event.detail);
});
```

### 8. Add an `onError` event listener to handle events when the payment has failed.

```js
window.addEventListener('onError', (event) => {
  /*
    ... Handle event on error
  */
  console.log(event.detail);
});
```

### 9. Beautify and deploy!

## Documentation

See the full documentation for `airwallex-payment-elements` [here](/docs/main.md).

## Integration Examples

Check out [airwallex-payment-demo](/) for integration examples with different web frameworks!

## Full Code Example

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Airwallex Checkout Playground</title>
    <!-- STEP #1: Import airwallex-payment-elements bundle -->
    <script src="https://checkout.airwallex.com/assets/bundle.0.0.xx.min.js"></script>
  </head>
  <body>
    <h1>Redirect element integration</h1>
    <!-- STEP #3: Add an empty container for the redirect element to be injected into -->
    <div id="redirect"></div>
    <script>
      // STEP #2: Initialize the Airwallex global context for event communication
      Airwallex.init({
        env: 'staging', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      // STEP #4: Create 'redirect' element
      const element = Airwallex.createElement('redirect', {
        intent: {
          // Required
          id: 'replace-with-your-intent-id',
          client_secret: 'replace-with-your-client-secret',
        },
        method: 'replace-with-your-redirect-method', // Required
      });
      // STEP #5: Mount the 'redirect' element
      element.mount('redirect');

      // STEP #6: Add an event listener to handle events when the element is mounted
      window.addEventListener('onReady', (event) => {
        /*
          ... Handle event
        */
        window.alert(event.detail);
      });

      // STEP #7: Add an event listener to handle events when the payment is successful.
      window.addEventListener('onSuccess', (event) => {
        /*
          ... Handle event on success
        */
        window.alert(event.detail);
      });

      // STEP #8: Add an event listener to handle events when the payment has failed.
      window.addEventListener('onError', (event) => {
        /*
          ... Handle event on error
        */
        console.log(event.detail);
      });
    </script>
  </body>
</html>
```

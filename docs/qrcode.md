# Airwallex Payment Elements - qrcode Element Integration

The qrcode element allows merchants to embed a qr code checkout option on their website. This element gives merchant control over the overall look and feel of their checkout page, while delegating the responsibility of payment processing to Airwallex. It contains a QR code matched to the specified PaymentIntent and a refresh button to regenerate the QR code.

![](assets/qrcode.gif)

\* _An example of a qrcode element._

## Guide

The following Steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

Want more details? See the integration in [React](/integrations/react/src/components/Qrcode.jsx).

### 1. At the start of your file, import `airwallex-payment-elements`.

```js
import Airwallex from 'airwallex-payment-elements';
```

or add the bundle as a script in your HTML head

```html
<script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
```

### 2. Initialize the Airwallex package with the appropriate environment

```js
Airwallex.init({
  env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
  origin: window.location.origin, // Setup your event target to receive the browser events message
});
```

`init` takes in options to set up the payment environment. See docs for further customizations [here](/docs#init).

The Airwallex package only needs to be mounted once in an application (and everytime the application reloads).

### 3. Add an empty container for the qrcode element to be injected into

```html
<div id="qrcode"></div>
```

We will mount the qrcode element into the empty div in Step 5.

### 4. Create the qrcode element

This creates the specified [Element](/docs#Element) object. We specify the type as **`qrcode`**.

```js
const element = Airwallex.createElement('qrcode', {
  intent: {
    // Required, the qrcode element uses intent_id and client_secret to prepare checkout
    id: 'replace-with-your-intent-id',
    client_secret: 'replace-with-your-client-secret',
  },
  qrcodeMethod: 'replace-with-your-payment-method', // available methods: 'alipayhk', 'kakaopay', 'wechatpay'
});
```

You **must provide intent details** to create the qrcode element.

There are also additional options as a second parameter to the `createElement` function that can overwrite styles and other functions. [See docs](/docs#createElement) for more details.

### 5. Mount the qrcode element

Next, we need to mount the qrcode element to the DOM.

```js
element.mount('qrcode');
```

This function will append the qrcode element to your div with an id `qrcode` as created in Step 3. **Ensure that there are no other elements in the document with the same id**.

The **element should only be mounted once** in a single payment flow.

### 6. Add an `onReady` event listener to handle events when the element is mounted

```js
element.addEventListener('onReady', (event) => {
  /*
    ... Handle event
  */
  console.log(event.detail);
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. Add an `onSuccess` event listener to handle events when the payment is successful.

```js
element.addEventListener('onSuccess', (event) => {
  /*
    ... Handle event on success
  */
  console.log(event.detail);
});
```

### 8. Add an `onError` event listener to handle events when the payment has failed.

```js
element.addEventListener('onError', (event) => {
  /*
    ... Handle event on error
  */
  console.log(event.detail);
});
```

### 9. Beautify and deploy!

## Documentation

See the full documentation for `airwallex-payment-elements` [here](/docs).

## Integration Examples

Check out [airwallex-payment-demo](/../../tree/master) for integration examples with different web frameworks!

## Full Code Example

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Airwallex Checkout Playground</title>
    <!-- STEP #1: Import airwallex-payment-elements bundle -->
    <script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
  </head>
  <body>
    <h1>qrcode integration</h1>
    <!-- STEP #3: Add an empty container for the qrcode element to be injected into -->
    <div id="qrcode"></div>
    <script>
      // STEP #2: Initialize the Airwallex global context for event communication
      Airwallex.init({
        env: 'staging', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      // STEP #4: Create 'qrcode' element
      const element = Airwallex.createElement('qrcode', {
        intent: {
          // Required
          id: 'replace-with-your-intent-id',
          client_secret: 'replace-with-your-client-secret',
        },
        qrcodeMethod: 'replace-with-your-payment-method',
      });
      // STEP #5: Mount 'qrcode' element
      element.mount('qrcode');

      // STEP #6: Add an event listener to handle events when the element is mounted
      element.addEventListener('onReady', (event) => {
        /*
          ... Handle event
        */
        console.log(event.detail);
      });

      // STEP #7: Add an event listener to handle events when the payment is successful.
      element.addEventListener('onSuccess', (event) => {
        /*
          ... Handle event on success
        */
        console.log(event.detail);
      });

      // STEP #8: Add an event listener to handle events when the payment has failed.
      element.addEventListener('onError', (event) => {
        /*
          ... Handle event on error
        */
        console.log(event.detail);
      });
    </script>
  </body>
</html>
```

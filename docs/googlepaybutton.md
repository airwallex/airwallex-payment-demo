# Components SDK - Google Pay Button Integration

The Google Pay Button allows merchants to embed a google pay checkout option on their website. This element gives merchant control over the overall look and feel of their checkout page, while delegating the responsibility of payment processing to Airwallex.

\* _An example of a Google Pay Button element._

## Guide

The following steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

### 1. Initialize Payment Object

At the start of your file, initialize the Airwallex SDK. You can do this either by importing the SDK or adding it as a script in your HTML.

#### Importing the SDK

```js
import { init } from '@airwallex/components-sdk';

const { payments } = await init({
  env: 'demo', // Choose the Airwallex environment ('staging', 'demo', or 'prod')
  enabledElements: ['payments'],
});
```

#### Adding the SDK as a Script

Add the following script in your HTML `<head>`:

```html
<script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
```

Then, initialize the SDK using the global `AirwallexComponentsSDK` object:

```js
await window.AirwallexComponentsSDK.init({
  env: 'demo', // Choose the Airwallex environment ('staging', 'demo', or 'prod')
  enabledElements: ['payments'],
});
```

### 2. Add an empty container for the card element to be injected into and a submit button to trigger the payment request

```html
<div id="googlePayButton"></div>
```

We will mount the card element into the empty div in step 5.

### 3. Create the googlePayButton element

This creates the specified [Element](/docs-components-sdk#Element) object. We specify the type as **`googlePayButton`**.

```js
import {createElement } from '@airwallex/components-sdk';
const element = await createElement('googlePayButton', {
  intent: {
    // Required, googlePayButton uses intent_id and client_secret to prepare checkout
    id: 'replace-with-your-intent-id',
    client_secret: 'replace-with-your-client-secret',
  },
});
```

You **must provide intent details** to create the googlePayButton element.

There are also additional options as a second parameter to the `createElement` function that can overwrite styles and other functions. [See docs](/docs-components-sdk#createElement) for more details.

### 5. Mount the card element

Next, we need to mount the card element to the DOM.

```js
const domElement = element.mount('googlePayButton');
```

This function will append the card element to your div with an id `googlePayButton` as created in step 3. **Ensure that there are no other elements in the document with the same id**.

The **element should only be mounted once** in a single payment flow.

### 6. Add an `ready` event listener to handle events when the element is mounted

```js
element.on('ready', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. Add an `success` event listener to handle events when the payment is successful.

```js
element.on('success', (event) => {
  /*
    ... Handle event on success
  */
  window.alert(event.detail);
});
```

### 8. Add an `error` event listener to handle events when the payment has failed.

```js
element.on('error', (event) => {
  /*
    ... Handle event on error
  */
  window.alert(event.detail);
});
```

### 9. Beautify and deploy!

## Documentation

See the full documentation for `@airwallex/components-sdk` [here](https://airwallex.com/docs/js/payments/googlepaybutton/).

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
    <!-- STEP #1: Import @airwallex/components-sdk bundle -->
    <script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
  </head>
  <body>
    <h1>GooglePayButton integration</h1>
    <!-- STEP #3: Add an empty container for the googlePayButton element to be injected into -->
    <div id="googlePayButton"></div>
    <script>
      // STEP #2: Initialize the Airwallex global context for event communication
      await window.AirwallexComponentsSDK.init({
        env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
        enabledElements: ['payments'],
      });
      // STEP #4: Create 'googlePayButton' element
      const element = await window.AirwallexComponentsSDK.createElement('googlePayButton', {
          intent_id: 'replace-with-your-intent-id',
          client_secret: 'replace-with-your-client-secret',
          amount: {
            value: 'replace-with-your-intent-amount',
            currency: 'replace-with-your-intent-currency',
          },
          autoCapture: true,
          merchantInfo: {
            merchantName: 'replace-with-your-merchant-name',
          },
          origin: window.location.origin,
          countryCode: 'replace-with-your-country-code', // merchant country code
  
      });
      // STEP #5: Mount 'googlePayButton' element
      const domElement = element.mount('googlePayButton');

      // STEP #6: Add an event listener to handle events when the element is mounted
      element.on('ready', (event) => {
        /*
          ... Handle event
        */
        window.alert(event.detail);
      });

      // STEP #7: Add an event listener to handle events when the payment is successful.
      element.on('success', (event) => {
        /*
          ... Handle event on success
        */
        window.alert(event.detail);
      });

      // STEP #8: Add an event listener to handle events when the payment has failed.
      element.on('error', (event) => {
        /*
          ... Handle event on error
        */
        console.log(event.detail);
      });
    </script>
  </body>
</html>
```

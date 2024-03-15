# Components SDK - Apple Pay Button Integration

The Apple Pay Button allows merchants to embed a apple pay checkout option on their website. This element gives merchant control over the overall look and feel of their checkout page, while delegating the responsibility of payment processing to Airwallex.

\* _An example of a Apple Pay Button element._

## Guide

The following steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

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

`init` takes in options to set up the payment environment. See docs for further customizations [here](/docs-components-sdk#init).

The Airwallex package only needs to be mounted once in an application (and everytime the application reloads).

### 3. Add an empty container for the card element to be injected into and a submit button to trigger the payment request

```html
<div id="applePayButton"></div>
```

We will mount the card element into the empty div in step 5.

### 4. Create the applePayButton element

This creates the specified [Element](/docs-components-sdk#Element) object. We specify the type as **`applePayButton`**.

```js
const element = await window.AirwallexComponentsSDK.createElement('applePayButton', {
  // Required, apple pay button uses intent_id and client_secret to prepare checkout
  intent_id: 'replace-with-your-intent-id',
  client_secret: 'replace-with-your-client-secret',
});
```

You **must provide intent details** to create the applePayButton element.

There are also additional options as a second parameter to the `createElement` function that can overwrite styles and other functions. [See docs](/docs-components-sdk#createElement) for more details.

### 5. Mount the card element

Next, we need to mount the card element to the DOM.

```js
const domElement = element.mount('applePayButton');
```

This function will append the card element to your div with an id `applePayButton` as created in step 3. **Ensure that there are no other elements in the document with the same id**.

The **element should only be mounted once** in a single payment flow.

### 6. Add an `onReady` event listener to handle events when the element is mounted

```js
domElement.addEventListener('onReady', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. Add an `onSuccess` event listener to handle events when the payment is successful.

```js
domElement.addEventListener('onSuccess', (event) => {
  /*
    ... Handle event on success
  */
  window.alert(event.detail);
});
```

### 8. Add an `onError` event listener to handle events when the payment has failed.

```js
domElement.addEventListener('onError', (event) => {
  /*
    ... Handle event on error
  */
  window.alert(event.detail);
});
```

### 9. Beautify and deploy!

## Documentation

See the full documentation for `@airwallex/components-sdk` [here](/docs).

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
    <h1>ApplePayButton integration</h1>
    <!-- STEP #3: Add an empty container for the fullFeaturedCard element to be injected into -->
    <div id="applePayButton"></div>
    <script>
      // STEP #2: Initialize the Airwallex global context for event communication
      await window.AirwallexComponentsSDK.init({
        env: 'staging', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      // STEP #4: Create 'fullFeaturedCard' element
      const element = await window.AirwallexComponentsSDK.createElement('applePayButton', {
        // Required, fullFeaturedCard use intent Id and client_secret to prepare checkout
        intent_id: 'replace-with-your-intent-id',
        client_secret: 'replace-with-your-client-secret',
        amount: {
          value: 'replace-with-your-intent-amount',
          currency: 'replace-with-your-intent-currency',
        },
        origin: window.location.origin,
        countryCode: 'replace-with-your-country-code', // merchant country code
      });
      // STEP #5: Mount 'fullFeaturedCard' element
      const domElement = element.mount('applePayButton');

      // STEP #6: Add an event listener to handle events when the element is mounted
      domElement.addEventListener('onReady', (event) => {
        /*
          ... Handle event
        */
        window.alert(event.detail);
      });

      // STEP #7: Add an event listener to handle events when the payment is successful.
      domElement.addEventListener('onSuccess', (event) => {
        /*
          ... Handle event on success
        */
        window.alert(event.detail);
      });

      // STEP #8: Add an event listener to handle events when the payment has failed.
      domElement.addEventListener('onError', (event) => {
        /*
          ... Handle event on error
        */
        console.log(event.detail);
      });
    </script>
  </body>
</html>
```

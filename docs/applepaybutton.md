# Components SDK - Apple Pay Button Integration

The Apple Pay Button allows merchants to seamlessly embed an Apple Pay checkout option on their website. This empowers merchants to control the overall look and feel of their checkout page while offloading payment processing tasks to Airwallex.

**Example of an Apple Pay Button integration**

## Integration Guide

Follow these steps to integrate the Apple Pay Button using our SDK. The code samples are provided in JavaScript.

### 1. Initialize Payment Object

At the start of your file, initialize the Airwallex SDK. You can do this either by importing the SDK or adding it as a script in your HTML.

#### Importing the SDK

```js
import { init } from '@airwallex/components-sdk';

await init({
  env: 'demo', // Choose the Airwallex environment ( 'demo', or 'prod')
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
  env: 'demo', // Choose the Airwallex environment ( 'demo', or 'prod')
});
```

### 2. Create a Container for the Apple Pay Button

Add an empty container in your HTML where the Apple Pay Button will be injected:

```html
<div id="applePayButton"></div>
```

This container will be used to mount the Apple Pay Button element in a later step.

### 3. Create the Apple Pay Button Element

Create the `applePayButton` element using payment object. This element is created with intent details, which are required for preparing the checkout.

```js
import { createElement } from '@airwallex/components-sdk';

const element = await createElement('applePayButton', {
  intent_id: 'replace-with-your-intent-id',
  client_secret: 'replace-with-your-client-secret',
});
```

Additional options can be provided as a second parameter to the `createElement` function for overwriting styles and other functionalities. Refer to the [SDK documentation](https://docs.airwallex.com/components-sdk#createElement) for more details.

### 4. Mount the Apple Pay Button Element

Mount the Apple Pay Button element to the DOM by appending it to your designated container:

```js
const domElement = element.mount('applePayButton');
```

**Note:** Ensure that there are no other elements with the same ID in the document. An element should only be mounted once within a single payment flow.

### 5. Handle the `ready` Event

Add an `ready` event listener to manage events when the element is successfully mounted:

```js
element.on('ready', (event) => {
  // Handle the onReady event
  console.log('Apple Pay Button is ready:', event.detail);
});
```

This event can be used to set a loading state while the checkout screen is being prepared.

### 6. Handle the `onSuccess` Event

Add an `success` event listener to manage events when the payment is successful:

```js
element.on('success', (event) => {
  // Handle the onSuccess event
  console.log('Payment successful:', event.detail);
});
```

### 7. Handle the `error` Event

Add an `error` event listener to manage events when the payment fails:

```js
element.on('error', (event) => {
  // Handle the onError event
  console.log('Payment failed:', event.detail);
});
```

### 8. Beautify and Deploy

Ensure that your integration is visually appealing and thoroughly tested. Once satisfied, deploy your changes to your production environment.

By following these steps, you can successfully integrate the Apple Pay Button on your website and provide a smooth checkout experience for your customers. For comprehensive details, refer to the [Airwallex Components SDK documentation](https://docs.airwallex.com/components-sdk).

Happy coding!

---

This concludes the enhanced readme for integrating the Apple Pay Button using the Airwallex Components SDK. If you have any questions or need further assistance, please refer to our support resources.

## Documentation

See the full documentation for `@airwallex/components-sdk` [here](https://www.airwallex.com/docs/js/payments/applepaybutton/).

## Integration Examples

Check out [airwallex-payment-demo](../integrations/) for integration examples with different web frameworks!

## Full Code Example

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Airwallex Checkout Playground</title>
  <!-- STEP #1: Import @airwallex/components-sdk bundle -->
  <script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
</head>
<body>
  <h1>ApplePayButton integration</h1>
  <!-- STEP #3: Add an empty container for the Apple Pay Button -->
  <div id="applePayButton"></div>
  
  <script>
    (async () => {
      // STEP #2: Initialize the Airwallex global context
      await window.AirwallexComponentsSDK.init({
        env: 'demo',  // Setup which Airwallex env('demo' | 'prod') to integrate with
        enabledElements: ['payments'],
      });

      // STEP #4: Create Apple Pay Button element
      const element = await window.AirwallexComponentsSDK.createElement('applePayButton', {
        // Required, fullFeaturedCard use intent Id and client_secret to prepare checkout
        intent_id: 'replace-with-your-intent-id', // Replace with your intent ID
        client_secret: 'replace-with-your-client-secret', // Replace with your client secret
        amount: {
          value: 'replace-with-your-intent-amount',
          currency: 'replace-with-your-intent-currency',
        },
        countryCode: 'replace-with-your-country-code', // merchant country code
      });

      // STEP #5: Mount the element
      const domElement = element.mount('applePayButton');

      // STEP #6: Handle ready event
      element.on('ready', (event) => {
        window.alert(event.detail);
      });

      // STEP #7: Handle success event
      element.on('success', (event) => {
        window.alert(event.detail);
      });

      // STEP #8: Handle error event
      element.on('error', (event) => {
        console.log(event.detail);
      });
    })();
  </script>
</body>
</html>
```

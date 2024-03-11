# Components SDK - Split Card Element Integration

The Split Card element enables merchants to process a card checkout on their website, with greater control over the look and feel of their checkout page. This element differs from the card element as it allows merchants to embed individual input fields (card number, card expiry, card cvc).

![](assets/splitcard.gif)

\* _An example of a split card integration. Can be customized._

## Guide

The following steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

Want more details? See the integration in [React](/integrations/react/src/components/SplitCard.jsx).

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

### 3. Add empty containers for each card input element to be injected into and a submit button to trigger the payment request

```html
<label>
  Card number
  <div id="cardNumber"></div>
</label>
<label>
  Expiry
  <div id="expiry"></div>
</label>
<label>
  CVC
  <div id="cvc"></div>
</label>
<br />
<button id="submit">Submit</button>
```

We will mount the card elements into the empty divs in step 5 and create a handler for the submit button in step 6.

### 4. Create the split card elements

This creates the specified [Element](/docs/components-sdk#Element) objects. We specify the types as `cardNumber`, `expiry`, and `cvc` respectively.

```js
const cardNumber = await window.AirwallexComponentsSDK.createElement('cardNumber');
const expiry = await window.AirwallexComponentsSDK.createElement('expiry');
const cvc = await window.AirwallexComponentsSDK.createElement('cvc');
```

There are also additional options as a second parameter to the `createElement` function that can overwrite styles and other functions. [See docs](/docs/components-sdk#createElement) for more details.

### 5. Mount the split card elements

Next, we need to mount the card element to the DOM.

```js
const domElement = cardNumber.mount('cardNumber');
expiry.mount('expiry');
cvc.mount('cvc');
```

This function will append the card element to your divs with ids `cardNumber`, `expiry`, and `cvc` respectively, as created above in step 3. **Ensure that there are no other elements in the document with the same ids**.

Each **element should only be mounted once** in a single payment flow.

### 6. Add a button handler to trigger the payment request and listen to the request response.

This handler is called when a customer is ready to make a payment according to the details documented in the Payment Intent, thereby confirming the Payment Intent.

```js
// STEP #6a: Add a button handler
document.getElementById('submit').addEventListener('click', () => {
  window.AirwallexComponentsSDK.payment.confirmPaymentIntent({
    element: cardNumber, // Provide the cardNumber element
    id: 'replace-with-your-intent-id', // Payment Intent ID
    client_secret: 'replace-with-your-client-secret', // Client Secret
  }).then((response) => {
    // STEP #6b: Listen to the request response
    /* Handle response */
    window.alert(JSON.stringify(response));
  });
});
```

`window.AirwallexComponentsSDK.payment.confirmPaymentIntent` will take the cardNumber element you mounted and confirm the payment details entered to the payment intent (provided by the `id` prop). A `client_secret` must be provided to authenticate the checkout process.

More details about the `confirmPaymentIntent` function can be found [here](/docs/components-sdk#confirmPaymentIntent).

### 7. Add an `onReady` event listener to handle events when the element is mounted

```js
domElement.addEventListener('onReady', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 8. Add an `onChange` event listener to listen to the changes in each of the input fields

```js
domElement.addEventListener('onChange', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

`event` will return an object with the field name and whether this field is completed (valid). This can help with validating the fields before users can trigger the submit button to prevent any validation errors.

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
    <h1>Split Card integration</h1>
    <div id="element">
      Card Information
      <!-- STEP #3a: Add empty containers for each card input element to be injected into -->
      <div style={containerStyle}>
        <div>Card number</div>
        <div id="cardNumber"></div>
      </div>
      <div style={containerStyle}>
        <div>Expiry</div>
        <div id="expiry"></div>
      </div>
      <div style={containerStyle}>
        <div>Cvc</div>
        <div id="cvc"></div>
    </div>
    <br />
    <!-- STEP #3b: Add a submit button to trigger the payment request -->
    <button id="submit">Submit</button>

    <script>
      // STEP #2: Initialize the Airwallex global context for event communication
      await window.AirwallexComponentsSDK.init({
        env: 'staging', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      // STEP #4: Create split card elements
      const cardNumber = await window.AirwallexComponentsSDK.createElement('cardNumber');
      const expiry = await window.AirwallexComponentsSDK.createElement('expiry');
      const cvc = await window.AirwallexComponentsSDK.createElement('cvc');

      // STEP #5: Mount split card elements
      const domElement = cardNumber.mount('cardNumber');
      expiry.mount('expiry');
      cvc.mount('cvc');

      // STEP #6a: Add a button handler to trigger the payment request
      document.getElementById('submit').addEventListener('click', () => {
        window.AirwallexComponentsSDK.payment.confirmPaymentIntent({
          element: cardNumber,
          id: 'replace-with-your-intent-id',
          client_secret: 'replace-with-your-client-secret',
        }).then((response) => {
          // STEP #6b: Listen to the request response
          /* handle confirm response in your business flow */
          window.alert(JSON.stringify(response));
        });
      });

      // STEP #7: Add an event listener to ensure the element is mounted
      domElement.addEventListener('onReady', (event) => {
        /*
        ... Handle event
         */
        window.alert(event.detail);
      });

      // STEP #8: Add an event listener to listen to the changes in each of the input fields
      domElement.addEventListener('onChange', (event) => {
        /*
        ... Handle event
         */
        window.alert(event.detail);
      });
    </script>
  </body>
</html>
```

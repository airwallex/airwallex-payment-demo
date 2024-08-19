# Recurring subsequent flow

The Recurring subsequent flow enables shopper to process a payment with an pre-saved payment consent.

### Confirm payment using consent

For CIT subsequent transaction, merchant need query and list available consents and render cvc element to let shopper choose consent and input cvc number to finish transaction.

![](assets/cit.png) \* _An example of a cvc element. Can be customized._

## Guide for `Confirm payment using consent` with CIT flow

For CIT consent, when shoppers trigger a transaction, they will need to select their saved payment consent and enter the respective cvc number to finish the payment. Merchants will only need to integrate the cvc element.

### 1. Initialize Payment Object

At the start of your file, initialize the Airwallex SDK. You can do this either by importing the SDK or adding it as a script in your HTML.

#### Importing the SDK

```js
import { init } from '@airwallex/components-sdk';

const { payment } = await init({
  env: 'demo', // Choose the Airwallex environment ('staging', 'demo', or 'prod')
  origin: window.location.origin, // Set your event target to receive browser event messages
});
```

#### Adding the SDK as a Script

Add the following script in your HTML `<head>`:

```html
<script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
```

Then, initialize the SDK using the global `AirwallexComponentsSDK` object:

```js
const { payment } = await window.AirwallexComponentsSDK.init({
  env: 'demo', // Choose the Airwallex environment ('staging', 'demo', or 'prod')
  origin: window.location.origin, // Set your event target to receive browser event messages
});
```
### 2. Add empty containers for cvc element to be injected into and a submit button to trigger the payment request

```html
<div>List of payment consents</div>
<label>
  CVC
  <div id="cvc"></div>
</label>
<br />
<button id="submit">Submit</button>
```

We will mount the cvc elements into the empty divs in step 5 and create a handler for the submit button in step 6.

### 3. Create the split cvc elements

This creates the specified [Element](/docs-components-sdk#Element) objects. We specify the types as `cvc`.

```js
const cvc = await payment.createElement('cvc');
```

There are also additional options as a second parameter to the `createElement` function that can overwrite styles and other functions. [See docs](/docs-components-sdk#createElement) for more details.

### 4. Mount the cvc elements

Next, we need to mount the cvc element to the DOM.

```js
const domElement = cvc.mount('cvc');
```

This function will append the cvc element to your divs with ids `cvc`, as created above in step 3. **Ensure that there are no other elements in the document with the same ids**.

Each **cvc element should only be mounted once** in a single payment flow.

### 5. Add a button handler to trigger the payment request and listen to the request response.

This handler is called when a customer is ready to make a payment according to the details documented in the Payment Intent, thereby confirming the Payment Intent.

```js
// STEP #6a: Add a button handler
document.getElementById('submit').addEventListener('click', () => {
  cvc.confirm({
    element: cvc, // Provide the cvc element
    id: 'replace-with-your-intent-id', // Payment Intent ID
    client_secret: 'replace-with-your-client-secret', // Client Secret
    payment_consent_id: 'replace-with-your-consent-id', // Payment Consent id of the payment consent the customer had selected
  }).then((response) => {
    // STEP #6b: Listen to the request response
    /* Handle response */
    window.alert(JSON.stringify(response));
  });
});
```

`cvc.confirm` will take the cvc element you mounted and confirm the payment details entered to the payment intent (provided by the `id` prop). A `client_secret` must be provided to authenticate the checkout process.

### 6. Add an `ready` event listener to handle events when the element is mounted

```js
cvc.on('ready', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. Add an `change` event listener to listen to the changes in each of the input fields

```js
cvc.on('change', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

`event` will return an object with the field name and whether this field is completed (valid). This can help with validating the fields before users can trigger the submit button to prevent any validation errors.

### 8. Beautify and deploy!

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
    <h1>Cvc integration</h1>
    <div style="{containerStyle}">
      <div>Cvc</div>
      <div id="cvc"></div>
    </div>
    <br />
    <!-- STEP #3b: Add a submit button to trigger the payment request -->
    <button id="submit">Submit</button>

    <script>
      // STEP #2: Initialize the Airwallex global context for event communication
      const  { payment} = await window.AirwallexComponentsSDK.init({
        env: 'staging', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      // STEP #4: Create cvc element
      const cvcElement = await payment.createElement('cvc');

      // STEP #5: Mount cvc element
      const domElement = cvcElement.mount('cvc');

      // STEP #6a: Add a button handler to trigger the payment request
      document.getElementById('submit').addEventListener('click', () => {
        const confirmRes = await cvcElement.confirm({
          id: intent.id,
          customerId: 'replace-with-your-customer-id', // customer id
          client_secret: 'replace-with-your-client-secret', // client secret
          element: cvcElement,
          payment_consent_id: 'replace-with-your-payment-consent-id', // payment consent id,
        });
        window.alert(JSON.stringify(confirmRes));
      });

      // STEP #7: Add an event listener to ensure the element is mounted
      cvcElement.on('ready', (event) => {
        /*
        ... Handle event
         */
        window.alert(event.detail);
      });

      // STEP #8: Add an event listener to listen to the changes in each of the input fields
      cvcElement.on('change', (event) => {
        /*
        ... Handle event
         */
        window.alert(event.detail);
      });
    </script>
  </body>
</html>
```

# Apple Pay Express Checkout Integration Guide - Airwallex Payment Elements

This comprehensive guide outlines the process of integrating Apple Pay express checkout using Airwallex Payment Elements, enabling a seamless payment experience for your users.

## Step 1: Import Airwallex Payment Elements

Start by importing `airwallex-payment-elements` at the beginning of your file:

```js
import Airwallex from 'airwallex-payment-elements';
```

Alternatively, include the bundle as a script in your HTML head:

```html
<script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
```

## Step 2: Initialize the Airwallex Package

Configure the Airwallex package with the appropriate environment:

```jsx
Airwallex.init({
  env: 'demo', // Choose Airwallex environment ('staging' | 'demo' | 'prod')
  origin: window.location.origin, // Specify your event target for receiving browser events
});
```

## Step 3: Create a Container Element

Add an empty container to house the Apple Pay button:

```jsx
<div id="applePayButton"></div>
```

## Step 4: Create the Apple Pay Button Element

Generate the Apple Pay button element with the desired configuration:

```jsx
const element = Airwallex.createElement('applePayButton', {
  countryCode: "HK", // You business's registration country
  amount: {
    value: '10',
    currency: 'USD'
  },
  merchantCapabilities: ['supports3DS', 'supportsDebit', 'supportsCredit', 'supportsEMV'], // Remove supportsEMV if China UnionPay is not needed
  supportedNetworks: ['visa', 'masterCard', 'chinaUnionPay', 'amex', 'discover'],
  requiredShippingContactFields: ["email", "name", "phone", "postalAddress"], // Customize field combination as necessary
  requiredBillingContactFields: ["postalAddress"]
});
```

## Step 5: Mount the Apple Pay Button Element

Attach the Apple Pay button element to the DOM:

```jsx
const domElement = element.mount('applePayButton');
```

Note: Ensure unique IDs across your document. Mount the element only once per payment flow.

## Step 6: Implement a `validateMerchant` Event Listener

Handle merchant validation when Apple Pay initiates a session:

```jsx
element.on('validateMerchant', async (event) => {
  try {
    const merchantSession = await axios.post('your_backend_server_url_for_payment_session', {
      "validation_url": event?.detail?.validationURL,
      "initiative_context": domain_name_without_https_prefix,
    });

    if (merchantSession) {
      element.completeValidation(merchantSession);
    }
  } catch (error) {
    console.error('Merchant validation error:', error);
  }
});
```

Important: 
* The `initiative_context` accepts a domain name without the `https://` or `http://` protocol prefix.
* Your backend server must invoke the following API and return its response directly:

```
Production Domain: https://api.airwallex.com
Development Domain: https://api-demo.airwallex.com

Endpoint: /api/v1/pa/payment_session/start
Method: POST
Request Body:
{
    "validation_url": "<provided by frontend>",
    "initiative_context": "<your current domain>"
}
```

## Step 7: Implement an `authorized` Event Listener

Manage the flow when a payment is authorized:

```jsx
element.on('authorized', async (event) => {

  const intent = axios.post('your_backend_server_url_for_payment_intent', {
    // Include necessary data for creating a payment intent
  });

  element.confirmIntent( {
    client_secret: intent.client_secret,
  } ).then(() => {
    window.location.href = successUrl;
  } ).catch( (error) => {
    console.warn(error.message);
  });

  // For recurring payments, use `createPaymentConsent`:
  /*
  element.createPaymentConsent({
      client_secret: intent.client_secret,
  }).then(() => {
      window.location.href = successUrl;
  }).catch((error) => {
      console.warn(error.message);
  });
  */
});
```

Note: 
* Your backend should create a payment intent by calling: `POST /api/v1/pa/payment_intents/create`
* For comprehensive API documentation, visit: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents_create/post

## Step 8: Implement an `error` Event Listener

Handle any errors that occur during the payment process:

```jsx
element.on('error', (event) => {
  // console.error('Payment process error:', event);
  // Implement appropriate error handling and user feedback
});
```

## Step 9: (Optional) Implement a `ready` Event Listener

Manage actions when the element is successfully mounted:

```jsx
element.on('ready', (event) => {
  // Update UI to reflect the ready state, e.g., hide loading indicators, enable interactions
});
```

## Step 10: (Optional) Implement a `click` Event Listener

Handle events when the Apple Pay button is clicked:

```jsx
element.on('click', (event) => {
  // Process click event data, e.g., for analytics or user interaction tracking
});
```

Note: Updating amount and currency is not permitted when the Apple Pay button is clicked.

## Step 11: (Optional) Implement a `shippingAddressChange` Event Listener

Manage updates when the shipping address is modified:

```jsx
element.on('shippingAddressChange', async (event) => {

  // Uncomment to log the new shipping address for debugging
  // console.log('Updated shipping address:', event?.detail?.shippingAddress);

  // Allowed shipping address validation
  if (event?.detail?.shippingAddress?.countryCode === 'US') {
    element?.update({
      errors: [
        {
          code: 'shippingContactInvalid',
          contactField: 'countryCode',
          message: 'US shipping is currently unavailable',
        },
      ],
    });
  } else {
    element.update({
      shippingMethods: [
        {
          label: 'Standard Shipping',
          detail: 'Delivery in 5-7 business days',
          amount: '0.00',
          identifier: 'standard',
        },
        {
          label: 'Express Shipping',
          detail: 'Delivery in 2-3 business days',
          amount: '10.00',
          identifier: 'express',
        },
      ],
    });
  }
});
```

Note:

* The available `contactFields` for `shippingContactInvalid` code:

```
phoneNumber
emailAddress
name
phoneticName
postalAddress
addressLines
locality
subLocality
postalCode
administrativeArea
subAdministrativeArea
country
countryCode
```

* The available error codes:

```
shippingContactInvalid
billingContactInvalid
addressUnserviceable
unkown
```

## Step 12: (Optional) Implement a `shippingMethodChange` Event Listener

Handle updates when the shipping method is altered:

```jsx
element.on('shippingMethodChange', async (event) => {

  // Uncomment to log the payment data for debugging
  // console.log(event?.detail?.paymentData);

  // Update total amount and line items based on the selected shipping method
  element.update({
    amount: {
      value: '50.00', // Updated total amount
    },
    lineItems: [
      {
        label: "Product Subtotal",
        type: "final",
        amount: "40.00"
      },
      {
        label: "Express Shipping",
        amount: '10.00',
        type: "final"
      },
    ],
  });
});
```

## Step 13: (Optional) Update Amount and Currency Before Button Click

To modify the amount and currency before the Apple Pay button is clicked:

* Ensure the Apple Pay `element` is in the `ready` state before updating.
* Remember that updating amount and currency within the `click` event is not allowed.

```jsx
element.update({ 
   amount: { 
       value: '36', 
       currency: 'USD' 
   } 
});
```

## Step 14: (Optional) Canceling an Authorized Payment

In some scenarios, you may need to halt the payment process even after the user has authorized it. This step demonstrates how to cancel an authorization and stop the payment from proceeding.

```jsx
element.on('authorized', async (event) => {
  // Uncomment the following line for debugging purposes
  // console.log('Payment data:', event?.detail?.paymentData);

  // Example: Cancel payment for Visa cards
  if (event?.detail?.paymentData?.token?.paymentMethod?.network === 'Visa') {
    element?.update({
      errors: [
        {
          code: 'unknown',
          message: 'Visa payments are currently not supported',
        },
      ],
    });

    // Alternative: Fail the payment without displaying an error message
    /*
    element?.update({
      errors: []
    });
    */
  }
});
```

Note: Use this feature judiciously, as canceling payments after authorization may lead to user frustration. Always provide clear communication to the user about why a payment cannot be processed.


## To determine whether the current browser supports Apple Pay


```jsx
function isApplePaySupported() {  
    return window.ApplePaySession && ApplePaySession.canMakePayments();  
}  

// Testing
if (isApplePaySupported()) {  
    console.log("This browser supports Apple Pay.");  
} else {  
    console.log("This browser does not support Apple Pay.");  
}
```


By following these steps, you'll successfully integrate Apple Pay express checkout using Airwallex Payment Elements, providing a smooth and efficient payment experience for your users.

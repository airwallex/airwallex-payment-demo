# Google pay express checkout

**Airwallex Payment Elements - Google Pay Button express checkout Integration**

**Guide**

### 1 & 2: Import and Initialize Payment Elements

Start by importing `@airwallex/components-sdk` at the beginning of your file:

```js
import { init } from '@airwallex/components-sdk';

await init({
  env: 'demo', // Choose the Airwallex environment ('demo' | 'prod')
  enabledElements: ['payments'],
});

```

Alternatively, include the bundle as a script in your HTML head:

```html
<script src="https://static.airwallex.com/components/sdk/v1/index.js"></script>
await window.AirwallexComponentsSDK.init({
  env: 'demo', // Choose the Airwallex environment ('demo' | 'prod')
  enabledElements: ['payments'],
});
```

### 3. Add an empty container for the google pay element to be injected into

```jsx
    <div id="googlePayButton"></div>
  
```

### 4.  Create the google pay button element

This creates the specified [Element](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs#Element) object. We specify the type as `googlePayButton`.

```jsx
import {createElement } from '@airwallex/components-sdk';

const element = createElement('googlePayButton', {
	 countryCode: "HK",
	 billingAddressRequired: true,
	 billingAddressParameters: {
		 format: 'FULL',
	 },
	 amount: {
		value: '10',
		currency: 'USD',
	 },
        shippingOptionParameters: {
          defaultSelectedOptionId: 'shipping-001',
          shippingOptions: [
            {
              id: 'shipping-001',
              label: '$0.00: Free shipping',
              description: 'Free Shipping delivered in 5 business days.',
            },
            {
              id: 'shipping-002',
              label: '$1.99: Standard shipping',
              description: 'Standard shipping delivered in 3 business days.',
            },
            {
              id: 'shipping-003',
              label: '$1000: Express shipping',
              description: 'Express shipping delivered in 1 business day.',
            },
          ],
        },
	 shippingAddressRequired: true,
	 shippingOptionRequired: true,
	 shippingAddressParameters: {
		 phoneNumberRequired: true,
	 },
	 callbackIntents: ["PAYMENT_AUTHORIZATION", "SHIPPING_ADDRESS", "SHIPPING_OPTION"]// if you don't need listen to shippingAddressChange and shippingMethodChange, pass ["PAYMENT_AUTHORIZATION"] only
});
```

### 5.  Mount the google pay button element

Next, we need to mount the google pay button element to the DOM.

```jsx
const domElement = element.mount('googlePayButton');
```

This function will append the google pay button element to your div with an id `googlePayButton` as created in step 3. **Ensure that there are no other elements in the document with the same id**.

The **element should only be mounted once** in a single payment flow.

### 6. Add an `ready` event listener to handle events when the element is mounted

```jsx
element.on('ready', (event) => {
  // set loading state false
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. Add an `click` event listener to handle events when the element is clicked

```jsx
element.on('click', (event) => {
  // collect click event
});
```

This can be used to collect click events or do other things when button is clicked

### 8. **Add an** `shippingAddressChange` **event listener to handle events when the shipping address is changed**

```jsx
element.on('shippingAddressChange', async (event) => {
	console.log(event?.detail?.shippingAddress)
  let paymentDataRequestUpdate = {};
	// get available shipping methods by shipping address
  const response = await getShippingOptions(shippingAddress);
	if (response && response.success) {
		paymentDataRequestUpdate.shippingOptionParameters = {
			defaultSelectedOptionId: 'shipping-001',
			shippingOptions: [{
                id: "shipping-001",
                label: "Free: Standard shipping",
                description: "Free Shipping delivered in 5 business days."
            }]
		};
	} else {
		paymentDataRequestUpdate.error = {
			reason: 'SHIPPING_ADDRESS_UNSERVICEABLE',
			message: response.message,
			intent: 'SHIPPING_ADDRESS'
		};
	}
  element.update(paymentDataRequestUpdate);
});
```

This listener helps update the available shipping methods based on the user's shipping address.

### 9. Add `shippingMethodChange` event listener to handle events when shipping method is changed

```jsx
	element.on('shippingMethodChange', async (event) => {
			element.update({
                amount: {
                    value: '12',
                },
			    totalPriceLabel: "Total"
				transactionId: "Optional, but highly encouraged for troubleshooting.",
				displayItems: [
                    {
                    label: "Subtotal",
                    type: "SUBTOTAL",
                    price: "11.00",
                    },
                    {
                    label: "Tax",
                    type: "TAX",
                    price: "1.00",
                }]
		});
	});
```

Update the cart amount, line items, and total price label when the user changes the shipping method.

### 10. Add `authorized` event listener to handle events when payment is authorized by apple pay

```jsx
element.on('authorized', async (event) => {
try {
// create intent by payment data
const intent = axios.post('https://pci-api-demo.airwallex.com/api/v1/pa/payment_intents/create', {
            merchant_order_id: 'order id',
            request_id: 'uuid',
            currency: 'USD',
            amount: 36
        })


		if (isRecurring) {
					element.createPaymentConsent({
						client_secret: intent.client_secret,
					}).then(() => {
						location.href = successUrl;
					}).catch((error) => {
						console.warn(error.message);
					});
				} else {
					element.confirmIntent({
						client_secret: intent.client_secret,
					}).then(() => {
						location.href = successUrl;
					}).catch((error) => {
						console.warn(error.message);
					});
				}
	});
} catch {

 element?.update({
       error: {
            intent: 'PAYMENT_AUTHORIZATION',
            reason: 'PAYMENT_DATA_INVALID',
            message: 'MASTERCARD is unserviceable',
          }
    });
}
	
```

This listener will handle the event when Google Pay authorizes the payment, allowing you to create an order and confirm the intent.

Note:

* Your backend should create a payment intent by calling: `POST /api/v1/pa/payment_intents/create`
* For comprehensive API documentation, visit: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents_create/post

### 11. Add `error` event listener to handle events when payment is authorized by googlepay

```jsx

element.on('error', (event) => {
		console.error('There was an error', event);
});
```

This listener helps handle any errors that occur during the payment process.

### 12: (Optional) Canceling an Authorized Payment

In some scenarios, you may need to halt the payment process even after the user has authorized it. This step demonstrates how to cancel an authorization and stop the payment from proceeding.

```jsx
element.on('authorized', async (event) => {
  // Uncomment the following line for debugging purposes
  // console.log('Payment data:', event?.detail?.paymentData);

  // Example: Cancel payment for Visa cards
  if (event?.detail?.paymentData?.token?.paymentMethod?.network === 'Visa') {
    element?.update({
       error: {
            intent: 'PAYMENT_AUTHORIZATION',
            reason: 'PAYMENT_DATA_INVALID',
            message: 'MASTERCARD is unserviceable',
          }
    });
  }
});
```

Note: Use this feature judiciously, as canceling payments after authorization may lead to user frustration. Always provide clear communication to the user about why a payment cannot be processed.

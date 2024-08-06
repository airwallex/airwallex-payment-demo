# Apple pay / Google pay express checkout

**Airwallex Payment Elements - Apple Pay Button express checkout Integration**

**Guide**

### 1. At the start of your file, import `airwallex-payment-elements`.
```js
import Airwallex from 'airwallex-payment-elements';
```

or add the bundle as a script in your HTML head
```js
<script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
```

### 2. **Initialize the Airwallex package with the appropriate environment**

```jsx
Airwallex.init({
  env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
  origin: window.location.origin, // Setup your event target to receive the browser events message
});
```

### 3. **Add an empty container for the card element to be injected into and a submit button to trigger the payment request**
    
    ```jsx
    <div id="applePayButton"></div>
    
    ```
    
### 4.  **Create the applePayButton element**

This creates the specified [Element](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs#Element) object. We specify the type as **`applePayButton`**.

```jsx
const element = Airwallex.createElement('applePayButton', {
	 countryCode: "HK",
	 requiredShippingContactFields: ["email", "name", "phone", "postalAddress"],
	 requiredBillingContactFields: ["postalAddress"]
});
```

### 5.  **Mount the card element**

Next, we need to mount the card element to the DOM.

```jsx
const domElement = element.mount('applePayButton');
```

This function will append the card element to your div with an id `applePayButton` as created in step 3. **Ensure that there are no other elements in the document with the same id**.

The **element should only be mounted once** in a single payment flow.

### 6. **Add an `ready` event listener to handle events when the element is mounted**

```jsx
element.on('ready', (event) => {
  // set loading state false
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. **Add an `click` event listener to handle events when the element is clicked**

```jsx
element.on('click', (event) => {
  // collect click event
});
```

This can be used to collect click events or do other things when button is clicked

### 8. **Add an `validateMerchant` event listener to handle events when the apple pay need start session.**

```jsx
element.on('validateMerchant', async (event) => {
	if (awxExpressCheckoutSettings.isProductPage) await addToCart();
	const merchantSession = await startPaymentSession(event?.detail?.validationURL);
	const { paymentSession, error } = merchantSession;

	if (paymentSession) {
		element.completeValidation(paymentSession);
	}
});
```

This is required to validate the merchant session with Apple Pay servers.

### 9. **Add an** `shippingAddressChange` **event listener to handle events when the shipping address is changed**

```jsx
element.on('shippingAddressChange', async (event) => {
	console.log(event?.detail?.shippingAddress)
	// get available shipping methods by shipping address
	// update the shipping methods, amount, lintItems and totalPriceLabel
    element.update({
		amount: {
			value: orderInfo?.total?.amount || 0,
		},
		lineItems: getAppleFormattedLineItems(cart.orderInfo.displayItems),
		shippingMethods: getAppleFormattedShippingOptions(shipping.shippingOptions),
		totalPriceLabel: totalPriceLabel,
	});
});
```

This listener helps update the available shipping methods based on the user's shipping address.

### 10. Add `shippingMethodChange` event listener to handle events when shipping method is changed

```jsx
	element.on('shippingMethodChange', async (event) => {
        element.update({
            amount: {
                value: cart?.orderInfo?.total?.amount || 0,
            },
            lineItems: getAppleFormattedLineItems(cart.orderInfo.displayItems),
            totalPriceLabel: checkout.totalPriceLabel,
        });
	});
```

Update the cart amount, line items, and total price label when the user changes the shipping method.

### 11. Add `authorized` event listener to handle events when payment is authorized by apple pay

```jsx
element.on('authorized', async (event) => {
		let payment = event?.detail?.paymentData || {};
		payment['shippingMethods'] = shippingMethods;
		// create order by your server
		const order = await createOrder(payment, 'applepay');

		if (isRecurring) {
            element.createPaymentConsent({
                client_secret: order.clientSecret,
            }).then(() => {
                location.href = successUrl;
            }).catch((error) => {
                console.warn(error.message);
            });
        } else {
            element.confirmIntent({
                client_secret: clientSecret,
            }).then(() => {
                location.href = successUrl;
            }).catch((error) => {
                console.warn(error.message);
            });
        }
	});
```

This listener will handle the event when Apple Pay authorizes the payment, allowing you to create an order and confirm the intent.

### 12. Add `error` event listener to handle events when payment is authorized by applepay

```jsx

element.on('error', (event) => {
	console.error('There was an error', event);
});
```

This listener helps handle any errors that occur during the payment process.
# Airwallex Payment Elements - Documentation

See `node_modules/airwallex-payment-elements/types` for a more detailed overview of the props available for each function.

<br>

## Payment Integrations

- [**Card**](/docs/card.md)
- [**HPP (Hosted Payment Page)**](/docs/hpp.md)
- [**Drop in**](/docs/dropin.md)
- [**Full Featured Card**](/docs/fullfeaturedcard.md)
- [**Split Card**](/docs/splitcard.md)
- [**Wechat**](/docs/wechat.md)
- [**Redirect**](/docs/redirect.md)

<br>

## Functions

Initialization

- [loadAirwallex](#loadAirwallex)

Interacting with Elements

- [Element](#Element)
- [createElement()](#createElement)
- [getElement()](#getElement)
- [destroyElement()](#destroyElement)
- [setElement()](#setElement)

Payment Processing

- [redirectToCheckout](#redirectToCheckout)
- [confirmPaymentIntent](#confirmPaymentIntent)
- [confirmPaymentIntentWithSavedCard](#confirmPaymentIntentWithSavedCard)

Querying the API

- [createPaymentMethod](#createPaymentMethod)
- [getPaymentIntent](#getPaymentIntent)
- createPaymentContract

Common Errors

- [Errors](#common-errors)

<br>

## Initialization

### loadAirwallex

The following will inject a script with the Airwallex bundle into your site's HTML head.

```ts
await Airwallex.loadAirwallex(options);
```

An equivalent step is:

```html
<script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
```

Running `loadAirwallex` and embedding the above script in your document head will initialize a global variable in your document called `window.Airwallex`. This variable consists of all the functions to process payments.

| Option   | Default  | Description                                                                                    |
| -------- | -------- | ---------------------------------------------------------------------------------------------- |
| `env`    | `'prod'` | Indicate which airwallex integration env your merchant site would like to connect with         |
| `origin` | `''`     | Your checkout website origin url, aka merchant checkout page's 'window.location.origin' field. |
| `locale` | `'en`    | i18n localization config, 'en' or 'zh'                                                         |
| `fonts`  | []       | Fonts options used to customize the payment elements                                           |

<br>

## Interacting with Elements

### Element

Functions and field components that can be used during checkout integration. Elements are rendered as iframes.

Elements can be called via `createElement()` or `getElement()`. Can be destroyed by `destroyElement()`

| Props        | Type                        | Description                                                               |
| ------------ | --------------------------- | ------------------------------------------------------------------------- |
| `options`    | Payment Options (see below) | Refer to the options when call createElement                              |
| `iframe`     | HTMLIFrameElement, null     | The iframe element after mount to the DOM                                 |
| `domElement` | string, HTMLElement         | Refer to the DOM element you call mount function                          |
| `mount()`    | (domElement) => void        | Mount payment element to your HTML DOM element for checkout               |
| `blur()`     | () => void                  | Use this function to blur the input html element                          |
| `focus()`    | () => void                  | Use this function to focus the input html element                         |
| `unmount()`  | () => void                  | Use this function to unmount the element, opposite to mount function      |
| `update()`   | (options?) => void          | Use this function to update the element option after creating the element |

<br>

Elements can post events its parent container (your website) when a shopper interacts with the checkout element. Here are the events it can post:

| Event Code                  | Purpose                                                                                                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onReady                     | The event fires when a given element resource has loaded.                                                                                                                                |
| onSubmit                    | The event is raised when confirm the intent. It fires after the click Pay button or calling confirmPaymentIntent function.                                                               |
| onSuccess                   | The event fires when a intent is confirm with Airwallex                                                                                                                                  |
| onError                     | Error events are fired at various targets for different kinds of errors with shopper interaction. See error codes [here](https://www.airwallex.com/docs/api?v=2019-09-09#/Errors).       |
| onCancel                    | The event fires when shopper click cancel button when interact with the payment form.                                                                                                    |
| onFocus                     | The event is raised when the shopper sets focus on an input by click or tab switch interaction.                                                                                          |
| onBlur                      | The event is raised when an input in element loses focus.                                                                                                                                |
| onChange                    | The events fire when the user commits a value change to a input. This may be done, for example, by clicking outside of the input or by using the Tab key to switch to a different input. |
| onClick                     | The event is raised when the user clicks on an input element.                                                                                                                            |
| onDynamicCurrencyConversion | The events fire when merchant enable Dynamic Currency Conversion (DCC) feature and shopper is confirm payment with an intent which match DCC scenario                                    |

<br>

### createElement

An element function. Creates a payment element for checkout. Returns an [Element](#Element).

```ts
const element = Airwallex.createElement(type, options);
```

| Props     | Required? | Enum                                                                                                               | Description                                                          |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `type`    | true      | 'cardNumber', 'expiry', 'cvc', 'paymentRequestButton', 'card', 'wechat', 'redirect', 'dropIn', 'fullFeaturedCard', | The type of element to be created, of the element field types        |
| `options` | false     |                                                                                                                    | Additional options for each element, different for each element type |

All the following options are optional with the exception of `'intent'`.

| Element              | Props                   | Type                        | Description                                                                                                                                                  |
| -------------------- | ----------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cardNumber           | `intent` (**required**) | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                      | `disabled`              | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                      | `autoCapture`           | boolean                     | Indicate whether to capture immediate when authentication success, apply when shopper using card payment method                                              |
|                      | `placeholder`           | string                      | The placeholder attribute specifies a short hint that describes the expected value of an input field                                                         |
|                      | `style`                 | InputStyle                  | Style for cardNumber element                                                                                                                                 |
|                      | `authFormContainer`     | string                      | Container for authentication form                                                                                                                            |
| expiry               | `disabled`              | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                      | `placeholder`           | string                      | The placeholder attribute specifies a short hint that describes the expected value of an input field                                                         |
|                      | `style`                 | InputStyle                  | Style for expiry element                                                                                                                                     |
| cvc                  | `disabled`              | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                      | `placeholder`           | string                      | The placeholder attribute specifies a short hint that describes the expected value of an input field                                                         |
|                      | `cycLength`             | number                      | Indicate cvc's length                                                                                                                                        |
|                      | `style`                 | InputStyle                  | Style for expiry element                                                                                                                                     |
|                      | `authFormContainer`     | string                      | Container for authentication form                                                                                                                            |
| paymentRequestButton | `intent` (**required**) | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                      | `autoCapture`           | boolean                     | Indicate whether to capture immediate when authentication success                                                                                            |
|                      | `requestPayerName`      | boolean                     | Indicate if the payment form collect payer name is required                                                                                                  |
|                      | `requestPayerEmail`     | boolean                     | Indicate if the payment form collect payer email is required                                                                                                 |
|                      | `requestPayerPhone`     | boolean                     | Indicate if the payment form collect payer phone is required                                                                                                 |
|                      | `requestShipping`       | boolean                     | Indicate if the payment form collect shipping info from shopper is required                                                                                  |
|                      | `shippingOptions`       | string                      | The shippingOptions must be supplied when requestShipping is true for the customer to proceed in the flow.                                                   |
|                      | `authFormContainer`     | string                      | Container for authentication form                                                                                                                            |
| card                 | `disabled`              | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                      | `autoCapture`           | boolean                     | Indicate whether to capture immediate when authentication success                                                                                            |
|                      | `style`                 | InputStyle                  | Style for expiry element                                                                                                                                     |
|                      | `authFormContainer`     | string                      | Container for authentication form                                                                                                                            |
| wechat               | `intent` (**required**) | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
| redirect             | `intent` (**required**) | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                      | `method`                | PaymentMethodWithRedirect[] | An array of the following available methods: `'alipaycn'`, `'alipayhk'` , `'gcash'` , `'dana'`, `'kakaopay'` , `'tng'`                                       |
| dropIn               | `intent` (**required**) | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                      | `components`            | PaymentMethodType[]         | The payment method component your website would like to integrate with                                                                                       |
|                      | `autoCapture`           | boolean                     | Indicate whether to capture immediate when authentication success, apply when shopper using card payment method                                              |
|                      | `withBilling`           | boolean                     | Indicate to improve 3DS experience, indicate if the payment form will collect billing info from shopper                                                      |
|                      | `style`                 | InputStyle                  | Style for cardNumber element                                                                                                                                 |
|                      | `authFormContainer`     | string                      | Container for authentication form                                                                                                                            |
| fullFeaturedCard     | `intent` (**required**) | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                      | `autoCapture`           | boolean                     | Indicate whether to capture immediate when authentication success                                                                                            |
|                      | `withBilling`           | boolean                     | Indicate to improve 3DS experience, indicate if the payment form will collect billing info from shopper                                                      |
|                      | `style`                 | InputStyle                  | Style for cardNumber element                                                                                                                                 |
|                      | `authFormContainer`     | string                      | Container for authentication form                                                                                                                            |

<br>

### getElement

An element function. This function queries the created element by type. There can only be one type of element per page.

```ts
const element = Airwallex.getElement(type);
```

| Props  | Required? | Enum                                                                                                               | Description |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `type` | true      | 'cardNumber', 'expiry', 'cvc', 'paymentRequestButton', 'card', 'wechat', 'redirect', 'dropIn', 'fullFeaturedCard', |

### destroyElement

An element function. This function destroys the created element. The element can no longer be accessed after this call. Returns a boolean.

```ts
Airwallex.destroyElement(type);
```

| Props  | Required? | Enum                                                                                                               | Description |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `type` | true      | 'cardNumber', 'expiry', 'cvc', 'paymentRequestButton', 'card', 'wechat', 'redirect', 'dropIn', 'fullFeaturedCard', |

<br>

## Payment Processing

<br>

### redirectToCheckout

Used for the Hosted Payment Page (HPP) method that redirects the customer to an Airwallex checkout page.

```ts
Airwallex.redirectToCheckout(props);
```

| Props           | Required? | Default  | Description                                                                                                                          |
| --------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `id`            | true      |          | The intent id you shopper want to checkout                                                                                           |
| `client_secret` | true      |          | The client_secret when you create payment intent, contain in the response                                                            |
| `env`           | false     | `'prod'` | Indicate which airwallex integration env your merchant site would like to connect with                                               |
| `theme`         | false     |          | Option with limited support for HPP page style customization                                                                         |
| `customer_id`   | false     |          | Checkout for known customer, refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/Intro) |
| `components`    | false     |          | The payment method component your website would like to integrate with                                                               |
| `successUrl`    | false     |          | The success return url after shopper succeeded the payment (must be https)                                                           |
| `failUrl`       | false     |          | The failed return url when shopper can not fulfill the payment intent (must be https)                                                |
| `cancelUrl`     | false     |          | The cancel return url when shopper canceled the payment intent (must be https)                                                       |
| `logoUrl`       | false     |          | The logo url of your website you want to show in the HPP head                                                                        |
| `locale`        | false     |          | i18n localization config, 'en' or 'zh'                                                                                               |

<br>

### confirmPaymentIntent

The following function confirms payment intent with element and the rest of the payment method info. Only required for the card payment method.

Takes in either a PaymentMethod with a guest checkout without a previously created contract, or a PaymentMethod with a pre-existing user/contract.

```ts
const confirmResult = await Airwallex.confirmPaymentIntent(paymentMethod);
```

PaymentMethod (without being attached to be an existing customer)

| Props                    | Required? | Type                | Description                                                                                                                                                  |
| ------------------------ | --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element`                | true      | Element             | Element create by call createElement interface with 'cardNumber' element type                                                                                |
| `client_secret`          | true      | string              | The client_secret when you create payment intent, contain in the response                                                                                    |
| `id`                     | true      | string              | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
| `paymentMethod`          | false     | PaymentMethodDetail | The payment method detail return by call createPaymentMethod                                                                                                 |
| `payment_method_options` | false     | {}                  | Only apply for card payment, use this option to provide additional config to confirm payment intent                                                          |
| `methodId`               | false     | string              | The payment method id if you have, can be create by call createPaymentMethod                                                                                 |
| `customer_id`            | false     | string              | The payment method component your website would like to integrate with                                                                                       |
| `save_payment_method`    | false     | boolean             | Indicate whether to save this payment method for future payment                                                                                              |
| `error`                  | false     | {}                  | Response error when failed to call createPaymentMethod                                                                                                       |
| `payment_consent_id`     | false     | string              | The payment consent id if you have, can be create by createPaymentConsent                                                                                                       |


<br>

### confirmPaymentIntentWithSavedCard

The following function confirms a payment intent and the rest of the payment method details with a saved card. Only required for the cvc element.

Takes in the PaymentMethod prop from above.

```ts
const confirmResult = await Airwallex.confirmPaymentIntentWithSavedCard(
  paymentMethod,
);
```

<br>

## Querying the API

### createPaymentMethod

This function is used to create a payment method for checkout, the created payment method can be saved in your system. Takes in a client secret and PaymentMethod. Returns a PaymentMethod if successful.

```ts
const paymentMethod = await createPaymentMethod(clientSecret, PaymentMethod); // only need element and customer_id for PaymentMethod
```

<br>

### getPaymentIntent

This function gets intent `id` and `client secret` from browser side to directly query Airwallex API. Returns a PaymentIntent if successful.

```ts
const intent = await Airwallex.getPaymentIntent(id, client_secret);
```

## Common Errors

1. `Airwallex is not defined`

- Have you loaded Airwallex before using Airwallex functions?
- If you're using CDN, have you changed the bundle version from `x.x.x` to the latest version?
- eg. `https://checkout.airwallex.com/assets/bundle.x.x.x.min.js` is invalid

2. `Access denied, authentication failed`

- Have you replaced your intent id and client secret?

```js
// Enter your Payment Intent secret keys here
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
```

3. `The resource with ID int_xxxxxxxxx cannot be found.`

- Does the environment you initialized Airwallex in (eg. demo, staging, or prod) match the environment you retrieved your intent keys in?
- If you ran `loadAirwallex` in demo environment, did you also create your intent in the demo environment?

# Airwallex Payment Elements - Documentation

This reference documents every object and method available in Airwallex’s browser-side JavaScript library `airwallex-payment-elements`. You can also check out `node_modules/airwallex-payment-elements/types` for a more detailed overview of the parameters and properties available for each method.


## Table of contents

### Initialize Airwallex

- [Initialize Airwallex](#initialize-airwallex-1)

### Interact with Embedded Elements

- [Create an Element](#create-an-element)
- [Get an Element](#get-an-element)
- [Destroy an Element](#destroy-an-element)
- [Update an Element](#update-an-element)
- [Clear an Element](#clear-an-element)
- [Mount an Element](#mount-an-element)
- [Unmount an Element](#unmount-an-element)
- [Blur an Element](#blur-an-element)
- [Focus an Element](#focus-an-element)

### Listen to Element events

- [Events](#listen-to-element-events-1)

### Process payments

- [Confirm a PaymentIntent](#confirmPaymentIntent)
- [Create a PaymentConsent](#createPaymentConsent)
- [Hosted Payment Page](#redirectToCheckout)
- [Get Payment Intent](#getPaymentIntent)
- [Get Browser Info](#getBrowserInfo) Use for API integration
- [Get Device Finger Print](#getDeviceFingerprint) Use for API integration

### Appendix

- [Address object](#address-object)
- [ApplePayRequestOptions object](#applePayRequestOptions-object)
- [Billing object](#billing-object)
- [Components object](#components-object)
- [FontOptions object](#fontoptions-object)
- [Payment method object](#payment-method-object)
- [Payment method options object](#payment-method-options-object)
- [theme object](#theme-object)
- [Recurring options](#RecurringOptions)
- [Redirect Payment methods](#PaymentMethodWithRedirect)
- [Qrcode Payment methods](#PaymentMethodWithQrcode)
- [Payment Method types](#PaymentMethodType)


<br>

## Initialize Airwallex

First, you will need to load airwallex js script and initialize the payment environment.

### npm package user
Make sure you update the SDK package version in the `package.json` file.

```ts
// from the library
import { loadAirwallex } from '@airwallex/airwallex-payment-elements';
loadAirwallex({
  env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
  origin: window.location.origin, // Set up your event target to receive the browser events message
});
```

### script import user
If you are initializing from the CDN, include the `airwallex-payment-elements` script on your checkout page by adding it to the `head` of your HTML file.

```ts
// from CDN
<script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>;

Airwallex.init({
  env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
  origin: window.location.origin, // Set up your event target to receive the browser events message
});
```

`init()` and `loadAirwallex()` support various options to set up the payment environment as shown in the following table.

### `options` object properties

| **Property** | **Required?** | **Type**        | **Default value** | **Description**                                                                                                                                                                                                |
| ------------ | ------------- | --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`        | No            | enum            | `'prod'`          | The Airwallex environment you want to integrate your application with. Options include: `staging`, `demo`, `prod`                                                                                                                                 |
| `origin`     | No            | string          | `''`              | Your website’s origin url, used for communication with element – `window.location.origin` field.                                                                                                                                                    |
| `locale`     | No            | string          | `'en'`            | The locale for your website. Options include: `en`, `zh`, `ja`, `ko`, `ar`, `es`, `de`, `fr`, `it`, `nl`                                                                                                                               |
| `fonts`      | No            | FontOptions\[\] | \[\]              | Fonts options to customize the font styles of payment Elements. Airwallex supports two font weights: regular (400) and bold (700). You can specify font options using `src`, `family` and `weight` attributes. |

**Note** The Airwallex package only needs to be initialized once in your application.

<br>

## Interact with Embedded Elements

### Create an Element

This method creates an instance of an individual Element. It takes the `type` of Element to create and an optional `options` object. Elements are rendered as iframes.

```ts
Airwallex.createElement(type, options);
```

```ts
// If using NPM
import { createElement } from '@airwallex/airwallex-payment-elements';
const element = createElement(type, options);
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**                                                                                                                                                                                                                     |
| ------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | Yes           | enum     | The type of element you are creating. Possible values: `cardNumber`, `expiry`, `cvc`, `paymentRequestButton`, `card`, `qrcode`, `redirect`, `dropIn`, `fullFeaturedCard`, `applePayButton`, `googlePayButton`, `directDebit` |
| `options`     | No            | object   | Options for creating an Element, which differ for each Element. Refer to the following table.                                                                                                                                       |

#### `options` object properties

| **Element type**   | **Property**                   | **Required?** | **Type**                                                                                                                  | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card`             | `disabled`                     | No            | boolean                                                                                                                   | Indicates if the `card` Element input is enabled or disabled. By default, the value is set to `false`.                                                                                                                                                                                                                                                                                                                                                                       |
|                    | `autoCapture`                  | No            | boolean                                                                                                                   | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.                                                                                                                                                                                                                                                                                                            |
|                    | `allowedCardNetworks`                        | No            | enum                                                                                                                 | The card networks that you would like to use for this element, Options include: `visa`, `mastercard`, `maestro`, `unionpay`, `amex`                                                                                                                                                                                                    |
|                    | `authFormContainer`            | No            | string                                                                                                                    | The id of the container for the authentication form used in 3D Secure authentication.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `cardNumber`       | `disabled`                     | No            | boolean                                                                                                                   | Indicates if the `card` Element input is enabled or disabled. By default, the value is set to `false`.                                                                                                                                                                                                                                                                                                                                                                       |
|                    | `autoCapture`                  | No            | boolean                                                                                                                   | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.                                                                                                                                                                                                                                                                                                            |
|                    | `allowedCardNetworks`                        | No            | enum                                                                                                                 | The card networks that you would like to use for this element, Options include: `visa`, `mastercard`, `maestro`, `unionpay`, `amex`. 
|                    | `placeholder`                        | No            | string                                                                                                                 | A short hint to suggest the expected value of an input field to the shopper.                                                                                                                                                                                                                                                                         |
|                    | `authFormContainer`            | No            | string                                                                                                                    | Container for the authentication form used in 3D Secure authentication.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `expiry`           | `disabled`                     | No            | boolean                                                                                                                   | Indicates if the `expiry` Element input is enabled or disabled. By default, the value is set to `false`.                                                                                                                                                                                                                                                                                                                                                                     |
|                    | `placeholder`                  | No            | string                                                                                                                    | A short hint to suggest the expected value of an input field to the shopper.                    |                                                                      
| `cvc`              | `disabled`                     | No            | boolean                                                                                                                   | Indicates if the `cvc` Element input is enabled or disabled. By default, the value is set to `false`.                                                                                                                                                                                                                                                                                                                                                                        |
|                    | `placeholder`                  | No            | string                                                                                                                    | A short hint to suggest the expected value of an input field to the shopper.                                                                                                                                                                                                                                                                                                                                                                                                 |
|                    | `cvcLength`                    | No            | number                                                                                                                    | Indicates CVC length                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                    | `authFormContainer`            | No            | string                                                                                                                    | Container for the authentication form used in 3D Secure authentication.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `fullFeaturedCard` | `intent`                       | No            | Intent                                                                                                                    | The `id` and `client_secret` of the PaymentIntent you want to checkout. It’s required when `mode`is set to `payment` else optional.                                                                                                                                                                                                                                                                                                                                          |
|                    | `client_secret`                | No            | string                                                                                                                    | The `client_secret` of the Customer object. It's required when `mode` is set to `recurring` else optional.                                                                                                                                                                                                                                                                                                                                                                   |
|                    | `mode`                         | No            | Mode                                                                                                                      | The checkout mode for the shopper. Use `payment` to save shopper’s card details during payment. The shopper can initiate subsequent payments using the saved card details. Use `recurring` to save shopper’s card details without payment. You or the shopper can initiate subsequent payments using the saved card details.                                                                                                                                                 |
|                    | `customer_id`                  | No            | string                                                                                                                    | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post 'https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post') API response                                                                                                                                  |
|                    | `autoCapture`                  | No            | boolean                                                                                                                   | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.                                                                                                                                                                                                                                                                                                            |
|                    | `withBilling`                  | No            | boolean                                                                                                                   | Used to increase the likelihood of 3DS frictionless checkout. Set this to `true` if you want the payment form to collect billing information from the shopper. Only applies to card payment method.                                                                                                                                                                                                                                                                          |
|                    | `style`                        | No            | InputStyle                                                                                                                | Style for the `fullFeaturedCard` Element                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                    | `authFormContainer`            | No            | string                                                                                                                    | Container for the authentication form used in 3D Secure authentication.                                                                                                                                                                                                                                                                                                                                                                                                      |
|                    | `recurringOptions`             | No            | RecurringOptions                                                                                               |  Applicable to the card payment method when mode is `recurring` See [save payment details for future payments](https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments 'https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments') .                                                                                                                                                                                                                                        |
| `dropIn`           | `client_secret`                | Yes           | string                                                                                                                    | The client_secret of the PaymentIntent you want to confirm and complete.                                                                                                                                                                                                                                                                                                                                                                                                     |
|                    | `currency`                     | Yes           | string                                                                                                                    | The three-letter ISO currency code representing the currency of the PaymentIntent or PaymentConsent.                                                                                                                                                                                                                                                                                                                                                                         |
|                    | `intent_id`                    | No            | Intent                                                                                                                    | The `id` of the PaymentIntent you want to confirm and complete. It’s required when `mode`is set to `payment` else optional.                                                                                                                                                                                                                                                                                                                                                  |
|                    | `mode`                         | No            | Mode                                                                                                                      | The checkout mode for the shopper. Use `payment` to save shopper’s card details during payment. The shopper can initiate subsequent payments using the saved card details. Use `recurring` to save shopper’s card details without payment. You or the shopper can initiate subsequent payments using the saved card details.                                                                                                                                                 |
|                    | `customer_id`                  | No            | string                                                                                                                    | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post 'https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post') API response                                                                                                                                  |
|                    | `methods`                   | No            | PaymentMethodType\[\]                                                                                                     | The payment methods that your payment form wants to integrate with. An array of PaymentMethodType                                                                                                                                                                                                                            |
|                    | `autoCapture`                  | No            | boolean                                                                                                                   | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.                                                                                                                                                                                                                                                                                                            |
|                    | `withBilling`                  | No            | boolean                                                                                                                   | Used to increase the likelihood of 3DS frictionless checkout. Set this to `true` if you want the payment form to collect billing information from the shopper. Only applies to card payment method.                                                                                                                                                                                                                                                                          |
|                    | `style`                        | No            | InputStyle                                                                                                                | Style for the `cardNumber Element` - only applies to card payment method                                                                                                                                                                                                                                                                                                                                                                                                     |
|                    | `authFormContainer`            | No            | string                                                                                                                    | Container for the authentication form used in 3D Secure authentication.                                                                                                                                                                                                                                                                                                                                                                                                      |
|                    | `country_code`                 | No            | string                                                                                                                    | The country code of the shipping address. This field is required for the following payment methods: `online_banking`, `bank_transfer`, `seven_eleven`, `skrill`, `sofort`, `trustly`, `paysafecash`, `paysafecard`, `satispay`, `paysera`, `paypal`, `bitpay`                                                                                                                                                                                                                |
|                    | `recurringOptions`             | No            | RecurringOptions                                                                                                          | Applicable to the card payment method when mode is `recurring`. See [save payment details for future payments](https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments 'https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments') .                                                                                                                                                                                                 |
|                    | `applePayRequestOptions`       | No            | [applePayRequestOptions](#applepayrequestoptions-object)                                                                  | Applicable if you want to offer Apple Pay as a checkout option. Providing your `countryCode` is mandatory. For details, see [applePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions 'https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions')                                                                                                          |
|                    | `googlePayRequestOptions`      | No            | [googlePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropinGooglePayOptions.md) | Applicable if you want to offer google Pay as a checkout option. Providing your `countryCode` and `merchantId` are mandatory. For details, see [DropInGooglePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropinGooglePayOptions.md 'https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropinGooglePayOptions.md')                                                                                              |
|                    | `shopper_name`                 | No            | string                                                                                                                    | The shopper name that will prefill for some local payment methods        |
|                    | `shopper_phone`                 | No            | string                                                                                                                    | The shopper name that will prefill for some local payment methods        |
|                    | `shopper_email`                 | No            | string                                                                                                                    | The shopper name that will prefill for some local payment methods        |
|                    | `billing`                 | No            | Billing                                                                                                                    | The billing info that you collected from shopper       |
| `redirect`         | `intent`                       | Yes           | Intent                                                                                                                    | The `id` and `client_secret` of the PaymentIntent you want to checkout.                                                                                                                                                                                                                                                                                                                                                                                                      |
|                    | `method`                       | Yes           | PaymentMethodWithRedirect\[\]                                                                                             | An array of the available methods. For example, `alipaycn`, `alipayhk` , `gcash` , `dana`, `kakaopay` , `tng`, etc. Depending on the payment method, you might need to provide additional properties in `options`. See [payment method table](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/redirect.md#redirect-element-attributes 'https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/redirect.md#redirect-element-attributes') . |
|                    | `mode`                         | No            | Mode                                                                                                                      | The checkout mode for the shopper. By default, the mode is set to `payment`. Set it to `recurring` if you want to save the payment method for future payments with the shopper. Supported payment methods include Alipay, AlipayHK, Gcash, Dana, KakaoPay, Touch ‘n Go. Only merchant-initiated subsequent payments are supported.                                                                                                                                           |
|                    | `client_secret`                | No            | string                                                                                                                    | The client_secret of the Customer object. It's required when `mode` is set to `recurring` else optional.                                                                                                                                                                                                                                                                                                                                                                     |
|                    | `customer_id`                  | No            | string                                                                                                                    | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post 'https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post') API response                                                                                                                                  |
| `qrcode`           | `intent`                       | Yes           | Intent                                                                                                                    | The `id` and `client_secret` of the PaymentIntent you want to checkout.                                                                                                                                                                                                                                                                                                                                                                                                      |
|                    | `qrcodeMethod`                 | Yes           | PaymentMethodWithQrcode\[\]                                                                                               | The payment method you want to redirect the shopper to. For example, `alipayhk` , `wechatpay`, `kakaopay`, etc.                                 |
| `applePayButton`   | `intent_id`                    | No            | string                                                                                                                    | The `id` of the PaymentIntent you want to checkout. It's required for payment mode and optional for recurring mode                                                                                                                                                                                                                                                                                                                                                           |
|                    | `client_secret`                | Yes           | string                                                                                                                    | If the intent_id provided, this should be the client_secret of the intent. If no intent_id provided, this should be the client_secret of the customer                                                                                                                                                                                                                                                                                                                        |
|                    | `mode`                         | No            | Mode                                                                                                                      | Checkout mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                    | `customer_id`                  | No            | string                                                                                                                    | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post 'https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post') API response                                                                                                                                  |
|                    | `amount`                       | Yes           | {value: number; currency:string;}                                                                                         | The amount and currency of the PaymentIntent.                                                                                                                                                                                                                                                                                                                                                                                                                                |
|                    | `country_code`                 | Yes           | string                                                                                                                    | Your two-letter ISO 3166 country code.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                    | `autoCapture`                  | No            | boolean                                                                                                                   | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from Create a PaymentIntent API will be used.                                                                                                                                                                                                                                                                                                              |
|                    | `buttonType`                   | No            | string                                                                                                                    | The type of button you want to display on your payment form, for example, 'donate' https://developer.apple.com/documentation/apple\_pay\_on\_the\_web/displaying\_apple\_pay\_buttons\_using\_css                                                                                                                                                                                                                                                                            |
|                    | `buttonColor`                  | No            | string                                                                                                                    | The color of the button. Default value is 'black'                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                    | `totalPriceLabel`              | No            | string                                                                                                                    | The business name your shoppers will see when they look for the charge on their bank or credit card statement. For example, "COMPANY, INC."                                                                                                                                                                                                                                                                                                                                  |
|                    | `lineItems`                    | No            | ApplePayJS.ApplePayLineItem[];                                                                                            | A set of line items that explain recurring payments and/or additional charges.                                                                                                                                                                                                                                                                                                                                                                                               |
|                    | `billingContact`               | No            | ApplePayJS.ApplePayPaymentContact                                                                                         | The billing contact information for the shopper.                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                    | `requiredBillingContactFields` | No            | ApplePayJS.ApplePayContactField[];                                                                                        | The billing information that you require from the shopper to process the transaction.                                                                                                                                                                                                                                                                                                                                                                                        |
|                    | `shippingContact`              | No            | ApplePayJS.ApplePayPaymentContact                                                                                         | Shipping contact information for the user.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                    | `shippingMethods`              | No            | ApplePayJS.ApplePayShippingMethod[];                                                                                      | The list of shipping methods available for a payment request.                                                                                                                                                                                                                                                                                                                                                                                                                |
|                    | `shippingType`                 | No            | ApplePayJS.ApplePayShippingType;                                                                                          | An optional value that indicates how purchased items are to be shipped.                                                                                                                                                                                                                                                                                                                                                                                                      |
|                    | `supportedCountries`           | No            | string[ ]                                                                                                                 | A list of two-letter ISO 3166 country codes, used to limit payments to cards from specific countries or regions.                                                                                                                                                                                                                                                                                                                                                             |
|                    | `applicationData`              | No            | string                                                                                                                    | Optional user-defined data.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                    | `totalPriceType`               | No            | string                                                                                                                    | A type that indicates whether a line item is final or pending.                                                                                                                                                                                                                                                                                                                                                                                                               |
|                    | `supportedNetworks`            | No            | string[]                                                                                                                  | Card networks supported by the merchant. if not configured, supportedNetworks will automatically configure based on merchant account settings. For more details, please check the [apple pay doc](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916122-supportednetworks)                                                                                                                                                           |
|                    | `merchantCapabilities`         | No            | string[]                                                                                                                  | Payment capabilities supported by the merchant. If the supportedNetworks don't contains chinaUnionPay, please don't include supportsEMV as well. For more details, please check the [apple pay doc](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916123-merchantcapabilities)                                                                                                                                                      |
| `googlePayButton`  |                                |               |                                                                                                                           | see [googlePayButtonOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/googlePaybuttonOptions.md 'https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/googlePaybuttonOptions.md') for details                                          |                                                                                                                                                                 


### Get an Element

This method looks up a previously created Element by its type.

```ts
Airwallex.getElement(type);
```

```ts
// If using NPM
import { getElement } from '@airwallex/airwallex-payment-elements';
const element = getElement(type);
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**                                                                                                                                                                                                  |
| ------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | Yes           | enum     | The type of element you are retrieving. Options include: '`cardNumber`', '`expiry`', '`cvc`', '`paymentRequestButton`', '`card`', '`qrcode`', '`redirect`', '`dropIn`', '`fullFeaturedCard`', '`applePayButton`', `directDebit` |

#### Returns

`Airwallex.getElement` returns one of the following:

- An instance of an Element with a matching type.

- `null`, when no Element with a matching type has been created.


### Destroy an Element

Destroys the created Element. The Element can no longer be accessed after this call.

```ts
Airwallex.destroyElement(type);
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**                                                                                                                                                                                                  |
| ------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | Yes           | enum     | The type of element you are destroying. Options include: '`cardNumber`', '`expiry`', '`cvc`', '`paymentRequestButton`', '`card`', '`qrcode`', '`redirect`', '`dropIn`', '`fullFeaturedCard`', '`applePayButton`', `directDebit` |

#### Returns

`Airwallex.destroyElement` returns true or false to indicate the success or failure of the call.


### Update an Element

Updates the options the Element was initialized with. Updates are merged into the existing configuration.

See `options` [object](/docs#options-object-properties-1) properties for the options you can update.

```ts
element.update(options);
```


### Clear an Element

Clear the value of the Element was initialized with.

```ts
element.clear();
```


### Mount an Element

Attaches your Element to the DOM by accepting a DOM element. You need to create a container DOM element to mount an Element.

```ts
element.mount(domElement);
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description** |
| ------------- | ------------- | -------- | --------------- |
| `domElement`  | Yes           | `string | HTMLElement`    | The DOM element where your Element will be mounted. |


### Unmount an Element

Unmounts the Element from the DOM. Call `element.mount` to re-attach it to the DOM.

```ts
element.unmount();
```


### Blur an Element

Blurs the Element.

```ts
element.blur();
```


### Focus an Element

Focuses the Element.

```ts
element.focus();
```

## Listen to Element Events

Elements can post events to its parent container (your payment page) when a shopper interacts with the checkout Element. You can listen to events and register the event using the `addEventListener()` method. In this method, specify the name of the event you want to register this handler for, and the code that comprises the handler function you want to run in response to it. For example,

```ts
const element = mount('airwallex-element');
element.addEventListener('onReady', (event) => {
  // handle event
});
```

| **Event**                     | **Purpose**                                                                                                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onReady`                     | Triggered when the Element is fully rendered and can accept `element.focus` calls.                                                                                                                   |
| `onSubmit`                    | Triggered when confirming the PaymentIntent either when the shopper clicks the Pay button or when you call `confirmPaymentIntent( )` method.                                                         |
| `onSuccess`                   | Triggered when Airwallex confirms the PaymentIntent.                                                                                                                                                 |
| `onError`                     | Triggered for various error events during shopper interaction. See [error codes](https://www.airwallex.com/docs/api?v=2019-09-09#/Errors 'https://www.airwallex.com/docs/api?v=2019-09-09#/Errors'). |
| `onCancel`                    | Triggered when the shopper clicks the Cancel button when interacting with the payment form.                                                                                                          |
| `onFocus`                     | Triggered when the Element gains focus.                                                                                                                                                              |
| `onBlur`                      | Triggered when the Element loses focus.                                                                                                                                                              |
| `onChange`                    | Triggered when the Element’s value changes. For example, by clicking outside the input field or using the tab key to switch to a different input field.                                              |
| `onClick`                     | Triggered when the shopper clicks on an Element.                                                                                                                                                     |
| `onDynamicCurrencyConversion` | Triggered when Dynamic Currency Conversion (DCC) is enabled and the shopper confirms the PaymentIntent with DCC.                                                                                     |
| `onPendingVerifyAccount` | Triggered when the bank account needs to be verified | 


## Process payments

### confirmPaymentIntent

Airwallex uses a PaymentIntent object to track a payment when your shopper first checks out, through to a successful payment. For more information, see [Payment Intents](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

This method confirms the PaymentIntent using payment details collected by the Element. Only required for the card payment method.

When called, this method will attempt to complete any required actions, such as 3DS authentication. The shopper will be redirected to the `return_url` you provide once the confirmation is complete.

```ts
Airwallex.confirmPaymentIntent(paymentMethod);
```

#### Method parameters

| **Parameter**   | **Required?** | **Type** | **Description**                                                                                                                                                               |
| --------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `paymentMethod` | Yes           | string   | The PaymentMethod associated with a Customer as part of a PaymentConsent or a PaymentMethod for a guest Customer. See PaymentMethod object properties in the following table. |

#### `PaymentMethod` object properties

| **Property**             | **Required?** | **Type**                                               | **Description**                                                                                                                                                                                                                                                                                                                                |
| ------------------------ | ------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`                | Yes           | Element                                                | The `card` Element type created by `createElement( )`. For Split Card, use `cardNumber`                                                                                                                                                                                                                                                        |
| `intent_id`                     | Yes           | string                                                 | The `intent_id` of the PaymentIntent you want to confirm and complete.                                                                                                                                                                                                                                                                                |
| `client_secret`          | Yes           | string                                                 | The `client_secret` of the PaymentIntent you want to confirm and complete.                                                                                                                                                                                                                                                                     |
| `payment_method`         | No            | [payment_method](#paymentmethod-object)                | Use this to provide the payment method details such as billing address, cardholder name, etc, when confirming the payment. See [payment_method object properties]((docs#payment_method-object))                                                                                                                                                                            |
| `payment_method_options` | No            | [payment_method_options](#paymentmethodoptions-object) | Use this to provide the payment method options such as auto capture flag when confirming the payment. See [payment_method_options object properties](docs#payment_method_options-object)                                                                                                                                                                                       |
| `payment_consent_id`     | No            | string                                                 | The `id` of the PaymentConsent for initiating scheduled or unscheduled payments with saved card details. See [Save payment details for future payments](https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments 'https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments') . |


### createPaymentConsent

Airwallex allows you to create a PaymentConsent that represents the consent between you and the shopper on the future use of the saved payments details associated with a Customer. For more information, see [Payment Consents](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Consents/Intro).

This method creates a PaymentConsent, which may be be used to confirm a PaymentIntent in subsequent payments.

```ts
Airwallex.createPaymentConsent(options);
```

#### `options` object properties

| **Property**        | **Required?** | **Type** | **Description**                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`           | Yes           | Element  | The Element type created by `createElement( )` that you are using to collect payment details – either `card` or `cardNumber` Elements.                                                                                                                                                                                  |
| `intent_id`         | No            | string   | The `id` of the PaymentIntent you want to confirm and complete with the PaymentConsent.                                                                                                                                                                                                                                 |
| `client_secret`     | Yes           | string   | To save card details during payment, specify `intent_id` and provide the `client_secret` of the PaymentIntent you want to confirm and complete. To save card details without a payment, do not specify `intent_id` but provide the `client_secret` of the Customer object.                                              |
| `customer_id`       | Yes           | string   | The `id` of the Customer for whom the consent is created – the `id` returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post 'https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post') API response |
| `currency`          | No            | string   | The three-letter ISO currency code representing the currency of the initial PaymentIntent to verify the PaymentConsent.                                                                                                                                                                                                 |
| `payment_method_id` | No            | string   | Provide the payment method attached to the Customer else create a new one.                            |
| `cardname` | No            | string   | Provide the card name for this payment consent                            |
| `next_triggered_by` | Yes            | enum   | Options include: `customer`, `merchant`                            |
| `billing` | No            | Billing   | The billing info for this consent                       |
| `connected_account_id` | No            | string   | It is to be used by the platform to indicate the connected entity in the transaction                       |


**For merchant-initiated payments**

| **Property**              | **Required?** | **Type** | **Description**                                                                |
| ------------------------- | ------------- | -------- | ------------------------------------------------------------------------------ |
| `merchant_trigger_reason` | Yes           | string   | The reason why you triggered the payment, set to `scheduled` or `unscheduled`. |


### redirectToCheckout

Redirects shoppers to a payment page hosted by Airwallex to securely collect their payment information. When the shopper completes their purchase, they are redirected back to your website.

```ts
Airwallex.redirectToCheckout(options);
```

#### `options` object properties

| **Property**              | **Required?** | **Type**                                                                                                                  | **Description**                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent_id`               | No            | string                                                                                                                    | The `id` of the PaymentIntent you want to check out.                                                                                                                                                                                                                                                                                                                |
| `client_secret`           | Yes           | string                                                                                                                    | The `client_secret` of the PaymentIntent as returned in Create a PaymentIntent response.                                                                                                                                                                                                                                                                            |
| `mode`                    | No            | string                                                                                                                    | The checkout mode for the shopper. Options include: `payment`, `recurring`                                                                                                                                                                                                                                                                                          |
| `env`                     | No            | string                                                                                                                    | The Airwallex environment you want to integrate your application with. Options include: `staging`, `demo`, `prod`                                                                                                                                                                                                                                                   |
| `currency`                | Yes           | string                                                                                                                    | The three-letter ISO currency code representing the currency of the PaymentIntent or PaymentConsent.                                                                                                                                                                                                                                                                |
| `autoCapture`             | No            | boolean                                                                                                                   | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used. Only supported for card payments.                                                                                                                                                                 |
| `customer_id`             | No            | string                                                                                                                    | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post 'https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post') API response                         |
| `methods`              | No            | PaymentMethodType\[\]                                                                                                                | The payment methods your payment form wants to integrate with. Refer to PaymentMethodType.                                                                                                   |
| `successUrl`              | No            | string                                                                                                                    | The URL (https) to which Airwallex should send shoppers when payment is successful.                                                                                                                                                                                                                                                                                 |
| `failUrl`                 | No            | string                                                                                                                    | The URL (https) to which Airwallex should send shoppers when payment fails.                                                                                                                                                                                                                                                                                         |
| `cancelUrl`               | No            | string                                                                                                                    | The URL (https) to which Airwallex should send shoppers when payment is canceled.                                                                                                                                                                                                                                                                                   |
| `logoUrl`                 | No            | string                                                                                                                    | The URL of the logo for your website you want to display on the hosted payment page’s header.                                                                                                                                                                                                                                                                       |
| `locale`                  | No            | string                                                                                                                    | The locale for your payment page. Options include: `en`, `zh`, `ja`, `ko`, `ar`, `fr`, `es`, `de`, `it`, `nl`                                                                                                                                                                                                                                                                               |
| `showTermLink`            | No            | boolean                                                                                                                   | Indicates whether you want to show legal and privacy terms                                                                                                                                                                                                                                                                                                          |
| `withBilling`             | No            | boolean                                                                                                                   | Used to increase the likelihood of 3DS frictionless checkout. Set this to `true` if you want the payment form to collect billing information from the shopper. Only applies to card payment method.                                                                                                                                                                 |
| `country_code`            | No            | string                                                                                                                    | The two-letter ISO country code of the shopper. Required if you want to integrate with `bank_transfer`, `online_banking`, `skrill` or `seven_eleven` payment methods                                                                                                                                                                                                |
| `shopper_name`            | No            | string                                                                                                                    | Applies to PPRO payment methods only. The name of the shopper - must be minimum of 3 characters, up to 100 characters allowed.                                                                                                                                                                                                                                      |
| `shopper_phone`           | No            | string                                                                                                                    | Applies to PPRO payment methods only. The phone number of the shopper.                                                                                                                                                                                                                                                                                              |
| `shopper_email`           | No            | string                                                                                                                    | Applies to PPRO payment methods only. The email of the shopper.                                                                                                                                                                                                                                                                                                     |
| `recurringOptions`           | No            | RecurringOptions                                                                                                                    | Applicable to the card payment method when mode is `recurring`.                                                                                                                                                                                                                                                                                                     |
| `disableAutoRedirect`           | No            | boolean                                                                                                                    | Set to `true` if you want to get redirect url and redirect by yourself.                                                                                                                                                                                                                                                                                                     |
| `applePayRequestOptions`  | No            | [ApplePayRequestOptions](#applepayrequestoptions-object)                                                                  | Applicable if you want to offer Apple Pay as a checkout option. Providing your `countryCode` is mandatory. For details, see [applePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions 'https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions') |
| `googlePayRequestOptions` | No            | [HppGooglePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hppGooglePayOptions.md) | Applicable if you want to offer Google Pay as a checkout option. Providing your `countryCode` is mandatory. For details, see [googlePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hppGooglePayOptions.md 'https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hppGooglePayOptions.md')                   |


### Get Payment Intent

Get payment intent instead of calling [api](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents__id_/get) by your self.

```ts
Airwallex.getPaymentIntent(intent_id, client_secret);
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**                                                                                                                                                                                                  |
| ------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent_id`        | Yes           | string     | The intent id that you want to get |
| `client_secret`        | Yes           | string     | The `client_secret` of the intent id. Notice this secret expires soon |

#### Returns

Returns the intent detail.


### Get Device Finger Print
Insert the airwallex track js file which would used for risk control.

```ts
Airwallex.getDeviceFingerprint({ intent_id, env });
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**                                                                                                                                                                                                  |
| ------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent_id`        | Yes           | string     | The intent id you want to pay, if not provided will generate a UUID |
| `env`        | Yes           | enum     | The airwallex env you want to use, Options inlucde: `staging`, `demo`, `prod` |

#### Returns

Returns the string of device id which would used for confirm payment intent.


### Get Browser Info
Return the browser info of current device. It will also call the `getDeviceFingerprint` to provider the `device_id` in the response

```ts
Airwallex.getBrowserInfo({ intent_id, env });
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**                                                                                                                                                                                                  |
| ------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent_id`        | Yes           | string     | The intent id you want to pay, if not provided will generate a UUID |
| `env`        | Yes           | enum     | The airwallex env you want to use, Options inlucde: `staging`, `demo`, `prod` |

#### Returns

Returns the [browser info object](/docs#browser-info-object).


## Appendix

### Address object

| **Property**   | **Required?** | **Type** | **Description**                            |
| -------------- | ------------- | -------- | ------------------------------------------ |
| `city`         | Yes           | string   | Shopper’s city                             |
| `country_code` | Yes           | string   | Shopper’s two-letter ISO 3166 country code |
| `postcode`     | No            | string   | Shopper’s post code                        |
| `state`        | No            | string   | Shopper’s state                            |
| `street`       | Yes           | string   | Shopper’s street                           |


### ApplePayRequestOptions object

Additional Apple Pay customization options for the button style and configuration for payment processing capabilities, billing and shipping information. ApplePayJS is imported from "@types/applepayjs"

| **Property**                   | **Required?** | **Type**                               | **Description**                                                                                                                                                                                                                                                                                                         |
| ------------------------------ | ------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `countryCode`                  | Yes           | string                                 | Your two-letter ISO 3166 country code, for example, 'US'                                                                                                                                                                                                                                                                |
| `buttonType`                   | No            | string                                 | The type of button you want to display on your payment form, for example, 'donate' https://developer.apple.com/documentation/apple\_pay\_on\_the\_web/displaying\_apple\_pay\_buttons\_using\_css                                                                                                                       |
| `buttonColor`                  | No            | string                                 | The color of the button. Default value is 'black'                                                                                                                                                                                                                                                                       |
| `totalPriceLabel`              | No            | string                                 | The business name your shoppers will see when they look for the charge on their bank or credit card statement. For example, "COMPANY, INC."                                                                                                                                                                             |
| `lineItems`                    | No            | ApplePayJS.ApplePayLineItem\[\];       | A set of line items that explain recurring payments and/or additional charges.                                                                                                                                                                                                                                          |
| `billingContact`               | No            | ApplePayJS.ApplePayPaymentContact      | The billing contact information for the shopper.                                                                                                                                                                                                                                                                        |
| `requiredBillingContactFields` | No            | ApplePayJS.ApplePayContactField\[\];   | The billing information that you require from the shopper to process the transaction.                                                                                                                                                                                                                                   |
| `shippingContact`              | No            | ApplePayJS.ApplePayPaymentContact      | Shipping contact information for the user.                                                                                                                                                                                                                                                                              |
| `shippingMethods`              | No            | ApplePayJS.ApplePayShippingMethod\[\]; | The list of shipping methods available for a payment request.                                                                                                                                                                                                                                                           |
| `shippingType`                 | No            | ApplePayJS.ApplePayShippingType;       | An optional value that indicates how purchased items are to be shipped.                                                                                                                                                                                                                                                 |
| `supportedCountries`           | No            | string\[\]                             | A list of two-letter ISO 3166 country codes, used to limit payments to cards from specific countries or regions.                                                                                                                                                                                                        |
| `applicationData`              | No            | string                                 | Optional user-defined data.                                                                                                                                                                                                                                                                                             |
| `totalPriceType`               | No            | string                                 | A type that indicates whether a line item is final or pending.                                                                                                                                                                                                                                                          |
| `supportedNetworks`            | No            | string[]                               | Card networks supported by the merchant. if not configured, supportedNetworks will automatically configure based on merchant account settings. For more details, please check the [apple pay doc](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916122-supportednetworks)      |
| `merchantCapabilities`         | No            | string[]                               | Payment capabilities supported by the merchant. If the supportedNetworks don't contains chinaUnionPay, please don't include supportsEMV as well. For more details, please check the [apple pay doc](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916123-merchantcapabilities) |


#### Billing object

| **Property**    | **Required?** | **Type**                   | **Description**         |
| --------------- | ------------- | -------------------------- | ----------------------- |
| `email`         | No            | string                     | Shopper’s email         |
| `first_name`    | Yes           | string                     | Shopper’s first name    |
| `last_name`     | Yes           | string                     | Shopper’s last name     |
| `date_of_birth` | No            | string                     | Shopper’s date of birth |
| `phone_number`  | No            | string                     | Shopper’s phone number  |
| `address`       | No            | [Address](#address-object) | Shopper’s address.      |


#### components object

| **Property** | **Required?** | **Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------ | ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Components` | No            | Array    | The available payment methods: 'card', 'wechatpay', 'alipaycn', 'alipayhk', 'gcash', 'dana', 'kakaopay', 'tng', 'poli', 'fpx', 'online_banking', 'bank_transfer', 'permatanet', 'alfamart', 'indomaret', 'doku_ewallet', 'enets', 'payeasy', 'seven_eleven', 'konbini', 'tesco_lotus', 'grabpay', 'skrill', 'eps', 'giropay', 'ideal', 'multibanco', 'p24', 'sofort', 'trustly', 'bancontact', 'dragonpay', 'blik', 'mybank', 'paybybankapp', 'verkkopankki', 'maxima', 'narvesen', 'paypost', 'perlas_terminals', 'paysafecash', 'paysafecard', 'paysera', 'satispay', 'family_mart', 'hi_life', 'sam_kiosk', 'axs_kiosk', 'bigc', 'esun', 'permata_atm', 'boost', 'shopee_pay', 'paypal', 'payu', 'ovo', 'bitpay', 'truemoney'; |


### FontOptions object

| **Property** | **Required?** | **Type** | **Description**                                                                                                        |
| ------------ | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `family`     | No            | string   | The font family, for example, `'AxLLCircular',`                                                                        |
| `src`        | No            | string   | The font source, for example, `src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',` |
| `weight`     | No            | string   | Airwallex supports two font weights: regular (400) and bold (700).                                                     |


#### payment_method object

| **Property** | **Required?** | **Type**                   | **Description**               |
| ------------ | ------------- | -------------------------- | ----------------------------- |
| `card`       | No            | {name: string; }           | The name of the cardholder    |
| `billing`    | No            | [Billing](#billing-object) | Shopper’s billing information |


#### payment_method_options object

| **Property** | **Required?** | **Type**                  | **Description**                                                                                                                                                                                         |
| ------------ | ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card`       | No            | {auto_capture: boolean; } | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from Create a PaymentIntent API will be used. Only applicable to card payment method. |


#### theme object

| **Property** | **Required?** | **Type**        | **Description**                                                                                                                             |
| ------------ | ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `fonts`      | No            | FontOptions\[\] | Fonts options to customize the font styles of payment Elements. You can specify font options using `src`, `family` and `weight` attributes. |

#### browser info object
```ts
interface GetBrowserInfoResponse {
  /**
   * The height of the screen
   */
  screen_height: number;
  /**
   * The width of the screen
   */
  screen_width: number;
  /**
   * The color depth of the screen
   */
  screen_color_depth: number;
  /**
   * The language of browser
   */
  language: string;
  /**
   * The offset between browser time zone and UTC in minutes
   */
  timezone: number;
  /**
   * The browser infos
   */
  browser: {
    /**
     * Indicates if the browser supports java
     */
    java_enabled: boolean;
    /**
     * Indicates if the browser supports javascript
     */
    javascript_enabled: boolean;
    /**
     * The user agent of current session
     */
    user_agent: string;
  };
}
```

#### RecurringOptions


| **Property Name**   | **Type**  | **Required**  | **Default value**      | **Description**                        |
| ------------ | ------------- | --------------- | --- | ----------------------- |
| next_triggered_by | enum | true | | The subsequent transactions are triggered by, Options include: `merchant`, `customer` |
| merchant_trigger_reason | enum | false | `unscheduled`  | The reason why merchant trigger transaction. Options include: `scheduled`, `unscheduled` |
| currency | string | true |  | Currency of the initial PaymentIntent to verify the PaymentConsent. Three-letter ISO currency code |
| connected_account_id | string | false  |  | It is to be used by the platform to indicate the connected entity in the transaction |

#### PaymentMethodWithRedirect
```ts
type PaymentMethodWithRedirect =
  | 'alipaycn'
  | 'alipayhk'
  | 'gcash'
  | 'dana'
  | 'kakaopay'
  | 'tng'
  | 'rabbit_line_pay'
  | 'poli'
  | 'fpx'
  | 'online_banking'
  | 'bank_transfer'
  | 'permatanet'
  | 'alfamart'
  | 'indomaret'
  | 'doku_ewallet'
  | 'enets'
  | 'payeasy'
  | 'seven_eleven'
  | 'konbini'
  | 'tesco_lotus'
  | 'grabpay'
  | 'skrill'
  | 'eps'
  | 'giropay'
  | 'ideal'
  | 'multibanco'
  | 'p24'
  | 'sofort'
  | 'trustly'
  | 'bancontact'
  | 'dragonpay'
  | 'blik'
  | 'mybank'
  | 'paybybankapp'
  | 'verkkopankki'
  | 'maxima'
  | 'narvesen'
  | 'paypost'
  | 'perlas_terminals'
  | 'paysafecash'
  | 'paysafecard'
  | 'paysera'
  | 'satispay'
  | 'family_mart'
  | 'hi_life'
  | 'sam_kiosk'
  | 'axs_kiosk'
  | 'bigc'
  | 'esun'
  | 'permata_atm'
  | 'boost'
  | 'shopee_pay'
  | 'paypal'
  | 'payu'
  | 'ovo'
  | 'bitpay'
  | 'truemoney'
  | 'atome'
  | 'duit_now'
  | 'pay_now'
  | 'prompt_pay'
  | 'go_pay'
  | 'linkaja'
  | 'jenius_pay';
```

#### PaymentMethodWithQrcode
```ts
type PaymentMethodWithQrcode = 'alipayhk' | 'kakaopay' | 'wechatpay';
```

#### PaymentMethodType
```ts
type DirectDebitPaymentMethod =
  | 'ach_direct_debit'
  | 'bacs_direct_debit'
  | 'becs_direct_debit'
  | 'sepa_direct_debit';

type PaymentMethodType =
  | 'googlepay'
  | 'applepay'
  | 'card'
  | 'wechatpay'
  | PaymentMethodWithRedirect
  | DirectDebitPaymentMethod;

```

# Airwallex Payment Elements - Documentation

This reference documents every object and method available in Airwallex’s browser-side JavaScript library `airwallex-payment-elements`. You can also check out `node_modules/airwallex-payment-elements/types` for a more detailed overview of the parameters and properties available for each method.

<br>


## Table of contents

### Initialize Airwallex

- [Initialize Airwallex](#initialize-airwallex-1)

### Interact with Embedded Elements

- [Create an Element](#create-an-element)
- [Get an Element](#get-an-element)
- [Destroy an Element](#destroy-an-element)
- [Update an Element](#update-an-element)
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

### Appendix

- [Address object](#address-object)
- [ApplePayRequestOptions object](#applePayRequestOptions-object)
- [Billing object](#billing-object)
- [Components object](#components-object)
- [FontOptions object](#fontoptions-object)
- [Payment method object](#payment-method-object)
- [Payment method options object](#payment-method-options-object)
- [theme object](#theme-object)

<br>

## Initialize Airwallex

 First, you will need to import the `airwallex-payment-elements` SDK and then initialize the package. 

 ```ts
 Airwallex.init(options);

Airwallex.loadAirwallex(options);
 ```

This will initialize `window.Airwallex` global variable in your document. Make sure you update the SDK package version in the `package.json` file.

```ts
// from the library 
import { loadAirwallex } from '@airwallex/airwallex-payment-elements';
loadAirwallex({
 env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
 origin: window.location.origin, // Set up your event target to receive the browser events message
})
```

If you are initializing from the CDN, include the `airwallex-payment-elements` script on your checkout page by adding it to the `head` of your HTML file.

```ts
// from CDN
<script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>

Airwallex.init({
  env: 'demo', // Setup which Airwallex env('demo' | 'prod') to integrate with
  origin: window.location.origin, // Set up your event target to receive the browser events message
});
```

`init()` and `loadAirwallex()` support various options to set up the payment environment as shown in the following table.

### `options` object properties

| **Property** | **Required?** | **Type**         | **Default value** | **Description**     |
| ------------ | ------------- | ---------------- | ----------------- | ------------------- |
| `env`        | No            | enum             | `'prod'`          | The Airwallex environment you want to integrate your application with.   |
| `origin`     | No            | string           | `''`              | Your website’s origin url – `window.location.origin` field.      |
| `locale`     | No            | string           | `'en'`            | The locale for your website. Options include: `en`, `zh`, `ja`, `ko`, `ar`, `fr`   |
| `fonts`      | No            | FontOptions\[\] | \[\]             | Fonts options to customize the font styles of payment Elements. Airwallex supports two font weights: regular (400) and bold (700).  You can specify font options using `src`, `family` and `weight` attributes. |

**Note** The Airwallex package only needs to be initialized once in your application.

<br>

## Interact with Embedded Elements

### Create an Element

This method creates an instance of an individual Element. It takes the `type` of Element to create and an optional `options` object. Elements are rendered as iframes. 

```ts
Airwallex.createElement(type, options)
```

```ts
// If using NPM
import { createElement } from '@airwallex/airwallex-payment-elements';
const element = createElement(type, options)
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**   |
| ------------- | ------------- | -------- | ----------------- |
| `type`        | Yes           | enum     | The type of element you are creating. Possible values: '`cardNumber`', '`expiry`', '`cvc`', '`paymentRequestButton`', '`card`', '`wechat`', '`redirect`', '`dropIn`', '`fullFeaturedCard`', '`applePayButton`', '`googlePayButton`' |
| `options`     | No            | object   | Options for creating an Element, which differ for each Element. Refer to the following table.   |

#### `options` object properties

| **Element type**   | **Property**             | **Required?** | **Type**                          | **Description**     |
| ------------------ | ------------------------ | ------------- | --------------------------------- | ------------------- |
| `card`             | `disabled`               | No            | boolean                           | Indicates if the `card` Element input is enabled or disabled. By default, the value is set to `false`.    |
|                    | `autoCapture`            | No            | boolean                           | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.   |
|                    | `style`                  | No            | InputStyle                        | Style for the `card` Element     |
|                    | `authFormContainer`      | No            | string                            | Container for the authentication form used in 3D Secure authentication.  |
| `cardNumber`       | `disabled`               | No            | boolean                           | Indicates if the `card` Element input is enabled or disabled. By default, the value is set to `false`.     |
|                    | `autoCapture`            | No            | boolean                           | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.    |
|                    | `style`                  | No            | InputStyle                        | Style for the `cardNumber` Element    |
|                    | `authFormContainer`      | No            | string                            | Container for the authentication form used in 3D Secure authentication.  |
| `expiry`           | `disabled`               | No            | boolean                           | Indicates if the `expiry` Element input is enabled or disabled. By default, the value is set to `false`.     |
|                    | `placeholder`            | No            | string                            | A short hint to suggest the expected value of an input field to the shopper.    |
|                    | `style`                  | No            | InputStyle                        | Style for the `expiry` Element  |
| `cvc`              | `disabled`               | No            | boolean                           | Indicates if the `cvc` Element input is enabled or disabled. By default, the value is set to `false`.  |
|                    | `placeholder`            | No            | string                            | A short hint to suggest the expected value of an input field to the shopper.  |
|                    | `cvcLength`              | No            | number                            | Indicates CVC length  |
|                    | `style`                  | No            | InputStyle                        | Style for the `cvc` Element   |
|                    | `authFormContainer`      | No            | string                            | Container for the authentication form used in 3D Secure authentication.  |
| `fullFeaturedCard` | `intent`                 | No            | Intent                            | The `id` and `client_secret` of the PaymentIntent you want to checkout. It’s required when `mode`is set to `payment` else optional.    |
|                    | `client_secret`          | No            | string                            | The `client_secret` of the Customer object. It's required when `mode` is set to `recurring` else optional.     |
|                    | `mode`                   | No            | Mode                              | The checkout mode for the shopper. Use `payment` to save shopper’s card details during payment. The shopper can initiate subsequent payments using the saved card details. Use `recurring` to save shopper’s card details without payment. You or the shopper can initiate subsequent payments using the saved card details.   |
|                    | `customer_id`            | No            | string                            | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post "https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post") API response  |
|                    | `autoCapture`            | No            | boolean                           | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.   |
|                    | `withBilling`            | No            | boolean                           | Used to increase the likelihood of 3DS frictionless checkout. Set this to `true` if you want the payment form to collect billing information from the shopper. Only applies to card payment method.  |
|                    | `style`                  | No            | InputStyle                        | Style for the `fullFeaturedCard` Element   |
|                    | `authFormContainer`      | No            | string                            | Container for the authentication form used in 3D Secure authentication.  |
|                    | `recurringOptions`       | No            | RecurringOptions\['card'\]        | See [save payment details for future payments](https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments "https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments") .   |
| `dropIn`           | `client_secret`          | Yes           | string                            | The client_secret of the PaymentIntent you want to confirm and complete.   |
|                    | `currency`               | Yes           | string                            | The three-letter ISO currency code representing the currency of the PaymentIntent or PaymentConsent.    |
|                    | `intent_id`              | No            | Intent                            | The `id` of the PaymentIntent you want to confirm and complete. It’s required when `mode`is set to `payment` else optional.   |
|                    | `mode`                   | No            | Mode                              | The checkout mode for the shopper. Use `payment` to save shopper’s card details during payment. The shopper can initiate subsequent payments using the saved card details. Use `recurring` to save shopper’s card details without payment. You or the shopper can initiate subsequent payments using the saved card details.   |
|                    | `customer_id`            | No            | string                            | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post "https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post") API response  |
|                    | `components`             | No            | PaymentMethodType\[\]            | The [payment method component](https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#components "https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#components") your payment form wants to integrate with.   |
|                    | `autoCapture`            | No            | boolean                           | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used.   |
|                    | `withBilling`            | No            | boolean                           | Used to increase the likelihood of 3DS frictionless checkout. Set this to `true` if you want the payment form to collect billing information from the shopper. Only applies to card payment method.  |
|                    | `style`                  | No            | InputStyle                        | Style for the `cardNumber Element` - only applies to card payment method  |
|                    | `authFormContainer`      | No            | string                            | Container for the authentication form used in 3D Secure authentication.   |
|                    | `country_code`           | No            | string                            | The country code of the shipping address. This field is required for the following payment methods: `online_banking`, `bank_transfer`, `seven_eleven`, `skrill`, `sofort`, `trustly`, `paysafecash`, `paysafecard`, `satispay`, `paysera`, `paypal`, `bitpay`    |
|                    | `recurringOptions`       | No            | RecurringOptions                  | Applicable to the card payment method. See [save payment details for future payments](https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments "https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments") .    |
|                    | `applePayRequestOptions` | No            | [applePayRequestOptions](#applepayrequestoptions-object)            | Applicable if you want to offer Apple Pay as a checkout option. Providing your `countryCode` is mandatory. For details, see [applePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions "https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions")   |
|                    | `googlePayRequestOptions` | No            | [googlePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropinGooglePayOptions.md)            | Applicable if you want to offer google Pay as a checkout option. Providing your `countryCode` and `merchantId` are mandatory. For details, see [DropInGooglePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropinGooglePayOptions.md "https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropinGooglePayOptions.md")   |
| `redirect`         | `intent`                 | Yes           | Intent                            | The `id` and `client_secret` of the PaymentIntent you want to checkout. |
|                    | `method`                 | Yes           | PaymentMethodWithRedirect\[\]    | An array of the available methods. For example, `alipaycn`, `alipayhk` , `gcash` , `dana`, `kakaopay` , `tng`, etc. Depending on the payment method, you might need to provide additional properties in `options`. See [payment method table](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/redirect.md#redirect-element-attributes "https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/redirect.md#redirect-element-attributes") . |
|                    | `mode`                   | No            | Mode                              | The checkout mode for the shopper. By default, the mode is set to `payment`. Set it to `recurring` if you want to save the payment method for future payments with the shopper. Supported payment methods include Alipay, AlipayHK, Gcash, Dana, KakaoPay, Touch ‘n Go. Only merchant-initiated subsequent payments are supported.    |
|                    | `client_secret`          | No            | string                            | The client_secret of the Customer object. It's required when `mode` is set to `recurring` else optional.     |
|                    | `customer_id`            | No            | string                            | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post "https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post") API response |
| `qrcode`           | `intent`                 | Yes           | Intent                            | The `id` and `client_secret` of the PaymentIntent you want to checkout.  |
|                    | `qrcodeMethod`           | Yes           | PaymentMethodWithQrcode\[\]      | The payment method you want to redirect the shopper to. For example, `alipayhk` , `wechatpay`, `kakaopay`, etc.    |
| `wechat`           | `intent`                 | Yes           | Intent                            | The `id` and `client_secret` of the PaymentIntent you want to checkout.  |
| `applePayButton`   | `intent`                 | Yes           | Intent                            | The `id` and `client_secret` of the PaymentIntent you want to checkout. |
|                    | `amount`                 | Yes           | {value: number; currency:string;} | The amount and currency of the PaymentIntent.    |
|                    | `country_code`           | Yes           | string                            | Your two-letter ISO 3166 country code.    |
|                    | `autoCapture`            | No            | boolean                           | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from Create a PaymentIntent API will be used.   |
|                    | `buttonType` | No | string | The type of button you want to display on your payment form, for example, 'donate' https://developer.apple.com/documentation/apple\_pay\_on\_the\_web/displaying\_apple\_pay\_buttons\_using\_css |
|                    | `buttonColor` | No | string | The color of the button. Default value is 'black' |
|                    | `totalPriceLabel` | No | string | The business name your shoppers will see when they look for the charge on their bank or credit card statement. For example, "COMPANY, INC." |
|                    | `lineItems` | No | ApplePayJS.ApplePayLineItem[]; | A set of line items that explain recurring payments and/or additional charges. |
|                    | `billingContact` | No | ApplePayJS.ApplePayPaymentContact | The billing contact information for the shopper. |
|                    | `requiredBillingContactFields` | No | ApplePayJS.ApplePayContactField[]; | The billing information that you require from the shopper to process the transaction. |
|                    | `shippingContact` | No | ApplePayJS.ApplePayPaymentContact | Shipping contact information for the user. |
|                    | `shippingMethods` | No | ApplePayJS.ApplePayShippingMethod[]; | The list of shipping methods available for a payment request. |
|                    | `shippingType` | No | ApplePayJS.ApplePayShippingType; | An optional value that indicates how purchased items are to be shipped. |
|                    | `supportedCountries` | No | string[ ] | A list of two-letter ISO 3166 country codes, used to limit payments to cards from specific countries or regions. |
|                    | `applicationData` | No | string | Optional user-defined data. |
|    `googlePayButton`  |  |  |  |  see [googlePayButtonOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/googlePaybuttonOptions.md "https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/googlePaybuttonOptions.md") for details |

<br>

### Get an Element

This method looks up a previously created Element by its type.  

```ts
Airwallex.getElement(type)
```

```ts
// If using NPM
import { getElement } from '@airwallex/airwallex-payment-elements';
const element = getElement(type)
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**   |
| ------------- | ------------- | -------- | ----------------- |
| `type`        | Yes           | enum     | The type of element you are retrieving. Options include: '`cardNumber`', '`expiry`', '`cvc`', '`paymentRequestButton`', '`card`', '`wechat`', '`redirect`', '`dropIn`', '`fullFeaturedCard`', '`applePayButton`' |

#### Returns

`Airwallex.getElement` returns one of the following:

* An instance of an Element with a matching type.

* `null`, when no Element with a matching type has been created.

<br>

### Destroy an Element

Destroys the created Element. The Element can no longer be accessed after this call. 

```ts
Airwallex.destroyElement(type)
```

#### Method parameters

| **Parameter** | **Required?** | **Type** | **Description**   |
| ------------- | ------------- | -------- | ----------------- |
| `type`        | Yes           | enum     | The type of element you are destroying. Options include: '`cardNumber`', '`expiry`', '`cvc`', '`paymentRequestButton`', '`card`', '`wechat`', '`redirect`', '`dropIn`', '`fullFeaturedCard`', '`applePayButton`' |

#### Returns

`Airwallex.destroyElement` returns true or false to indicate the success or failure of the call.

<br>

### Update an Element

Updates the options the Element was initialized with. Updates are merged into the existing configuration.

See `options` object properties for the options you can update. 

```ts
element.update(options)
```

<br>

### Mount an Element

Attaches your Element to the DOM by accepting a DOM element. You need to create a container DOM element to mount an Element.

```ts
element.mount('domElement' )
```

#### Method parameters

| **Parameter** | **Required?** | **Type**             | **Description**                                     |
| ------------- | ------------- | -------------------- | --------------------------------------------------- |
| `domElement`  | Yes           | string | HTMLElement | The DOM element where your Element will be mounted. |


<br>

### Unmount an Element

Unmounts the Element from the DOM. Call `element.mount` to re-attach it to the DOM.

```ts
element.unmount( )
```
<br>

### Blur an Element

Blurs the Element.

```ts
element.blur( )
```
<br>

### Focus an Element

Focuses the Element.

```ts
element.focus( )
```

## Listen to Element Events

Elements can post events to its parent container (your payment page) when a shopper interacts with the checkout Element. You can listen to events and register the event using the `addEventListener()` method.  In this method, specify the name of the event you want to register this handler for, and the code that comprises the handler function you want to run in response to it. For example,

```ts
const element = mount('root');
element.addEventListener('onReady', (event) => {
  // handle event
});
```



| **Event**                   | **Purpose**     |
| --------------------------- | -------------- |
| `onReady`                  | Triggered when the Element is fully rendered and can accept `element.focus` calls.   |
| `onSubmit`                   | Triggered when confirming the PaymentIntent either when the shopper clicks the Pay button or when you call `confirmPaymentIntent( )` method.                                                         |
| `onSuccess`                  | Triggered when Airwallex confirms the PaymentIntent.  |
| `onError`                    | Triggered for various error events during shopper interaction. See [error codes](https://www.airwallex.com/docs/api?v=2019-09-09#/Errors "https://www.airwallex.com/docs/api?v=2019-09-09#/Errors"). |
| `onCancel`                    | Triggered when the shopper clicks the Cancel button when interacting with the payment form.      |
| `onFocus`                     | Triggered when the Element gains focus.   |
| `onBlur`                    | Triggered when the Element loses focus.     |
| `onChange`                    | Triggered when the Element’s value changes. For example, by clicking outside the input field or using the tab key to switch to a different input field.                                              |
| `onClick`                     | Triggered when the shopper clicks on an Element.  |
| `onDynamicCurrencyConversion` | Triggered when Dynamic Currency Conversion (DCC) is enabled and the shopper confirms the PaymentIntent with DCC.   |

<br>

## Process payments

### confirmPaymentIntent

Airwallex uses a PaymentIntent object to track a payment when your shopper first checks out, through to a successful payment. For more information, see [Payment Intents](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

This method confirms the PaymentIntent using payment details collected by the Element.  Only required for the card payment method.

When called, this method will attempt to complete any required actions, such as 3DS authentication. The shopper will be redirected to the `return_url` you provide once the confirmation is complete.

```ts
Airwallex.confirmPaymentIntent(paymentMethod);
```

#### Method parameters

| **Parameter**   | **Required?** | **Type** | **Description**     |
| --------------- | ------------- | -------- | ------------------- |
| `paymentMethod` | Yes           | string   | The PaymentMethod associated with a Customer as part of a PaymentConsent or a PaymentMethod for a guest Customer. See PaymentMethod object properties in the following table. |

#### `PaymentMethod` object properties

| **Property**             | **Required?** | **Type**                 | **Description**     |
| ------------------------ | ------------- | ------------------------ | ------------------- |
| `element`                | Yes           | Element                  | The `card` Element type created by `createElement( )`. For Split Card, use `cardNumber`   |
| `id`                     | Yes           | string                   | The `id` of the PaymentIntent you want to confirm and complete.   |
| `client_secret`          | Yes           | string                   | The `client_secret` of the PaymentIntent you want to confirm and complete. |
| `payment_method`         | No            | [payment\_method](#paymentmethod-object)          | Use this to provide the payment method details such as billing address, cardholder name, etc, when confirming the payment. See **payment\_method object properties**    |
| `payment_method_options` | No            | [payment\_method\_options](#paymentmethodoptions-object) | Use this to provide the payment method options such as auto capture flag when confirming the payment. See **payment\_method\_options object properties**    |
| `payment_consent_id`     | No            | string                   | The `id` of the PaymentConsent for initiating scheduled or unscheduled payments with saved card details. See [Save payment details for future payments](https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments "https://www.airwallex.com/docs/online-payments__save-payment-details-for-future-payments") . |

<br>

### createPaymentConsent

Airwallex allows you to create a PaymentConsent that represents the consent between you and the shopper on the future use of the saved payments details associated with a Customer. For more information, see [Payment Consents](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Consents/Intro).

This method creates a PaymentConsent, which may be be used to confirm a PaymentIntent in subsequent payments. 

```ts
Airwallex.createPaymentConsent(options);
```

#### `options` object properties

| **Property**        | **Required?** | **Type** | **Description**     |
| ------------------- | ------------- | -------- | -------------------- |
| `element`           | Yes           | Element  | The Element type created by `createElement( )` that you are using to collect payment details – either `card` or `cardNumber` Elements.   |
| `intent_id`         | No            | string   | The `id` of the PaymentIntent you want to confirm and complete with the PaymentConsent.    |
| `client_secret`     | Yes           | string   | To save card details during payment, specify `intent_id` and provide the `client_secret` of the PaymentIntent you want to confirm and complete. To save card details without a payment, do not specify `intent_id` but provide the `client_secret` of the Customer object.                                              |
| `customer_id`       | Yes           | string   | The `id` of the Customer for whom the consent is created – the `id` returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post "https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post") API response |
| `currency`          | No            | string   | The three-letter ISO currency code representing the currency of the initial PaymentIntent to verify the PaymentConsent.    |
| `payment_method_id` | No            | string   | Provide the payment method attached to the Customer else create a new one.    |

__For customer-initiated payments__

| **Property**        | **Required?** | **Type** | **Description**  |
| ------------------- | ------------- | -------- | ------------------- |
| `next_triggered_by` | Yes           | string   | Set this to `customer`                                                                                                              |
| `requires_cvc`      | Yes           | boolean  | Set to `false` by default. Indicates whether shopper must enter their CVC when making subsequent payments using saved card details. |

__For merchant-initiated payments__

| **Property**              | **Required?** | **Type** | **Description**     |
| ------------------------- | ------------- | -------- | -------------|
| `next_triggered_by`       | Yes           | string   | Set this to `merchant`    |
| `merchant_trigger_reason` | Yes           | string   | The reason why you triggered the payment, set to `scheduled` or `unscheduled`. |

<br>


### redirectToCheckout

Redirects shoppers to a payment page hosted by Airwallex to securely collect their payment information. When the shopper completes their purchase, they are redirected back to your website.

```ts
Airwallex.redirectToCheckout(options);
```

#### `options` object properties

| **Property**             | **Required?** | **Type**               | **Description**           |
| ------------------------ | ------------- | ---------------------- | ------------------------- |
| `intent_id`              | No            | string                 | The `id` of the PaymentIntent you want to check out.     |
| `client_secret`          | Yes           | string                 | The `client_secret` of the PaymentIntent as returned in Create a PaymentIntent response.   |
| `mode`                   | No            | string                 | The checkout mode for the shopper. Options include: `payment`, `recurring`   |
| `env`                    | No            | string                 | The Airwallex environment you want to integrate your application with. Options include: `staging`, `demo`, `prod`   |
| `currency`               | Yes           | string                 | The three-letter ISO currency code representing the currency of the PaymentIntent or PaymentConsent.   |
| `autoCapture`            | No            | boolean                | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from `Create a PaymentIntent` API will be used. Only supported for card payments.     |
| `theme`                  | No            | Theme                  | Options to customize Hosted Payment Page. Refer to theme.    |
| `customer_id`            | No            | string                 | The id of the Customer for whom the PaymentIntent or PaymentConsent is created – the id returned in [Create a Customer](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post "https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers_create/post") API response                         |
| `components`             | No            | Array                  | The [payment method component](https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#components "https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#components") your payment form wants to integrate with. Refer to components.                                                                                                   |
| `successUrl`             | No            | string                 | The URL (https) to which Airwallex should send shoppers when payment is successful.   |
| `failUrl`                | No            | string                 | The URL (https) to which Airwallex should send shoppers when payment fails.   |
| `cancelUrl`              | No            | string                 | The URL (https) to which Airwallex should send shoppers when payment is canceled.    |
| `logoUrl`                | No            | string                 | The URL of the logo for your website you want to display on the hosted payment page’s header.   |
| `locale`                 | No            | string                 | The locale for your payment page. Options include: `en`, `zh`, `ja`, `ko`, `ar`, `fr`    |
| `showTermLink`           | No            | boolean                | Indicates whether you want to show legal and privacy terms     |
| `withBilling`            | No            | boolean                | Used to increase the likelihood of 3DS frictionless checkout. Set this to `true` if you want the payment form to collect billing information from the shopper. Only applies to card payment method.    |
| `country_code`           | No            | string                 | The two-letter ISO country code of the shopper. Required if you want to integrate with `bank_transfer`, `online_banking`, `skrill` or `seven_eleven` payment methods     |
| `shopper_name`           | No            | string                 | Applies to PPRO payment methods only. The name of the shopper - must be minimum of 3 characters, up to 100 characters allowed.      |
| `shopper_phone`          | No            | string                 | Applies to PPRO payment methods only. The phone number of the shopper.    |
| `shopper_email`          | No            | string                 | Applies to PPRO payment methods only. The email of the shopper.    |
| `applePayRequestOptions` | No            | [ApplePayRequestOptions](#applepayrequestoptions-object) | Applicable if you want to offer Apple Pay as a checkout option. Providing your `countryCode` is mandatory. For details, see [applePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions "https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/README.md#applepayrequestoptions") |
| `googlePayRequestOptions` | No            | [HppGooglePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hppGooglePayOptions.md) | Applicable if you want to offer Google Pay as a checkout option. Providing your `countryCode` is mandatory. For details, see [googlePayRequestOptions](https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hppGooglePayOptions.md "https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hppGooglePayOptions.md") |

<br>

## Appendix

 ### Address object

| **Property**   | **Required?** | **Type** | **Description**                            |
| -------------- | ------------- | -------- | ------------------------------------------ |
| `city`         | Yes            | string   | Shopper’s city                             |
| `country_code` | Yes            | string   | Shopper’s two-letter ISO 3166 country code |
| `postcode`     | No            | string   | Shopper’s post code                        |
| `state`        | No            | string   | Shopper’s state                            |
| `street`       | Yes            | string   | Shopper’s street                           |

<br>

### ApplePayRequestOptions object

Additional Apple Pay customization options for the button style and configuration for payment processing capabilities, billing and shipping information. ApplePayJS is imported from "@types/applepayjs"

| **Property**                   | **Required?** | **Type**             | **Description**         |
| ------------------------------ | ------------- | ----------------------- | ----------------- |
| `countryCode`                  | Yes           | string                                 | Your two-letter ISO 3166 country code, for example, 'US'                                                                                                                                          |
| `buttonType`                   | No            | string                                 | The type of button you want to display on your payment form, for example, 'donate' https://developer.apple.com/documentation/apple\_pay\_on\_the\_web/displaying\_apple\_pay\_buttons\_using\_css |
| `buttonColor`                  | No            | string                                 | The color of the button. Default value is 'black'                                                                                                                                                 |
| `totalPriceLabel`              | No            | string                                 | The business name your shoppers will see when they look for the charge on their bank or credit card statement. For example, "COMPANY, INC."                                                       |
| `lineItems`                    | No            | ApplePayJS.ApplePayLineItem\[\];       | A set of line items that explain recurring payments and/or additional charges.                                                                                                                    |
| `billingContact`               | No            | ApplePayJS.ApplePayPaymentContact      | The billing contact information for the shopper.                                                                                                                                                  |
| `requiredBillingContactFields` | No            | ApplePayJS.ApplePayContactField\[\];   | The billing information that you require from the shopper to process the transaction.                                                                                                             |
| `shippingContact`              | No            | ApplePayJS.ApplePayPaymentContact      | Shipping contact information for the user.                                                                                                                                                        |
| `shippingMethods`              | No            | ApplePayJS.ApplePayShippingMethod\[\]; | The list of shipping methods available for a payment request.                                                                                                                                     |
| `shippingType`                 | No            | ApplePayJS.ApplePayShippingType;       | An optional value that indicates how purchased items are to be shipped.                                                                                                                           |
| `supportedCountries`           | No            | string\[\]                            | A list of two-letter ISO 3166 country codes, used to limit payments to cards from specific countries or regions.                                                                                  |
| `applicationData`              | No            | string                                 | Optional user-defined data.                                                                                                                                                                       |
<br>

#### Billing object

| **Property**    | **Required?** | **Type** | **Description**         |
| --------------- | ------------- | -------- | ----------------------- |
| `email`         | No            | string   | Shopper’s email         |
| `first_name`    | Yes            | string   | Shopper’s first name    |
| `last_name`     | Yes            | string   | Shopper’s last name     |
| `date_of_birth` | No            | string   | Shopper’s date of birth |
| `phone_number`  | No            | string   | Shopper’s phone number  |
| `address`       | No            | [Address](#address-object)  | Shopper’s address.  |

<br>

#### components object

| **Property** | **Required?** | **Type** | **Description**  |
| ------------ | ------------- | -------- | ---------------- |
| `Components` | No            | Array    | The available payment methods: 'card', 'wechatpay', 'alipaycn', 'alipayhk', 'gcash', 'dana', 'kakaopay', 'tng', 'poli', 'fpx', 'online\_banking', 'bank\_transfer', 'permatanet', 'alfamart', 'indomaret', 'doku\_ewallet', 'enets', 'payeasy', 'seven\_eleven', 'konbini', 'tesco\_lotus', 'grabpay', 'skrill', 'eps', 'giropay', 'ideal', 'multibanco', 'p24', 'sofort', 'trustly', 'bancontact', 'dragonpay', 'blik', 'mybank', 'paybybankapp', 'verkkopankki', 'maxima', 'narvesen', 'paypost', 'perlas\_terminals', 'paysafecash', 'paysafecard', 'paysera', 'satispay', 'family\_mart', 'hi\_life', 'sam\_kiosk', 'axs\_kiosk', 'bigc', 'esun', 'permata\_atm', 'boost', 'shopee\_pay', 'paypal', 'payu', 'ovo', 'bitpay', 'truemoney'; |

<br>

### FontOptions object

| **Property** | **Required?** | **Type** | **Description**     |
| ------------ | ------------- | -------- | ---------------------- |
| `family`     | No            | string   | The font family, for example, `'AxLLCircular',`                                                                        |
| `src`        | No            | string   | The font source, for example, `src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',` |
| `weight`     | No            | string   | Airwallex supports two font weights: regular (400) and bold (700).      |

<br>

#### payment_method object

| **Property** | **Required?** | **Type**         | **Description**               |
| ------------ | ------------- | ---------------- | ----------------------------- |
| `card`       | No            | {name: string; } | The name of the cardholder    |
| `billing`    | No            | [Billing](#billing-object)          | Shopper’s billing information |

<br>

#### payment_method_options object

| **Property** | **Required?** | **Type**                   | **Description**    |
| ------------ | ------------- | -------------------------- | ------------------ |
| `card`       | No            | {auto\_capture: boolean; } | Indicates whether the amount must be automatically captured after successful authorization. By default, the value from Create a PaymentIntent API will be used. Only applicable to card payment method. |

<br>

#### theme object

| **Property** | **Required?** | **Type**        | **Description**    |
| ------------ | ------------- | --------------- | -------------------- |
| `fonts`      | No            | FontOptions\[\] | Fonts options to customize the font styles of payment Elements.  You can specify font options using `src`, `family` and `weight` attributes. |
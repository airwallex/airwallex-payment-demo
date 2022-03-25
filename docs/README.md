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
- [**ApplePayButton**](/docs/applepaybutton.md)
<br>

## Functions

Initialization

- [init](#init)

Interacting with Elements

- [Element](#Element)
- [createElement()](#createElement)
- [getElement()](#getElement)
- [destroyElement()](#destroyElement)
- [setElement()](#setElement)

Payment Processing

- [redirectToCheckout](#redirectToCheckout)
- [confirmPaymentIntent](#confirmPaymentIntent)

Common Errors

- [Errors](#common-errors)

<br>

## Initialization

### init

The following will inject a script with the Airwallex bundle into your site's HTML head.

```ts
await Airwallex.init(options);
```

An equivalent step is:

```html
<script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
```

Running `init` and embedding the above script in your document head will initialize a global variable in your document called `window.Airwallex`. This variable consists of all the functions to process payments.

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
| `type`    | true      | 'cardNumber', 'expiry', 'cvc', 'paymentRequestButton', 'card', 'wechat', 'redirect', 'dropIn', 'fullFeaturedCard', 'applePayButton' | The type of element to be created, of the element field types        |
| `options` | false     |                                                                                                                    | Additional options for each element, different for each element type |

All the following options are optional with the exception of `'intent'`.

| Element          | Props                          | Type                        | Description                                                                                                                                                  |
| ---------------- | ------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cardNumber       | `intent` (**required**)        | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                  | `disabled`                     | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                  | `autoCapture`                  | boolean                     | Indicate whether to capture immediate when authentication success, apply when shopper using card payment method                                              |
|                  | `placeholder`                  | string                      | The placeholder attribute specifies a short hint that describes the expected value of an input field                                                         |
|                  | `style`                        | InputStyle                  | Style for cardNumber element                                                                                                                                 |
|                  | `authFormContainer`            | string                      | Container for authentication form                                                                                                                            |
| expiry           | `disabled`                     | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                  | `placeholder`                  | string                      | The placeholder attribute specifies a short hint that describes the expected value of an input field                                                         |
|                  | `style`                        | InputStyle                  | Style for expiry element                                                                                                                                     |
| cvc              | `disabled`                     | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                  | `placeholder`                  | string                      | The placeholder attribute specifies a short hint that describes the expected value of an input field                                                         |
|                  | `cycLength`                    | number                      | Indicate cvc's length                                                                                                                                        |
|                  | `style`                        | InputStyle                  | Style for expiry element                                                                                                                                     |
|                  | `authFormContainer`            | string                      | Container for authentication form                                                                                                                            |
| card             | `disabled`                     | boolean                     | Config if the element input are disabled or not, default false                                                                                               |
|                  | `autoCapture`                  | boolean                     | Indicate whether to capture immediate when authentication success                                                                                            |
|                  | `style`                        | InputStyle                  | Style for expiry element                                                                                                                                     |
|                  | `authFormContainer`            | string                      | Container for authentication form                                                                                                                            |
| fullFeaturedCard | `intent` (**required**)        | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                  | `mode`                         | Mode                        | Checkout mode, should be one of `'payment'`, `'recurring'`                                                                                                   |
|                  | `autoCapture`                  | boolean                     | Indicate whether to capture immediate when authentication success                                                                                            |
|                  | `withBilling`                  | boolean                     | Indicate to improve 3DS experience, indicate if the payment form will collect billing info from shopper                                                      |
|                  | `style`                        | InputStyle                  | Style for cardNumber element                                                                                                                                 |
|                  | `authFormContainer`            | string                      | Container for authentication form                                                                                                                            |
| wechat           | `intent` (**required**)        | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
| redirect         | `intent` (**required**)        | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                  | `method`                       | PaymentMethodWithRedirect[] | An array of the following available methods: `'alipaycn'`, `'alipayhk'` , `'gcash'` , `'dana'`, `'kakaopay'` , `'tng'`                                       |
| qrcode           | `intent` (**required**)        | Intent                      | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
|                  | `qrcodeMethod`                 | PaymentMethodWithQrcode[]   | An array of the following available methods: `'wechatpay'`, `'kakaopay'` , `'alipayhk'`                                                                      |
| dropIn           | `client_secret` (**required**) | string                      | The client_secret when you create payment intent, contain in the response                                                                                    |
|                  | `currency`(**required**)       | string                      | Currency of your payment intent or consent. Three-letter ISO currency code                                                                                   |
|                   | `applePayRequestOptions`     | ApplePayRequestOptions  | If you want to integrate with apple pay, you need to provide merchant country code in ApplePayHppRequestOptions                                                                        |
|                  | `mode`                         | Mode                        | Checkout mode, should be one of `'payment'`, `'recurring'`                                                                                                   |
|                  | `intent_id`                    | string                      | The intent id you shopper want to checkout                                                                                                                   |
|                  | `customer_id`                  | string                      | Checkout for know customer, refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/Intro)                          |
|                  | `components`                   | PaymentMethodType[]         | The payment method component your website would like to integrate with                                                                                       |
|                  | `autoCapture`                  | boolean                     | Indicate whether to capture immediate when authentication success, apply when shopper using card payment method                                              |
|                  | `withBilling`                  | boolean                     | Indicate to improve 3DS experience, indicate if the payment form will collect billing info from shopper                                                      |
|                  | `style`                        | InputStyle                  | Style for cardNumber element                                                                                                                                 |
|                  | `authFormContainer`            | string                      | Container for authentication form                                                                                                                            |
| applePayButton           | `client_secret` (**required**) | string                      | The client_secret when you create payment intent, contain in the response                                                                                    |
|                  | `intent_id`(**required**)      | string                      | The intent id you shopper want to checkout                                                                                                                   |
|                  | `autoCapture`                  | boolean                     | Indicate whether to capture immediate when authentication success, apply when shopper using card payment method                                              |
|                  | `amount` (**required**)                   | {value: number; currency:string;}                     | Indicate the amount and currency of the intent.                                                    |
|                  | `countryCode` (**required**)                   | string                    | The merchant's two-letter ISO 3166 country code. Like 'US'                                                    |
|                  | other options is same with the ApplePayRequestOptions                 | ApplePayRequestOptions                 | Please check ApplePayRequestOptions as below |

<br>

### getElement

An element function. This function queries the created element by type. There can only be one type of element per page.

```ts
const element = Airwallex.getElement(type);
```

| Props  | Required? | Enum                                                                                                               | Description |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `type` | true      | 'cardNumber', 'expiry', 'cvc', 'paymentRequestButton', 'card', 'wechat', 'redirect', 'dropIn', 'fullFeaturedCard', 'applePayButton', |

### destroyElement

An element function. This function destroys the created element. The element can no longer be accessed after this call. Returns a boolean.

```ts
Airwallex.destroyElement(type);
```

| Props  | Required? | Enum                                                                                                               | Description |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| `type` | true      | 'cardNumber', 'expiry', 'cvc', 'paymentRequestButton', 'card', 'wechat', 'redirect', 'dropIn', 'fullFeaturedCard','applePayButton',  |

<br>

## Payment Processing

<br>

### redirectToCheckout

Used for the Hosted Payment Page (HPP) method that redirects the customer to an Airwallex checkout page.

```ts
Airwallex.redirectToCheckout(props);
```

| Props                    | Required? | Type                   | Description                                                                                                                                                                                            |
| ------------------------ | --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `intent_id`              | false     | string                 | The intent id you shopper want to checkout                                                                                                                                                             |
| `client_secret`          | true      | string                 | The client_secret when you create payment intent, contain in the response                                                                                                                              |
| `mode`                   | false     | string                 | Checkout mode, can be `payment` or `recurring`                                                                                                                                                         |
| `env`                    | false     | string                 | Indicate which airwallex integration env your merchant site would like to connect with, the options would be `staging`, `demo`, `prod`                                                                 |
| `currency`               | true      | string                 | Currency of your payment intent or consent. Three-letter ISO currency code                                                                                                                             |
| `autoCapture`            | false     | boolean                | Only support for card payment, indicate whether to capture immediate when authentication success                                                                                                       |
| `theme`                  | false     | Theme                  | Option with limited support for HPP page style customization                                                                                                                                           |
| `customer_id`            | false     | string                 | Checkout for known customer, refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/Intro)                                                                   |
| `components`             | false     | Array                  | The payment method component your website would like to integrate with, the type fo this field should be Array of type `Components` below                                                              |
| `successUrl`             | false     | string                 | The success return url after shopper succeeded the payment (must be https)                                                                                                                             |
| `failUrl`                | false     | string                 | The failed return url when shopper can not fulfill the payment intent (must be https)                                                                                                                  |
| `cancelUrl`              | false     | string                 | The cancel return url when shopper canceled the payment intent (must be https)                                                                                                                         |
| `logoUrl`                | false     | string                 | The logo url of your website you want to show in the HPP head                                                                                                                                          |
| `locale`                 | false     | string                 | i18n localization config, 'en', 'zh', 'ja', 'ko', 'ar', 'fr'                                                                                                                                           |
| `showTermLink`           | false     | boolean                | Need to show the Legal & Privacy                                                                                                                                                                       |
| `withBilling`            | false     | boolean                | Need to show the Billing fields for card payment                                                                                                                                                       |
| `country_code`           | false     | string                 | The 2-letter ISO country code from which the consumer will be paying, If you want to integrate with `bank_transfer`, `online_banking`, `skrill` or `seven_eleven` payment method, it would be required |
| `shopper_name`           | false     | string                 | for ppro only: Customer name - minimum of 3 characters, up to 100 characters, refer to [**Redirect**](/docs/redirect.md)                                                                               |
| `shopper_phone`          | false     | string                 | for ppro only: Customer phone, refer to [**Redirect**](/docs/redirect.md)                                                                                                                              |
| `shopper_email`          | false     | string                 | for ppro only: Customer email, refer to [**Redirect**](/docs/redirect.md)                                                                                                                              |
| `applePayRequestOptions` | false     | ApplePayRequestOptions | If you want to integrate with apple pay, you need to provide merchant country code in ApplePayHppRequestOptions                                                                                                                |

<br>

### ApplePayRequestOptions
ApplePayJS is imported from "@types/applepayjs" 
```ts
interface ApplePayRequestOptions {
  /**
   * The merchant's two-letter ISO 3166 country code. Like 'US'
   */
  countryCode: string;
  /**
   * 	Indicate the type of button you want displayed on your payments form. Like 'donate'
   *  https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons_using_css
   */
  buttonType?: string;
  /**
   * Indicate the color of the button. Default value is 'black'
   */
  buttonColor?: 'black' | 'white' | ' white-with-line';
  /**
   * Provide a business name for the label field. Use the same business name people will see when they look for the charge on their bank or credit card statement. For example, "COMPANY, INC."
   */
  totalPriceLabel?: string;
  /**
   * A set of line items that explain recurring payments and/or additional charges.
   */
  lineItems?: ApplePayJS.ApplePayLineItem[];

  /**
   * Billing contact information for the user.
   */
  billingContact?: ApplePayJS.ApplePayPaymentContact;

  /**
   * The billing information that you require from the user in order to process the transaction.
   */
  requiredBillingContactFields?: ApplePayJS.ApplePayContactField[];

  /**
   * The shipping information that you require from the user in order to fulfill the order.
   */
  requiredShippingContactFields?: ApplePayJS.ApplePayContactField[];

  /**
   * Shipping contact information for the user.
   */
  shippingContact?: ApplePayJS.ApplePayPaymentContact;

  /**
   * A set of shipping method objects that describe the available shipping methods.
   */
  shippingMethods?: ApplePayJS.ApplePayShippingMethod[];

  /**
   * How the items are to be shipped.
   */
  shippingType?: ApplePayJS.ApplePayShippingType;
  /**
   * A list of ISO 3166 country codes for limiting payments to cards from specific countries.
   */
  supportedCountries?: string[];

  /**
   * Optional user-defined data.
   */
  applicationData?: string;
}
```

#### theme

```ts
interface Theme {
  fonts?: FontOptions[];
}

interface FontOptions {
  family?: string;
  src?: string;
  weight?: string | number;
}
```

#### components

```ts
type Components =
  | 'card'
  | 'wechatpay'
  | 'alipaycn'
  | 'alipayhk'
  | 'applepay'
  | 'gcash'
  | 'dana'
  | 'kakaopay'
  | 'tng'
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
  | 'truemoney';
```

<br>

### confirmPaymentIntent

The following function confirms payment intent with element and the rest of the payment method info. Only required for the card payment method.

Takes in either a PaymentMethod with a guest checkout without a previously created contract, or a PaymentMethod with a pre-existing user/contract.

```ts
const confirmResult = await Airwallex.confirmPaymentIntent(paymentMethod);
```

PaymentMethod (without being attached to be an existing customer)

| Props                    | Required? | Type                   | Description                                                                                                                                                  |
| ------------------------ | --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element`                | true      | Element                | Element create by call createElement interface with 'cardNumber' element type                                                                                |
| `client_secret`          | true      | string                 | The client_secret when you create payment intent, contain in the response                                                                                    |
| `id`                     | true      | string                 | The payment intent you would like to checkout. Refer to [Airwallex Client API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro) |
| `payment_method`         | false     | payment_method         | The payment method detail when confirm intent, refer to type `payment_method` below                                                                          |
| `payment_method_options` | false     | payment_method_options | The payment method options when confirm intent, refer to type `payment_method_options` below                                                                 |
| `payment_consent_id`     | false     | string                 | The payment consent id if you have, can be create by createPaymentConsent                                                                                    |

#### payment_method

```ts
interface Address {
  city: string;
  /**
   * https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
   */
  country_code: string;
  postcode: string;
  state: string;
  street: string;
}

interface Billing {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  phone_number?: string;
  address: Address;
}

interface payment_method {
  card: {
    /**
     * Card holder name
     */
    name?: string;
  };
  /**
   * Card billing information
   */
  billing?: Billing;
}
```

#### payment_method_options

```ts
interface payment_method_options {
  card?: {
    /**
     * Only support for card payment, indicate whether to capture immediate when authentication success
     */
    auto_capture?: boolean;
  };
}
```

<br>

### createPaymentConsent

Used to create a payment consent which could used to confirm an intent in the subsequent transactions

```ts
Airwallex.createPaymentConsent(props);
```

| Props                     | Required? | Type    | Description                                                                                                                                     |
| ------------------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent_id`               | false     | string  | The intent_id that would be confirmed with the new created payment consent                                                                      |
| `client_secret`           | true      | string  | If the intent provided, this should be the client_secret of the intent, If no intent provided, this should be the client_secret of the customer |
| `currency`                | false     | string  | The currency of the payment consent, Only applicable for card consent                                                                           |
| `element`                 | true      | Element | The element you would like to use to create consent                                                                                             |
| `customer_id`             | true      | string  | The customer_id of the consent                                                                                                                  |
| `payment_method_id`       | false     | string  | If customer already has a payment method, merchant could provide it instead of create a new one                                                 |
| `next_triggered_by`       | false     | string  | The subsequent transactions are triggered by `merchant` or `customer`                                                                           |
| `merchant_trigger_reason` | false     | string  | The reason why merchant trigger transaction. Only applicable when next_triggered_by is `merchant`                                               |
| `requires_cvc`            | false     | boolean | `requires_cvc` used for decide whether cvc is required for subsequent transactions. Only applicable when next_triggered_by is `customer`        |

<br>

## Common Errors

1. `Airwallex is not defined`

- Have you loaded Airwallex before using Airwallex functions?
- If you're using CDN, have you changed the bundle version from `x.x.x` to the latest version?
- eg. `https://checkout.airwallex.com/assets/elements.bundle.min.js` is invalid

2. `Access denied, authentication failed`

- Have you replaced your intent id and client secret?

```js
// Enter your Payment Intent secret keys here
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
```

3. `The resource with ID int_xxxxxxxxx cannot be found.`

- Does the environment you initialized Airwallex in (eg. demo, staging, or prod) match the environment you retrieved your intent keys in?
- If you ran `init` in demo environment, did you also create your intent in the demo environment?

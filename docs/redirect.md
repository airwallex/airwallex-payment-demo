# Airwallex Payment Elements - Redirect Element Integration

The Redirect element allows merchants to redirect to an alternative payment method such as Alipay, Dana, Kaokaopay, etc. This element gives merchant control over the overall look and feel of their checkout page, while delegating the responsibility of payment processing to Airwallex. The element is a checkout button that will redirect users to another payment page. The button style is currently not customizable.

![](assets/redirect.png)

\* _An example of a Redirect element._

## How it works

For the redirect element to work properly, the merchant must enable the payment methods they wish to redirect their customers to. For example, if the merchant accepts Alipay HK as a payment method, then the checkout button will redirect customers to an Alipay HK checkout page. After the payment, whether successful or not, customers will be redirected back to the merchant site.

## Returning to Merchant Site

In order for the redirect element to return to the merchant site following external payment processing, merchants **MUST** provide a `return_url` when creating the [PaymentIntent](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro). It's the merchant's responsibility to check the payment status when it's back to return url.

## Guide

The following Steps demonstrates the best practices to integrating with our payment platform. Code is in Javascript.

Want more details? See the integration in [React](/integrations/react/src/components/Redirect.jsx).

### 1. At the start of your file, import `airwallex-payment-elements`.

```js
import Airwallex from 'airwallex-payment-elements';
```

or add the bundle as a script in your HTML head

```html
<script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
```

### 2. Initialize the Airwallex package with the appropriate environment

```js
Airwallex.init({
  env: 'demo', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
  origin: window.location.origin, // Setup your event target to receive the browser events message
});
```

`init` takes in options to set up the payment environment. See docs for further customizations [here](/docs#init).

The Airwallex package only needs to be mounted once in an application (and everytime the application reloads).

### 3. Add an empty container for the redirect element to be injected into

```html
<div id="redirect"></div>
```

We will mount the redirect element into the empty div in Step 5.

### 4. Create the redirect element

This creates the specified [Element](/docs#Element) object. We specify the type as **`redirect`**.  
For requirements and values of **attributes** in creating an `Element`, refer to Table: [Redirect Element Attributes](#redirect-element-attributes)

```js
const element = Airwallex.createElement('redirect', {
  intent: {
    // Required, the redirect element uses intent_id and client_secret to prepare checkout
    id: 'replace-with-your-intent-id',
    client_secret: 'replace-with-your-client-secret',
  },
  mode: 'payment', // Optional
  /*
    For following attributes, refer to Table: Redirect Element Attributes at the end of this page
    to see if you need to include them for the payment method you are integrating
  */
  method: 'replace-with-your-redirect-method',
  country_code: 'Alpha-2 country code',
  shopper_name: 'name',
  shopper_email: 'email address',
  shopper_phone: 'phone number',
});
```

You **must provide intent details and payment method** to create the redirect element.

More importantly, the payment method must be one that the Merchant has enabled to accept. For example, if the Merchant hasn't enabled Alipay HK as a payment method, a redirect element with the 'alipayhk' redirect method will not work.

There are also additional options as a second parameter to the `createElement` function that can overwrite styles and other functions. [See docs](/docs#createElement) for more details.

### 5. Mount the redirect element

Next, we need to mount the redirect element to the DOM.

```js
const domElement = element.mount('redirect');
```

This function will append the redirect element to your div with an id `redirect` as created in Step 3. **Ensure that there are no other elements in the document with the same id**.

The **element should only be mounted once** in a single payment flow.

### 6. Add an `onReady` event listener to handle events when the element is mounted

```js
domElement.addEventListener('onReady', (event) => {
  /*
    ... Handle event
  */
  window.alert(event.detail);
});
```

This can be used to set a loading state as the checkout screen is being prepared.

### 7. Add an `onError` event listener to handle events when the payment has failed.

```js
domElement.addEventListener('onError', (event) => {
  /*
    ... Handle event on error
  */
  console.log(event.detail);
});
```

### 8. Beautify and deploy!

## Documentation

See the full documentation for `airwallex-payment-elements` [here](/docs).

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
    <!-- STEP #1: Import airwallex-payment-elements bundle -->
    <script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
  </head>
  <body>
    <h1>Redirect element integration</h1>
    <!-- STEP #3: Add an empty container for the redirect element to be injected into -->
    <div id="redirect"></div>
    <script>
      // STEP #2: Initialize the Airwallex global context for event communication
      Airwallex.init({
        env: 'staging', // Setup which Airwallex env('staging' | 'demo' | 'prod') to integrate with
        origin: window.location.origin, // Setup your event target to receive the browser events message
      });
      // STEP #4: Create 'redirect' element
      const element = Airwallex.createElement('redirect', {
        intent: {
          // Required
          id: 'replace-with-your-intent-id',
          client_secret: 'replace-with-your-client-secret',
        },
        method: 'replace-with-your-redirect-method', // Required
      });
      // STEP #5: Mount the 'redirect' element
      const domElement = element.mount('redirect');

      // STEP #6: Add an event listener to handle events when the element is mounted
      domElement.addEventListener('onReady', (event) => {
        /*
          ... Handle event
        */
        window.alert(event.detail);
      });

      // STEP #7: Add an event listener to handle events when the payment has failed.
      domElement.addEventListener('onError', (event) => {
        /*
          ... Handle event on error
        */
        console.log(event.detail);
      });
    </script>
  </body>
</html>
```

## Redirect Element Attributes

:eight_spoked_asterisk: : Required&nbsp;&nbsp;&nbsp;&nbsp;
:large_orange_diamond: : Optional&nbsp;&nbsp;&nbsp;&nbsp;
:heavy_minus_sign: : Not Applicable
|Payment Method|:eight_spoked_asterisk:`method`|`country_code`|`shopper_name`|`shopper_email`|`shopper_phone`|
|--------------|--------|:------------:|:------------:|:-------------:|:-------------:|
Alipay CN|`'alipaycn'`|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:
Alipay HK|`'alipayhk'`|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:
GCash|`'gcash'`|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:
DANA|`'dana'`|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:
KakaoPay|`'kakaopay'`|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:
Touch 'n Go|`'tng'`|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:|:heavy_minus_sign:
POLi|`'poli'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
GrabPay|`'grab_pay'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Konbini|`'konbini'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
eps|`'eps'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
giropay|`'giropay'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
iDEAL|`'ideal'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Multibanco|`'multibanco'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Bancontact|`'bancontact'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
BLIK|`'blik'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
MyBank|`'mybank'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Pay by Bank app|`'paybybankapp'`|:heavy_minus_sign:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
FPX|`'fpx'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:large_orange_diamond:
eNETS|`'enets'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:large_orange_diamond:
Pay-easy|`'pay_easy'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:large_orange_diamond:
Tesco Lotus|`'tesco_lotus'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:large_orange_diamond:
dragonpay|`'dragonpay'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:large_orange_diamond:
DOKU|`'bank_transfer'`|:eight_spoked_asterisk:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
Paysafecash|`'paysafecash'`|:eight_spoked_asterisk:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
Estonian Banks /Latvian Banks <br />/Lithuanian Banks /Thailand Banks|`'online_banking'`|:eight_spoked_asterisk:|:large_orange_diamond:|:large_orange_diamond:|:large_orange_diamond:
7-Eleven|`'seven_eleven'`|:eight_spoked_asterisk:|:large_orange_diamond:|:large_orange_diamond:|:large_orange_diamond:
PermataNet|`'permatanet'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
Alfamart|`'alfamart'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
Indomaret|`'indomaret'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
DOKU Wallet|`'doku_ewallet'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
Przelewy24|`'p24'`|:heavy_minus_sign:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
Skrill|`'skrill'`|:eight_spoked_asterisk:|:large_orange_diamond:|:large_orange_diamond:|:heavy_minus_sign:
Sofort.|`'sofort'`|:eight_spoked_asterisk:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Trustly|`'trustly'`|:eight_spoked_asterisk:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Paysafecard|`'paysafecard'`|:eight_spoked_asterisk:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Satispay|`'satispay'`|:eight_spoked_asterisk:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:
Paysera|`'paysera'`|:eight_spoked_asterisk:|:large_orange_diamond:|:heavy_minus_sign:|:heavy_minus_sign:

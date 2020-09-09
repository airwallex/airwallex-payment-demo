# airwallex-payment-demo cdn

CDN example using Universal Module Definition (UMD) files in static html file, the demo using [Serve](https://www.npmjs.com/package/serve) to serve those static html

# Pre-installation

### Install node.js

[Download node.js](https://nodejs.org/en/)

### Install

    npm install

### Update config

Setp #1: Update to using latest bundle js version in the `html` static file, replace `xx.xx.xx` with version found in [airwallex-payment-elements](https://www.npmjs.com/package/airwallex-payment-elements)

```html
<!-- Step #1: Load Checkout Universal Module Definition (UMD) bundle js-->
<script src="https://checkout.airwallex.com/assets/bundle.xx.xx.xx.min.js"></script>
```

Step #2: Select the target airwallex env you want to test with by update the `env` field

```js
env: 'staging', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
```

Step #3: Get your intent id and client secret create by your backend client api integration with [PaymentIntent](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro)

To power up those pages, replace them with below fields in `html`

```js
const id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
```

```js
id: 'replace-with-your-intent-id',
client_secret: 'replace-with-your-client-secret'
```

### Start demo

    npm start

# Go to browser and open [Localhost](http://localhost:5000)

Those static html show example of integration ways, for more details you can check on [airwallex-payment-elements](https://www.npmjs.com/package/airwallex-payment-elements)
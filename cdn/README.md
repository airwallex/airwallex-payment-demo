# airwallex-payment-demo cdn

CDN example using Universal Module Definition (UMD) files in static html file, the demo using [Serve](https://www.npmjs.com/package/serve) to serve those static html

# Pre-installation

### Install node.js

[Download node.js](https://nodejs.org/en/)

### Install

    npm install

### Update config

Update to using latest bundle js version in the `html` static file, replace `xx.xx.xx` with version found in [airwallex-payment-elements](https://www.npmjs.com/package/airwallex-payment-elements)

```html
<!-- Step #1: Load Checkout Universal Module Definition (UMD) bundle js-->
<script src="https://checkout.airwallex.com/assets/bundle.xx.xx.xx.min.js"></script>
```

Select the target airwallex env you want to test with by update the `env` field

```js
env: 'staging', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
```

### Start demo

    npm start

# Go to browser and open [Localhost](http://localhost:5000)

Those static html show example of integration ways, for more details you can check on [airwallex-payment-elements](https://www.npmjs.com/package/airwallex-payment-elements)
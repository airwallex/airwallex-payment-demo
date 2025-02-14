# Airwallex Payment Demo

The purpose of this project is to demonstrate how [Airwallex payment element](https://airwallex.com/docs/js/) can be integrated with different web frameworks. Demos in each framework demonstrate each of the various payment acceptance methods merchants can use.

Our goal is to make it easy for you (Merchants) to use our platform, as easy as a copy-paste!

Before getting start, check out what the Airwallex Checkout elements look like here: [https://demo-pacheckoutdemo.airwallex.com/](https://demo-pacheckoutdemo.airwallex.com/).

You could also refer to the [Airwallex JS SDK documents](https://airwallex.com/docs/js/) for more details.

<div align="center">
<img src="docs/assets/payment-demo.png" width="650px">
</div>

## Questions, comments, or suggestions?

Running into issues? Check out some of the common errors and our troubleshooting tips [here](/docs#common-errors).

[Let us know](https://help.airwallex.com/hc/en-gb/requests/new) if you run into problems, or have any comments and suggestions for us. We value your input!
<img src="docs/assets/support-desk.png" width="650px">

## Creating a Payment Intent

Throughout this demo, you will be asked to insert your intent secrets to properly enact a payment checkout, more details can be found in the [Airwallex API](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

## Navigating this project

So far, integrations are done with the following frameworks. You can find the installation and development instructions within its subfolder.

API integration:

- [Node](/integrations/node)

Web integration:
- [React](/integrations/react-ts)
- [CDN](/integrations/cdn)
  
Native integration:
- [ReactNative](https://github.com/airwallex/airwallex-payment-react-native/tree/main/example)
- [iOS SDK](https://github.com/airwallex/airwallex-payment-ios)
- [Android SDK](https://github.com/airwallex/airwallex-payment-android)

## Other Integrations

For those using [Next.js](https://nextjs.org/) as their web framework, feel free to see the [React](/integrations-component-sdk/react-ts)  examples.

## Sandboxes

You also can play around with the different web integrations with the sandboxes below:

- [React-Typescript](https://codesandbox.io/p/sandbox/github/airwallex/airwallex-payment-demo/tree/master/integrations/react-ts)
- [Static HTML](https://codesandbox.io/p/sandbox/github/airwallex/airwallex-payment-demo/tree/master/integrations/cdn)

## @Deprecated ways of integrating Airwallex

Please note that integrating Airwallex with [airwallex-payment-elements](https://www.npmjs.com/package/airwallex-payment-elements) is deprecated and will be removed in the future.
Therefore, the following integration docs are deprecated and will be removed in the future:

- [React @deprecated](/integrations@deprecated/react)
- [React Typescript @deprecated](/integrations@deprecated/react-ts)
- [Angular @deprecated](/integrations@deprecated/angular)
- [CDN @deprecated](/integrations@deprecated/cdn)
- [Vue @deprecated](/integrations@deprecated/vue)

The following sandboxes will also be deprecated in the future:

- [Static HTML @deprecated](https://codesandbox.io/s/airwallex-payment-demo-static-html-c2z63)
- [React @deprecated](https://codesandbox.io/s/airwallex-payment-demo-react-2m63j)
- [Vue @deprecated](https://codesandbox.io/s/airwallex-payment-demo-vue-ffhrw)
- [Angular @deprecated](https://codesandbox.io/s/airwallex-payment-demo-angular-zgx32)

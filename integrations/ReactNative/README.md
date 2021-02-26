# Airwallex Payment Elements with React Native

This directory contains the React Native implementation of [Airwallex Payment Element](https://www.npmjs.com/package/airwallex-payment-elements).

## Special Note about this integration

Airwallex has [IOS](https://www.airwallex.com/docs/payments__ios-airwallex-sdk)/[Android](https://www.airwallex.com/docs/payments__android-airwallex-sdk) SDKs for native solutions, so this integration is a simple extension of our web features using [ReactNativeWebView](https://github.com/react-native-webview/react-native-webview). ReactNativeWebview is used extensively throughout this integration, as we embed iframes containing the elements' HTML integration code into each React Native page. Therefore, this solution is a combination of the HTML/CDN solution with React Native. You'll notice that the demos use ReactNativeWebview as the element renderer, but all the events are handled in React Native.

## Requirements

- [node.js](https://nodejs.org/en/)
- `npm` or `yarn` package manager

Follow this [React Native Set Up Guide](https://reactnative.dev/docs/environment-setup) for more details on dependencies needed.

## Installation and Development

1. Clone the root [airwallex-payment-demo](https://github.com/airwallex/airwallex-payment-demo) project to your local machine

`git clone https://github.com/airwallex/airwallex-payment-demo`

2. Navigate into the ReactNative directory with `cd integrations/ReactNative`

3. Install the package with `yarn` or `npm install`

4. If you're starting the ios project, navigate into the ios subfolder and install its dependencies with `cd ios && pod install`

5. Navigate back into the `ReactNative` folder and run the project in development mode with `npm start` or `yarn start`

6. Run the ios/android simulator with `npm run ios` or `yarn ios` or `npm run android` or `yarn run android`

## Usage

Each of the payment methods are written as a separate component found in the [/src](/integrations/ReactNative/src) folder.

To test each of the payment methods, be sure to replace the `intent_id` and `client_secret` variables at the top of each file with your own unique keys. These values can be created with the backend API integration with [PaymentIntent](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro).

```jsx
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
```

## Authors

Josie Ku

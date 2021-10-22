# Airwallex Payment Elements - 3DS flow

  

The airwallex-payment-elements also provide several functions which would help you to handle the 3ds flow (You could also do it manually instead of using our js lib).  There're three functions here handle3ds, get3dsReturnUrl and getBrowserInfo(optional for 3ds flow but recommanded).

  -  [get3dsReturnUrl](#get3dsReturnUrl)  Build the return_url which would used during the 3ds flow and you need to pass when calling confirm API
  -  [getBrowserInfo](#getBrowserInfo) Used for collecting device data for 3ds flow which will benefits for the success of the transaction.
  -  [handle3ds](#handle3ds) Handle the 3ds flow on behalf of you


## Function details

### get3dsReturnUrl
| Props | Required | Enum | Default value | Description |
| ----- | -------- | ---- | ------------- | ----------- |
| `env` | false | 'staging', 'demo', 'prod' | 'prod' | The airwallex env that you're integrating with |
| `intent_id` | false | string | '' | The intent id that you would like to pay |

    
### getBrowserInfo
| Props | Required | Enum | Default value | Description |
| ----- | -------- | ---- | ------------- | ----------- |
| `env` | false | 'staging', 'demo', 'prod' | 'prod' | The airwallex env that you're integrating with |
| `checkoutOrigin` | false | string | `window.location.origin` | The checkout origin that would used to receive events |


### handle3ds
| Props | Required | Enum | Default value | Description |
| ----- | -------- | ---- | ------------- | ----------- |
| `env` | true | 'staging', 'demo', 'prod' | | The airwallex env that you're integrating with |
| `intent` | true | string | | The intent id that you would like to pay |
| `cardBin` | true | string |   | The car bin of the card number, normally the first 6 number of the card number |
| `next_action` | true | object |  | The next_action object that you get from the confirm API response |
| `authFormContainer` | false | string | '' |  The container that you would like the authentication popup shows in |
| `challengeWindowSize` | false | '01',  '02', '03', '04', '05' | '05' | The preferred window size for the authentication form |


## Guide


The following steps demonstrates the best practices to integrating with API and let us handle the 3ds is in Javascript.

  

### 1. At the start of your file, import `airwallex-payment-elements`.

  

```js

import  Airwallex  from  'airwallex-payment-elements';

```

  

or add the bundle as a script in your HTML head

  

```html

<script  src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>

```

  

Be sure to replace the x.x.x with the `airwallex-payment-elements` package version you'd like to use.

  

### 2. Integrate with API to create Payment Intent

Refer Airwallex [API doc](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents_create/post)

  

### 3. Call `get3dsReturnUrl` to get the return url

  

```javascript

const  return_url  =  Airwallex.get3dsReturnUrl(env);

```

 
We will provide this in the confirm request payload in step 5



### 4. Call `getBrowserInfo` to get browserInfo


```javascript

const  device_data  =  Airwallex.getBrowserInfo({
  intent_id,
  env
});

```

 
We will provide this in the confirm request payload in step 5


### 5. Build the confirm payload with `device_data` and `return_url`

```javascript

const  payload  =  {
  ...,
  device_data: device_data,
  payment_method_options:  {
    ...,
    card:  {
      ...,
      three_ds:  {
        ...,
        return_url: return_url,
      }
    }
  }
};

```

### 6. Integrate with API to confirm Payment Intent
Refer Airwallex [API doc](https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents__id__confirm/post)


### 7. (Optional)If the confirm response with `next_action` , call `handle3ds` to handle the 3ds flow

```javascript

if  (confirmRes.next_action)  {
  await  handle3ds({
    env,
    intent:  {
      id:  intent_id,
      client_secret
    },
    next_action:  confirmRes.data.next_action,
    cardBin:  payload.payment_method.card.number.slice(0,  6),
    challengeWindowSize:  "04"
  }).then(res => {
    // Deal with the success response
  }).catch(err => {
    // Deal with the error
  });
}

```



### 8. Beautify and deploy!

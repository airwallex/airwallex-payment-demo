# Airwallex Payment Elements - Fraud related functions

  

The airwallex-payment-elements also provide several fraud related functions. There're two functions here, getDeviceFingerprint and getBrowserInfo.

  -  [getDeviceFingerprint](#getDeviceFingerprint)  Get device finger print of the transaction
  -  [getBrowserInfo](#getBrowserInfo) Used for collecting device data for 3ds flow which will benefits for the success of the transaction.


## Function details

### getDeviceFingerprint
| Props | Required | Enum | Default value | Description |
| ----- | -------- | ---- | ------------- | ----------- |
| `env` | false | 'staging', 'demo', 'prod' | 'prod' | The airwallex env that you're integrating with |
| `intent_id` | false | string | '' | The intent id that you would like to pay |

    
### getBrowserInfo
| Props | Required | Enum | Default value | Description |
| ----- | -------- | ---- | ------------- | ----------- |
| `env` | false | 'staging', 'demo', 'prod' | 'prod' | The airwallex env that you're integrating with |
| `checkoutOrigin` | false | string | `window.location.origin` | The checkout origin that would used to receive events |

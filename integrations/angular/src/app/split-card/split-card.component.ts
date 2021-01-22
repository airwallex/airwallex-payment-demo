import { Component, OnInit } from '@angular/core';
import {
  getElement,
  confirmPaymentIntent,
  createElement,
  loadAirwallex,
} from 'airwallex-payment-elements';

const intentid = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-split-card',
  templateUrl: './split-card.component.html',
})
export class SplitCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      const cardNumEle = createElement('cardNumber');
      cardNumEle?.mount('cardNumber');
      const cvcEle = createElement('cvc');
      cvcEle?.mount('cvc');
      const expiryEle = createElement('expiry');
      expiryEle?.mount('expiry');
    });
    window.addEventListener('onSuccess', this.onSuccess);
  }

  OnDestroy(): void {
    window.removeEventListener('onSuccess', this.onSuccess);
  }

  onSuccess(event: any) {
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  triggerConfirm = async () => {
    try {
      const cardNumEle = getElement('cardNumber');
      if (cardNumEle) {
        const confirmResult = await confirmPaymentIntent({
          element: cardNumEle,
          id: intentid,
          client_secret,
          payment_method_options: {
            card: {
              auto_capture: true,
            },
          },
        });
        console.log(`confirm success with ${JSON.stringify(confirmResult)}`);
      }
    } catch (err) {
      console.log(`confirm fail with ${JSON.stringify(err)}`);
    }
  };
}

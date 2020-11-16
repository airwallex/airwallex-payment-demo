import { Component, OnInit } from '@angular/core';
import { getElement, confirmPaymentIntent, createElement, loadAirwallex } from 'airwallex-payment-elements';

const intentid = 'int_4UQsvc4WzgQ0NIMu5zlocJBeYIg';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDU1MTYyOTEsImV4cCI6MTYwNTUxOTg5MSwiYWNjb3VudF9pZCI6ImFjNjZjZmRmLWM2ZTgtNGYxYy05NzIzLTYyNzI1NDQyZmExNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzRVUXN2YzRXemdRME5JTXU1emxvY0pCZVlJZyJ9.-n78OC6Rk5CRgTX-xOMQ7CHpLYstqBxrj_Cp48YETcE';

@Component({
  selector: 'app-split-card',
  templateUrl: './split-card.component.html',
  styleUrls: ['./split-card.component.less'],
})
export class SplitCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    loadAirwallex({
      env: 'staging',
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

  ngOnDestroy(): void {
    window.removeEventListener('onSuccess', this.onSuccess);
  }

  onSuccess(event: any) {
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  triggerConfirm = async () => {
    try {
      const cardNumEle = getElement('cardNumber');
      const confirmResult = await confirmPaymentIntent({
        element: cardNumEle!,
        id: intentid,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      });
      console.log(`confirm success with ${JSON.stringify(confirmResult)}`);
    } catch (err) {
      console.log(`confirm fail with ${JSON.stringify(err)}`);
    }
  };
}

import { Component, OnInit } from '@angular/core';
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

const intentid = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-we-chat',
  templateUrl: './we-chat.component.html',
})
export class WeChatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      const wechat = createElement('wechat', {
        intent: {
          id: intentid,
          client_secret,
        },
      });
      wechat?.mount('wechat');
    });
    window.addEventListener('onSuccess', this.onSuccess);
  }

  onSuccess(event: any) {
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  OnDestroy(): void {
    window.removeEventListener('onSuccess', this.onSuccess);
  }
}

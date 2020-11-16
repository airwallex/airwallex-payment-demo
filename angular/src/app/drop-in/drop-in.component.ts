import { Component, OnInit } from '@angular/core';
import { loadAirwallex, createElement } from 'airwallex-payment-elements';

const intentid = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-drop-in',
  templateUrl: './drop-in.component.html',
  styleUrls: ['./drop-in.component.less'],
})
export class DropInComponent implements OnInit {
  constructor() {}

  onSuccess(event: any) {
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  ngOnInit(): void {
    loadAirwallex({
      env: 'staging',
      origin: window.location.origin,
    }).then(() => {
      const dropIn = createElement('dropIn', {
        intent: {
          id: intentid,
          client_secret,
        },
      });
      dropIn?.mount('dropIn');
    });
    window.addEventListener('onSuccess', this.onSuccess);
  }

  ngOnDestroy(): void {
    window.removeEventListener('onSuccess', this.onSuccess);
  }
}

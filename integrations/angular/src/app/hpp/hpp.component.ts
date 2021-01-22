import { Component, OnInit } from '@angular/core';
import { redirectToCheckout, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-hpp',
  templateUrl: './hpp.component.html',
})
export class HppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectHpp = async () => {
    try {
      await loadAirwallex({
        env: 'demo',
      });
      await redirectToCheckout({
        env: 'demo',
        id: intent_id,
        client_secret,
      });
    } catch (error) {
      // handle errors here
    }
  };
}

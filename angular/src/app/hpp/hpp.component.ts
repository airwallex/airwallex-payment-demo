import { Component, OnInit } from '@angular/core';
import { redirectToCheckout, loadAirwallex } from "airwallex-payment-elements";

const intentid = "replace-with-your-intent-id";
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-hpp',
  templateUrl: './hpp.component.html',
  styleUrls: ['./hpp.component.less'],
})
export class HppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectHpp = async () => {
    try {
      await loadAirwallex({
        env: 'staging',
      });
      await redirectToCheckout({
        env: 'staging',
        id: intentid,
        client_secret: client_secret,
      });
    } catch (error) {
      // handle errors here
    }
  };
}

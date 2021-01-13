import { Component, OnInit } from "@angular/core";
import { redirectToCheckout, loadAirwallex } from "airwallex-payment-elements";

const intentid = "replace-with-your-intent-id";
const client_secret = "replace-with-your-client-secret";

@Component({
  selector: "app-hpp",
  templateUrl: "./hpp.component.html",
})
export class HppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectHpp = async () => {
    try {
      await loadAirwallex({
        env: "demo",
      });
      await redirectToCheckout({
        env: "demo",
        id: intentid,
        client_secret: client_secret,
      });
    } catch (error) {
      // handle errors here
    }
  };
}

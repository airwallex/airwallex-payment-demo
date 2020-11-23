import { Component, OnInit } from "@angular/core";
import { loadAirwallex, createElement } from "airwallex-payment-elements";

const intentid = "replace-with-your-intent-id";
const client_secret = "replace-with-your-client-secret";

@Component({
  selector: "app-full-featured-card",
  templateUrl: "./full-featured-card.component.html",
})
export class FullFeaturedCardComponent implements OnInit {
  constructor() {}

  onSuccess(event: any) {
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  ngOnInit(): void {
    loadAirwallex({
      env: "staging",
      origin: window.location.origin,
    }).then(() => {
      const fullFeaturedCard = createElement("fullFeaturedCard", {
        intent: {
          id: intentid,
          client_secret,
        },
      });
      fullFeaturedCard?.mount("fullFeaturedCard");
    });
    window.addEventListener("onSuccess", this.onSuccess);
  }

  ngOnDestroy(): void {
    window.removeEventListener("onSuccess", this.onSuccess);
  }
}

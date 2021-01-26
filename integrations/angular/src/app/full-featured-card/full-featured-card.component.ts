/**
 * full-featured-card.component.ts
 * Airwallex Payment Demo - Angular.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Full Featured Card element integration in Angular
 * Comments with "Example" demonstrate how states can be integrated with the
 * element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/fullfeaturedcard.md
 */

import { Component, OnInit } from '@angular/core';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { loadAirwallex, createElement } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intentid = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
@Component({
  selector: 'app-full-featured-card',
  templateUrl: './full-featured-card.component.html',
  styles: ['#fullFeaturedCard { width: 540px; margin: 48px auto; }'], // Custom styling for fullFeaturedCard container
})
export class FullFeaturedCardComponent implements OnInit {
  loading: boolean;
  constructor() {
    this.loading = true;
    this.onReady = this.onReady.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  ngOnInit(): void {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
      fonts: [
        // Can customize the font for the payment elements
        {
          src:
            'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#loadAirwallex
    }).then(() => {
      // STEP #4: Create the full featured card element
      const fullFeaturedCard = createElement('fullFeaturedCard', {
        intent: {
          // Required, must provide intent details to prepare fullFeaturedCard element
          id: intentid,
          client_secret,
        },
      });
      // STEP #5: Mount the element to the empty container created previously
      fullFeaturedCard?.mount('fullFeaturedCard');
    });

    window.addEventListener('onSuccess', this.onSuccess);
    window.addEventListener('onError', this.onError);
    window.addEventListener('onReady', this.onReady);
  }

  // STEP #6: Add an event listener to handle events when the element is mounted
  onReady = (event: any): void => {
    /**
     * ... Handle event on element mount
     */
    this.loading = false;
    console.log(`Element is ready ${JSON.stringify(event.detail)}`);
  };

  // STEP #7: Add an event listener to handle events when the payment is successful
  onSuccess = (event: any): void => {
    /**
     * ... Handle event on success
     */
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  };

  // STEP #8: Add an event listener to handle events when the payment has failed
  onError = (event: any) => {
    /**
     * ... Handle event on error
     */
    console.log(`Confirm error with ${JSON.stringify(event.detail)}`);
  };

  OnDestroy(): void {
    window.removeEventListener('onSuccess', this.onSuccess);
    window.removeEventListener('onError', this.onError);
    window.removeEventListener('onReady', this.onReady);
  }
}

/**
 * redirect.component.ts
 * Airwallex Payment Demo - Angular.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Redirect element integration in Angular
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/redirect.md
 */

import { Component, OnInit } from '@angular/core';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import {
  createElement,
  loadAirwallex,
  ElementType,
  PaymentMethodWithRedirect,
} from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

// Enter your Payment Method here, this is used to redirect the customer to the appropriate payment method
// Methods: 'alipaycn', 'alipayhk'
const redirect_method = 'replace-with-your-redirect-method' as PaymentMethodWithRedirect;

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styles: ['#redirect { width: 540px; margin: 48px auto; }'], // Custom styling for the redirect container
})
export class RedirectComponent implements OnInit {
  loading: boolean; // Example: set loading state
  errorMessage: string; // Example: set error state
  constructor() {
    this.loading = true;
    this.errorMessage = '';
    this.onReady = this.onReady.bind(this);
    this.onError = this.onError.bind(this);
  }

  ngOnInit(): void {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    }).then(() => {
      // STEP #4, 5: Create and mount the redirect element
      createElement('redirect' as ElementType, {
        intent: {
          // Required, must provide intent details to prepare redirect element for checkout
          id: intent_id,
          client_secret,
        },
        method: redirect_method, // Required, must provide payment method type
      })?.mount('redirect'); // This 'redirect' id MUST MATCH the id on your empty container created in Step 3
    });

    window.addEventListener('onReady', this.onReady);
    window.addEventListener('onError', this.onError);
  }

  // STEP #6: Add an event listener to handle events when the element is mounted
  onReady = (event: any): void => {
    /**
     * ... Handle event on element mount
     */
    this.loading = false; // Example: hide loading state
    console.log(`Element ready, ${JSON.stringify(event.detail)}`);
  };

  // STEP #7: Add an event listener to handle events when the payment procedure has failed
  onError = (event: any): void => {
    /**
     * ... Handle event on error
     */
    const { error } = event.detail;
    this.errorMessage = error.message ?? JSON.stringify(error); // Example: set error message
    console.error('There was an error', error);
  };

  OnDestroy(): void {
    window.removeEventListener('onReady', this.onReady);
    window.removeEventListener('onError', this.onError);
  }
}

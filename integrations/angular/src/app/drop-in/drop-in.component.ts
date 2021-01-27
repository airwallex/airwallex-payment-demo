/**
 * drop-in.component.ts
 * Airwallex Payment Demo - Angular.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Drop In element integration in Angular
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropin.md
 */

import { Component, OnInit } from '@angular/core';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-drop-in',
  templateUrl: './drop-in.component.html',
  styles: ['#dropIn { width: 540px; margin: 48px auto; }'], // Example: Custom styling for dropin container
})
export class DropInComponent implements OnInit {
  loading: boolean;
  errorMessage: string;
  constructor() {
    this.loading = true;
    this.errorMessage = '';
    this.onReady = this.onReady.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  ngOnInit(): void {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
      fonts: [
        // Customizes the font for the payment elements
        {
          src:
            'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#loadAirwallex
    }).then(() => {
      // STEP #4: Create the drop-in element
      const element = createElement('dropIn' as ElementType, {
        intent: {
          // Required, must provide intent details to prepare DropIn element for checkout
          id: intent_id,
          client_secret,
        },
      });
      // STEP #5: Mount the drop-in element to the empty container created previously
      element?.mount('dropIn'); // This 'dropIn' id MUST MATCH the id on your empty container created in Step 3
    });

    window.addEventListener('onReady', this.onReady);
    window.addEventListener('onSuccess', this.onSuccess);
    window.addEventListener('onError', this.onError);
  }

  // STEP #6: Add an event listener to handle events when the element is mounted
  onReady(event: any): void {
    /**
     * ... Handle events on element mount
     */
    this.loading = false;
    console.log(`Element is mounted: ${JSON.stringify(event.detail)}`);
  }

  // STEP #7: Add an event listener to handle events when the payment is successful.
  onSuccess(event: any): void {
    /**
     * ... Handle events on success
     */
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  }

  // STEP #8: Add an event listener to handle events when the payment has failed.
  onError(event: any) {
    /**
     * ... Handle events on error
     */
    const { error } = event.detail;
    this.errorMessage = error.message ?? JSON.stringify(error); // Example: set error message
    console.error('There was an error', error);
  }

  OnDestroy(): void {
    // Clean up listeners when the component is unmounting
    window.removeEventListener('onReady', this.onReady);
    window.removeEventListener('onSuccess', this.onSuccess);
    window.removeEventListener('onError', this.onError);
  }
}

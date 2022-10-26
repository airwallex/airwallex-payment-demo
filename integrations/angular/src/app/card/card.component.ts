/**
 * card.component.ts
 * Airwallex Payment Demo - Angular.  Created by Josie Ku.
 *
 * airwallex-payment-elements Card element integration in Angular
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
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
    // Example: Custom styling for card container
    '#card { border: 1px solid; border-radius: 5px; padding: 5px 10px; margin-top: 8px; height: 28px; width: 300px; }',
  ],
})
export class CardComponent implements OnInit {
  loading: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  inputErrorMessage: string;
  domElement?: HTMLElement | null;
  constructor() {
    this.loading = true;
    this.isSubmitting = false;
    this.errorMessage = '';
    this.inputErrorMessage = '';
    this.onReady = this.onReady.bind(this);
    this.onError = this.onError.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.domElement = null;
    this.triggerConfirm = this.triggerConfirm.bind(this);
  }

  ngOnInit(): void {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
      fonts: [
        // Customizes the font for the payment elements
        {
          src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#loadAirwallex
    }).then(() => {
      // STEP #4, #5: Create and mount the card element
      this.domElement = createElement('card' as ElementType)?.mount('card'); // This 'card' id MUST MATCH the id on your empty container created in Step 3
      this.domElement?.addEventListener('onReady', this.onReady);
      this.domElement?.addEventListener('onError', this.onError);
      this.domElement?.addEventListener('onBlur', this.onBlur);
      this.domElement?.addEventListener('onFocus', this.onFocus);
    });
  }

  // STEP #7: Add an event listener to ensure the element is mounted
  onReady = (event: any): void => {
    /**
     * ... Handle event when elements are mounted
     */
    this.loading = false; // Example: set loading state
    console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
  };

  // STEP #8: Add an event listener to respond to errors
  onError = (event: any): void => {
    /**
     * ... Handle events on error
     */
    const { error } = event.detail;
    this.errorMessage = error.message ?? JSON.stringify(error); // Example: set error message
    console.error('There was an error', error);
  };

  // STEP #9: Add an event listener to get input focus status
  onFocus = (event: any): void => {
    // Customize your input focus style by listen onFocus event
    this.inputErrorMessage = '';
  };

  // STEP #10: Add an event listener to show input error message when finish typing
  onBlur = (event: any): void => {
    const { error } = event.detail;
    this.inputErrorMessage = error?.message ?? JSON.stringify(error); // Example: set input error message
  };

  // STEP #6a: Add a button handler to trigger the payment request
  triggerConfirm = (): void => {
    this.isSubmitting = true;
    const card = getElement('card');
    if (card) {
      confirmPaymentIntent({
        element: card,
        id: intent_id,
        client_secret,
        // Add other payment confirmation details, see docs here: https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      })
        // STEP #6b: Listen to the request success response
        .then((response) => {
          /**
           * ...Handle confirm response
           */
          this.isSubmitting = false; // Example: sets loading state
          window.alert(`Payment Intent confirmation was successful: ${JSON.stringify(response)}`);
        })
        // STEP #6c: Listen to the request failure response
        .catch((error) => {
          /**
           * ... Handle error response
           */
          this.isSubmitting = false; // Example: sets loading state
          this.errorMessage = error.message ?? JSON.stringify(error); // Example: set error message
          console.error('There was an error', error);
        });
    }
  };

  OnDestroy(): void {
    // Clean up listeners when the component is unmounting
    this.domElement?.removeEventListener('onReady', this.onReady);
    this.domElement?.removeEventListener('onError', this.onError);
  }
}

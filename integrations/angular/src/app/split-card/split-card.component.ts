/**
 * split-card.component.ts
 * Airwallex Payment Demo - Angular.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Split Card element integration in Angular
 * Comments with "Example" demonstrate how states can be integrated with the
 * element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
 */

import { Component, OnInit } from '@angular/core';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import {
  getElement,
  confirmPaymentIntent,
  createElement,
  loadAirwallex,
  EventDetail,
} from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

@Component({
  selector: 'app-split-card',
  templateUrl: './split-card.component.html',
  styles: [
    // Example: Custom styling for the inputs
    '#cardNumber,#cvc,#expiry { border: 1px solid; border-radius: 5px; padding: 5px 10px; margin-top: 8px; height: 28px }',
  ],
})
export class SplitCardComponent implements OnInit {
  // Example: element ready states, controls the display for when elements are successfully mounted
  cardNumberReady: boolean;
  cvcReady: boolean;
  expiryReady: boolean;
  // Example: element validation state, checks if each field is completed by the shopper
  cardNumberComplete: boolean;
  cvcComplete: boolean;
  expiryComplete: boolean;
  fieldsCompleted: boolean;
  // Example: controls submission state
  isSubmitting: boolean;
  // Example: set error state
  errorMessage: string;
  constructor() {
    this.cardNumberReady = this.cvcReady = this.expiryReady = false;
    this.cardNumberComplete = this.cvcComplete = this.expiryComplete = false;
    this.isSubmitting = false;
    this.fieldsCompleted = false;
    this.errorMessage = '';
    this.onReady = this.onReady.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
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
          src:
            'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#loadAirwallex
    }).then(() => {
      // STEP #4, 5: Create and mount the individual card elements
      createElement('cardNumber')?.mount('cardNumber'); // This 'cardNumber' id MUST MATCH the id on your cardNumber empty container created in Step 3
      createElement('cvc')?.mount('cvc'); // Same as above
      createElement('expiry')?.mount('expiry'); // Same as above
    });
    window.addEventListener('onReady', this.onReady);
    window.addEventListener('onChange', this.onChange);
    window.addEventListener('onBlur', this.onBlur);
    window.addEventListener('onFocus', this.onFocus);
  }

  // STEP #7: Add an event handler to ensure the element is mounted
  onReady = (event: any): void => {
    const { type } = event.detail as EventDetail;
    if (type === 'cardNumber') {
      this.cardNumberReady = true;
    }
    if (type === 'cvc') {
      this.cvcReady = true;
    }
    if (type === 'expiry') {
      this.expiryReady = true;
    }
  };

  // STEP #8: Add an event listener to listen to the changes in each of the input fields
  onChange = (event: any) => {
    const { type, complete } = event.detail as EventDetail;
    if (type === 'cardNumber') {
      this.cardNumberComplete = complete ?? false;
    }
    if (type === 'cvc') {
      this.cvcComplete = complete ?? false;
    }
    if (type === 'expiry') {
      this.expiryComplete = complete ?? false;
    }

    this.fieldsCompleted =
      this.cardNumberComplete && this.cvcComplete && this.expiryComplete; // Example: set button disabled state
  };

  // STEP #9: Add an event listener to get input focus status
  onFocus = (event: any): void => {
    const { type } = event.detail;
    // Customize your input focus style by listen onFocus event
    const element = document.getElementById(`${type}-error`);
    if (element) {
      element.innerHTML = ''; // Example: clear input error message
    }
  };

  // STEP #10: Add an event listener to show input error message when finish typing
  onBlur = (event: any): void => {
    const { error, type } = event.detail;
    const element = document.getElementById(`${type}-error`);
    if (element) {
      element.innerHTML = error.message ?? JSON.stringify(error); // Example: set input error message
    }
  };

  // STEP #6a: Add a button handler to trigger the payment request
  triggerConfirm = async () => {
    this.isSubmitting = true; // Example: set button disabled state to prevent resubmission
    const cardNumber = getElement('cardNumber');
    if (cardNumber) {
      confirmPaymentIntent({
        element: cardNumber, // Only need to submit CardNumber element
        id: intent_id,
        client_secret,
        // Add other payment confirmation details, see docs here: https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      })
        // STEP #6b: Listen to the request response
        .then((response) => {
          /**
           * ... Handle event on success
           */
          this.isSubmitting = false;
          window.alert(`Confirm success with ${JSON.stringify(response)}`);
        })
        // STEP #6c: Listen to errors
        .catch((error) => {
          /**
           * ... Handle event on error
           */
          this.isSubmitting = false;
          this.errorMessage = error.message ?? JSON.stringify(error); // Example: set error message
          console.error('There was an error', error);
        });
    }
  };

  OnDestroy(): void {
    window.removeEventListener('onReady', this.onReady);
    window.removeEventListener('onChange', this.onChange);
  }
}

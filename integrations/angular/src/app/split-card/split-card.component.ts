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
// STEP 1: At the start of your file, import airwallex-payment-elements package
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
    // Custom styling for the inputs
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
  // Example: controls submission state
  isSubmitting: boolean;
  constructor() {
    this.cardNumberReady = this.cvcReady = this.expiryReady = false;
    this.cardNumberComplete = this.cvcComplete = this.expiryComplete = false;
    this.isSubmitting = false;
    this.onReady = this.onReady.bind(this);
    this.onChange = this.onChange.bind(this);
    this.triggerConfirm = this.triggerConfirm.bind(this);
  }

  ngOnInit(): void {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
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
      // STEP 4, 5: Create and mount the individual card elements
      createElement('cardNumber')?.mount('cardNumber'); // This 'cardNumber' id MUST MATCH the id on your cardNumber empty container created in Step 3
      createElement('cvc')?.mount('cvc'); // Same as above
      createElement('expiry')?.mount('expiry'); // Same as above
    });
    window.addEventListener('onReady', this.onReady);
    window.addEventListener('onChange', this.onChange);
  }

  // STEP 7: Add an event handler to ensure the element is mounted
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

  // STEP 8: Add an event listener to listen to the changes in each of the input fields
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
    console.log(`Elements changed with ${JSON.stringify(event.detail)}`);
  };

  // STEP 6a: Add a button handler to trigger the payment request
  triggerConfirm = async () => {
    this.isSubmitting = true;
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
        // STEP 6b: Listen to the request response
        .then((response) => {
          /**
           * ... Handle event on success
           */
          this.isSubmitting = false;
          window.alert(`Confirm success with ${JSON.stringify(response)}`);
        })
        // STEP 6c: Listen to errors
        .catch((response) => {
          /**
           * ... Handle event on error
           */
          this.isSubmitting = false;
          window.alert(`Confirm fail with ${JSON.stringify(response)}`);
        });
    }
  };

  OnDestroy(): void {
    window.removeEventListener('onReady', this.onReady);
    window.removeEventListener('onChange', this.onChange);
  }
}

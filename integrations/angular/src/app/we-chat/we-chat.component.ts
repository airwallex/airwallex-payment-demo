/**
 * we-chat.component.ts
 * Airwallex Payment Demo - Angular.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Wechat element integration in Angular
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/wechat.md
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
  selector: 'app-we-chat',
  templateUrl: './we-chat.component.html',
  styles: ['#wechat { width: 540px; margin: 48px auto; }'], // Custom styling for the wechat container
})
export class WeChatComponent implements OnInit {
  loading: boolean; // Example: set loading state
  errorMessage: string; // Example: set error state
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
    }).then(() => {
      // STEP #4, 5: Create and mount the wechat element
      createElement('wechat' as ElementType, {
        intent: {
          // Required, must provide intent details to prepare wechat element for checkout
          id: intent_id,
          client_secret,
        },
        origin: window.location.origin,
      })?.mount('wechat'); // This 'wechat' id MUST MATCH the id on your empty container created in Step 3
    });

    window.addEventListener('onReady', this.onReady);
    window.addEventListener('onSuccess', this.onSuccess);
    window.addEventListener('onError', this.onError);
  }

  // STEP #6: Add an event listener to handle events when the element is mounted
  onReady = (event: any): void => {
    /**
     * ... Handle event on element mount
     */
    this.loading = false;
    console.log(`Element ready, ${JSON.stringify(event.detail)}`);
  };

  // STEP #7: Add an event listener to handle events when the payment is successful
  onSuccess = (event: any): void => {
    /**
     * ... Handle event on success
     */
    window.alert(`Confirm success with ${JSON.stringify(event.detail)}`);
  };

  // STEP #8: Add an event listener to handle events when the payment procedure has failed
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
    window.removeEventListener('onSuccess', this.onSuccess);
    window.removeEventListener('onError', this.onError);
  }
}

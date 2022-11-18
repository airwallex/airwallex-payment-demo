/**
 * config.ts
 * Airwallex Payments Demo. Created by Shirly.Chen
 * 
 * This file saves all configs of the demo
 */
const config = {
  airwallex: {
    // Airwallex uses an API key and Client ID to authenticate requests, keys are managed via the Airwallex Webapp.
    // Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
    // Use your test keys for development and live keys for real charges in production.
    apiKey: "d0b60e5ac022b56161275ab14c6a6dfff3714770e61ef42aec474e1a09fcb3b0fbdb3891748278c8d9da075960cc6af1",
    clientId: "xClVxMTOStSziRBAEz-Pnw",
    // Use airwallex test host for development and production host in your production.
    clientApiHost: "https://api-demo.airwallex.com",
    clientPciApiHost:"https://pci-api-demo.airwallex.com"
  },
};
export default config;

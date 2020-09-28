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
    apiKey: process.env.AIRWALLEX_API_KEY,
    clientId: process.env.AIRWALLEX_CLIENT_ID,
    // Use airwallex test host for development and production host in your production.
    host: process.env.AIRWALLEX_HOST,
    paTokenInterceptor: process.env.AIRWALLEX_TOKEN_INTERCEPTOR
  },
};
export default config;

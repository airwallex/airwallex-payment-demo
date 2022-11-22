import axios from 'axios';

// Detailed payment intent request and response type can be found here:
// https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/_api_v1_pa_payment_intents_create/post
type PaymentIntentRequest = {
  request_id: string;
  merchant_order_id: string;
  amount: number;
  currency: string;
  order: {
    products: {
      url: string;
      name: string;
      desc: string;
      unit_price: number;
      currency: string;
      quantity: number;
    }[];
  };
};

type PaymentIntentBody = {
  amount: number;
  client_secret: string;
  id: string;
  currency: string;
};

export const createPaymentIntent = async (paymentIntent: PaymentIntentRequest): Promise<PaymentIntentBody> => {
  const intentData = await axios.post(
    'https://demo-pacheckoutdemo.airwallex.com/api/v1/pa/payment_intents/create',
    paymentIntent,
  );
  return intentData.data;
};

import React from 'react';
import axios from 'axios';
import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements';
import { Domain } from '../config';

export const Index: React.FC = () => {
  const selectedBook = {
    url: 'https://staging-pacheckoutdemo.airwallex.com/assets/img/book1_detail.png',
    name: 'Lumario',
    desc: 'Example product',
    unit_price: 68,
    currency: 'USD',
    quantity: 1,
  };

  const createPaymentIntent = async () => {
    const intentData = await axios.post(`${Domain.PAYMENT_INTENT}/api/v1/intent/create`, {
      amount: selectedBook.unit_price,
      currency: selectedBook.currency,
      order: {
        products: [selectedBook],
      },
    });
    return intentData.data;
  };

  const handleCheckout = async () => {
    try {
      const intent = await createPaymentIntent();
      const { id, client_secret } = intent || {};
      await loadAirwallex({
        env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      });
      redirectToCheckout({
        env: 'demo',
        mode: 'payment',
        currency: 'USD',
        intent_id: id, // Required, must provide intent details
        client_secret, // Required
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ width: 1012, margin: '0px auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <img
          style={{
            filter: 'drop-shadow(0 24px 38px rgba(22, 37, 51, 0.32))',
          }}
          src={selectedBook.url}
          width={'416px'}
          height={'auto'}
          alt="book"
        />

        <div
          style={{
            width: 416,
            position: 'relative',
            textAlign: 'start',
          }}
        >
          <div
            style={{
              marginTop: 24,
              color: '#2A2A2A',
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {selectedBook.name}
          </div>
          <div
            style={{
              marginTop: 32,
              color: '#2A2A2A',
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {`$${selectedBook.unit_price}`}
          </div>
          <button
            style={{
              borderRadius: 2,
              backgroundColor: '#161412',
              width: '100%',
              margin: '32px 0px 0px 0px',
            }}
            color="primary"
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

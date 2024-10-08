import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import GymSubscribe from './GymSubscribe';

const stripePromise = loadStripe('pk_test_51MqwXKLtZDUJknUFqrT9QWqseSlznuwfUJLZb7InHzAZ2EHNxPVqgYmxcy9CE0r96wchlhTvr6QnLWp1vA1kxIWJ00e4rQ4gk4');

const StripeContainer = () => {
    return (
      <Elements stripe={stripePromise}>
        <GymSubscribe/>
      </Elements>
    );
  };
  
  export default StripeContainer;
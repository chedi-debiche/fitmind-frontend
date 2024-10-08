import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import CheckUser from '../authentification/CheckUser';
import styles from './styles.module.css'

const GymSubscribe = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const {idg,idu,amount,ido}=useParams();

  const token=localStorage.getItem('token');


  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const response = await axios.post(`https://fitmind-backend.onrender.com/api/gyms/stripe/${idg}/${idu}/${ido}`, {
          amount: amount,
          id: id,
        });

        if (response.data.success) {
          console.log('Payment successful');
          alert('Payment successful');
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
       
      }
    } else {
      console.error(error);
      alert('Payment failed, please try again.');
    }

    setProcessing(false);
  };

  return (
    <div>
    {token ?(
    <div style={containerStyle}>
      <form onSubmit={handlePayment} style={formStyle}>
        <label style={labelStyle}>
          Card details
          <CardElement
            options={{ hidePostalCode: true }}
            style={{
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
                width: '100%',
              },
              invalid: {
                color: '#9e2146',
              },
            }}
          />
        </label>

        <label style={labelStyle}>
          Name
          <input type="text" name="name" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Email
          <input type="email" name="email" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Address line 1
          <input type="text" name="addressLine1" style={inputStyle} />
        </label>
       
        
        <label style={labelStyle}>
          State
          <input type="text" name="state" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Postal code
          <input type="text" name="postalCode" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Country
          <input type="text" name="country" style={inputStyle} />
        </label>



        <button type="submit" disabled={processing} style={buttonStyle}>
          {processing ? 'Processing...' : 'Subscribe'}
        </button>
        {error && <div className={styles.error_msg}>{error}</div>}
      </form>
    </div>
    ):(
      <CheckUser/>
    )
}
</div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  padding: '40px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#fff',
};

const labelStyle = {
  fontSize: '14px',
  marginBottom: '8px',
  color: '#555',
};

const buttonStyle = {
  marginTop: '16px',
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: '#6772e5',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
};
const inputStyle = {
  fontSize: '16px',
  color: '#424770',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '10px',
  width: '100%'
};



export default GymSubscribe;

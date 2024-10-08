import React, { useState,useEffect } from 'react';
import styles from './styles.css';
import requireAuth from '../authentification/requireAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Rating from 'react-rating-stars-component';
// import { useDispatch } from "react-redux";
import { increment } from "./redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function ProductCard({ product, onAddToCart,props }) {
  const [showDetails, setShowDetails] = useState(false);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();
  
  const addToCart = () => {
    dispatch(increment(product));
  };



  let priceForStripe;
if (product.promotion > 0) {
  priceForStripe = (product.price * (1 - product.promotion / 100) );
} else {
  priceForStripe = product.price ;
}

const publishableKey = 'pk_test_51MyLyTL3XZBpMzAUEuEw20uusBNq9YhOWRstxZPYCLCURgrQEJEP2LY4a5FyBoVUILAjBPjnMoxQwiSvl9Gxylzh006eAPsODR'
  // const { userId } = props;
  const MySwal = withReactContent(Swal);
  const [message, setMessage] = useState('');
  const [to, setTo] = useState('');

  const price = product.promotion > 0 ? (product.price * (1 - (product.promotion / 100))) : product.price;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showMessage, setShowMessage] = useState(false);






  const handleShowDetails = () => {
    setShowDetails(true);
  };

 



  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };


  const handleAddReview = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const existingReviews = product.reviews.map((review) => review.userId);
      if (existingReviews.includes(userId)) {
        // The user has already submitted a review for this product
        setShowMessage(false);
        setMessage('You have already submitted a review for this product.');
      } else {
        const response = await axios.post(
          `https://fitmind-backend.onrender.com/api/products/${product._id}/reviews`,
          {
            userId,
            rating,
            review,
          }
        );
        console.log(response.data);
        setShowMessage(true);
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again later.');
    }
  };
  
  


 
 


  const payNow = async token => {
    try {
      const response = await axios({
        url: 'https://fitmind-backend.onrender.com/api/products/payment',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
        // Get user's phone number from the database using the user ID stored in the local storage
        const userId = localStorage.getItem('userId');
        const userResponse = await axios.get(`https://fitmind-backend.onrender.com/api/users/${userId}`);
        const phoneNumber = userResponse.data.phone;
        console.log(phoneNumber); // Check the value of phoneNumber

        // Send SMS message to user
        const message = `Your payment of ${product.price} dinars has been successful! Thank you for your purchase. have a great day dear customer , FitMind TEAM.`;
        const to = phoneNumber;
        axios.post('https://fitmind-backend.onrender.com/api/products/send-sms', { message, to })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };
  
  
  
  

  
  


  const handleAddToCart = async () => {
    try {

      const userId = localStorage.getItem('userId');

      const response = await axios.post('https://fitmind-backend.onrender.com/api/cart', { userId, productId, quantity });
      console.log(response.data);
      // do something with the response
    } catch (error) {
      console.error(error);
    }
  };

  // const addToCart = async () => {
  //   try {
  //     const response = await axios.post('https://fitmind-backend.onrender.com/api/cart/', {
  //       productId: product.id,
  //       quantity: 1
  //     });
  //     console.log(response.data); // Handle successful response from server
  //   } catch (error) {
  //     console.error(error); // Handle error from server
  //   }
  // };

  return (
    <div className="product-card" style={{ backgroundColor: 'white' }}>
      <img
        className="card-img-top"
        src={`https://fitmind-backend.onrender.com/uploads/${product.image}`}
        alt={`Image of ${product.name}`}
        style={{ width: 'auto', height: '300px' }}
      />
      <div className="card-body">
        <h5
          className={styles.title}
          style={{
            textAlign: 'center',
            fontSize: '2em',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {product.name}
        </h5>
        {!showDetails && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="genric-btn primary radius"
              style={{
                fontSize: '15px',
                padding: '5px 10px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={handleShowDetails}
            >
              Show Details
            </button>
            {/* <Button variant="success" onClick={() => addToCart(props.product)}>
                            ADD TO CART +
                            </Button> */}

            <button className="btn btn-primary" variant="success" onClick={() => addToCart(product.id)}>Add to cart</button>

          </div>
        )}
        {showDetails && (
          <div>
            <h5>Product details : </h5>
            {product.promotion > 0 &&
  <p style={{fontSize: '24px', textDecoration: 'underline', fontWeight: 'bold', color: 'red'}}>
    {`New Price:  ${price} Dt`}
  </p>
}

<p style={{fontSize: '24px', fontWeight: 'bold', color: 'black'}}>Price: {`${product.price} Dt`}</p>
            <p>{`Quantity: ${product.quantity}`}</p>
            <p>{`Description: ${product.description}`}</p>
         
        <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is  ${priceForStripe} Dt`}
       token={payNow}
       
             />
             <br/>
            <h4>rating :  </h4>

<div style={{ display: 'flex', flexDirection: 'column' }}>
      <Rating
        count={5}
        size={35}
        activeColor="#ffd700"
        value={rating}
        onChange={(newRating) => setRating(newRating)}
      />
      <div>
        
</div>

<textarea
  className="form-control"
  placeholder="Write a review"
  value={review}
  onChange={(e) => setReview(e.target.value)}
/>




      
      <button
        className="btn btn-danger"
        style={{ fontSize: '10px',  }}
        onClick={() => handleAddReview()}
      >
        Submit Review
      </button>
              {/* conditionally render message */}
              {showMessage && <p>Thank you for your review!</p>}

    </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default requireAuth(ProductCard);
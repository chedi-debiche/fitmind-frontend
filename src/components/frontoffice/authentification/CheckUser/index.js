import React from 'react';
import { Link } from 'react-router-dom';

function CheckUser() {
  return (
//     <div className="not-connected-container">
//     <h2 className="not-connected-heading">You are not connected yet</h2>
//     <p className="not-connected-text">Please login to access this page</p>
//     <button className="not-connected-button" onClick={() => { window.location.href='/signin' }}>Login</button>
//   </div>
<main style={{ background: 'black' }}>
  {/*? slider Area Start*/}
  <div className="slider-area position-relative">
    <div className="slider-active">
      {/* Single Slider */}
      <div className="single-slider slider-height d-flex align-items-center">
        <div className="container">
          <div className="row" style={{ position: "relative", top: "-100px" }}>
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="hero__caption">
                <span data-animation="fadeInLeft" data-delay="0.1s">You are not Connected </span>
                <h1 data-animation="fadeInLeft" data-delay="0.4s">Please login to access</h1>
                <a><Link to="/signin" className="border-btn hero-btn"  data-animation="fadeInLeft" data-delay="0.8s"> Login</Link></a>

              </div>
            </div>
          </div>
        </div>          
      </div>
    </div>
  </div>
  </main>
   
  
  );
}

export default CheckUser;

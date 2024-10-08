import React from 'react'
import { Link } from 'react-router-dom';



function OffreFront  ({offer}) {
  
  
  return (
    <div>
        <section className="pricing-area section-padding40 fix">
    <div className="container">
     
      <div className="row">
        {/* <div className="col-lg-6 col-md-6 col-sm-6"> */}
          <div className="properties mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
            <div className="properties__card">
              <div className="about-icon">
                <img src="../assets/img/icon/price.svg" alt />
              </div>
              <div className="properties__caption">
                <span className="month">{offer.type}</span>
                <p className="mb-25">${offer.price}</p>
                <div className="single-features">
                  <div className="features-icon">
                    <img src="../assets/img/icon/check.svg" alt />
                  </div>
                  <div className="features-caption">
                    <p>{offer.name} </p>
                  </div>
                </div>
                <div className="single-features">
                  <div className="features-icon">
                    <img src="../assets/img/icon/check.svg" alt />
                  </div>
                  <div className="features-caption">
                    <p>{offer.createdAt}</p>
                  </div>
                </div>
                <div className="single-features">
                  <div className="features-icon">
                    <img src="../assets/img/icon/check.svg" alt />
                  </div>
                  <div className="features-caption">
                    <p>Free riding</p>
                  </div>
                </div>
                <div className="single-features">
                  <div className="features-icon">
                    <img src="../assets/img/icon/check.svg" alt />
                  </div>
                  <div className="features-caption">
                    <p>Unlimited equipments</p>
                  </div>
                </div>
                
                <a className="border-btn border-btn2">Join Now</a>
              </div>
            </div>
          </div>
        {/* </div> */}
       
        
      </div>
    </div>
  </section>





      
    </div>

    
  )
}

export default OffreFront
import React, { useState, useEffect } from 'react';
import FooterFront from '../shared/FooterFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient'
import CheckUser from '../authentification/CheckUser'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./subscription.css"





function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const token=localStorage.getItem('token');
  const { id } = useParams();





    useEffect(() => {
        const fetchSubscriptions = async () => {
        const response = await axios.get(`https://fitmind-backend.onrender.com/api/gyms/subscription/getByUser/${id}`);
        // const subscriptions = await response.json();
        setSubscriptions(response.data);
        console.log(response);
        }
        fetchSubscriptions();
    }, [id]);

    const updateEndDate = (subscription) => {
      const startDate = new Date(subscription.startDate);
      const endDate = new Date(startDate);
  
      if (subscription.offer.type === 'Monthly') {
        endDate.setMonth(startDate.getMonth() + 1);
      } else if (subscription.offer.type === 'Annual') {
        endDate.setFullYear(startDate.getFullYear() + 1);
      }
  
      return endDate.toISOString().slice(0, 10);
    };
  
    const updateStartDate = (subscription) => {
      const startDate = new Date(subscription.startDate);
      return startDate.toISOString().slice(0, 10);
    };

  

  return (
    <div >
       {token ? (
       <>
      <HeaderSignedInClient/>

      <main>

      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-100">
                  <h2>Subscriptions</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    <section className="contact-section">
    <div className="container">
      <div className="row">
            <div className="col-lg-8">
                <table>
                    <thead>
                    <tr>
                        <th>Gym</th>
                        <th>localisation</th>
                        <th>Offer</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        

                    </tr>
                    </thead>


                    <tbody>
                    {subscriptions.map(subscription => (
                        
                        <tr key={subscription._id}>
                            <td>{subscription.gym.name}</td>
                            <td>{subscription.gym.localisation}</td>
                            <td>{subscription.offer.name}</td>
                            <td>{subscription.offer.type}</td>
                            <td>{subscription.offer.price}</td>
                            <td>{updateStartDate(subscription)}</td>
                            <td>{updateEndDate(subscription)}</td>
                            <td>{subscription.status}</td>
                           
                        
                        </tr>
                       
                    ))}
                    
                    </tbody>

                


                </table>

            </div>
        </div>
        </div>
  </section>


      

  
    </main>
      <FooterFront />
      </>
       ):(
        <CheckUser/>
      )
    }
    </div>
  );
}

export default Subscription;
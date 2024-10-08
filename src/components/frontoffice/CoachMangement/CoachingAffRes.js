import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

import requireAuth from '../authentification/requireAuth';

 import HeaderCoaches from "../shared/HeaderCoaches";
 import FooterFront from "../shared/FooterFront";
 import { Card, Button } from 'react-bootstrap';
 import Modal from 'react-bootstrap/Modal';



const Coaching = (props) => {

  const [coachings, setCoachings] = useState([]);



  useEffect(() => {
    getCoachings();
  }, []);

  const getCoachings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `https://fitmind-backend.onrender.com/api/coachings/spesific?user=${userId}`
      );
      const fetchedCoachings = response.data;
      const coachingsWithReservations = await Promise.all(
        fetchedCoachings.map(async (coaching) => {
          const response = await axios.get(
            `https://fitmind-backend.onrender.com/api/reservations/coaching/${coaching._id}`
          );
          const reservations = response.data;
          if (reservations.length > 0) {
            return { ...coaching, reservations };
          }
          return null;
        })
      );
      const filteredCoachings = coachingsWithReservations.filter(
        (coaching) => coaching !== null
      );
      setCoachings(filteredCoachings);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
        {/* <Header/>
        <SideNav/> */}
      < HeaderCoaches/>
  

<div className="slider-area2">
  <div className="slider-height2 d-flex align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="hero-cap hero-cap2 pt-70">
            <h2>Coachings</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2>Réservation au coaching </h2>
        {coachings.map((coaching) => (
          <div key={coaching._id}>
           
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">{coaching.nameCoaching}</h1>
              
               <br></br><br></br>
                <img
                  src={`https://fitmind-backend.onrender.com/uploads/${coaching.image}`}
                  alt={`Image of ${coaching.nameCoaching}`}
                  width="100"
                />
                 <p className="card-text">{coaching.description}</p>
                <p>Category: {coaching.category}</p>
                <h5>Reservations:</h5>
                {coaching.reservations.map((reservation) => (
                  <div key={reservation._id}>
                    <p>Client: {reservation.username}</p>
                    <p>Date: {reservation.reservationdate}</p>
                    <p>email: {reservation.emailuser}</p>
                    <p>phone: {reservation.phoneuser}</p>
                    <p>Age: {reservation.age}</p>
                  </div>
                ))}
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  </div>
  
 < FooterFront/>
  {/* <Footer/> */}
</div>
);
};

export default requireAuth(Coaching);
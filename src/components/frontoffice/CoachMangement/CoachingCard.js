import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import styles from './styles.css';
import { Link } from 'react-router-dom';
import requireAuth from '../authentification/requireAuth';
import { Card, Button, Col, Row } from 'react-bootstrap';




function CoachingCard({ coaching }) {
 //const history = useHistory();
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };



  // const handleAddToCart = () => {
  //   history.push('/Reservationc');
  // };

  return (
<div className="container">
  <Card className="mb-3" style={{ backgroundColor: 'black' }}>
    <Card.Img variant="top" src={`https://fitmind-backend.onrender.com/uploads/${coaching.image}`} style={{ width: '100%' , height: '100%' }} />
    <Card.Body>
    <Card.Title className="font-weight-bold text-center" style={{ fontSize: '2em', color: 'white' }}>
  {coaching.nameCoaching}
  </Card.Title>
  </Card.Body>
  </Card> 
  {!showDetails && (
    <Link
      to={`/coaching/${coaching._id}`}
      className="genric-btn danger mt-3" // button button-contactForm boxed-btn //genric-btn danger mt-3
      style={{ fontSize: "16px" }}
    > 
     View Courses
    </Link>
  )}


      {showDetails && (
        <div>
          <h5>Details</h5>
          <p>{`Description: ${coaching.description}`}</p>
          <p>{`Disponibilité: ${new Date(coaching.start).toLocaleDateString()} - ${new Date(coaching.end).toLocaleDateString()}`}</p>
          <h5>{`Name of the coach: ${coaching.nameCoach}`}</h5>
          <a href={`/Reservationc/${coaching._id}`} className="reservation-link">Réserver</a>
        </div>
      )}
   
 
</div>





 
  );
}

export default requireAuth(CoachingCard);
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
          <button
            className="genric-btn danger mt-3"
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
        )}

{showDetails && (
  <div style={{ color: 'white' }}>
    <h5 style={{ color: 'red' }}>Details</h5>
    <p style={{ color: 'white' }}>{`Description: ${coaching.description}`}</p>
    <p style={{ color: 'white' }}>{`Disponibilité: ${new Date(coaching.start).toLocaleDateString()} - ${new Date(coaching.end).toLocaleDateString()}`}</p>
    <h4 style={{ color: 'white' }}>{`Name of the coach: ${coaching.nameCoach}`}</h4>
    {/* <a href={`/Reservationc/${coaching._id}`} className="reservation-link">Réserver</a> */}
  </div>
)}

   
 
</div>





 
  );
}

export default requireAuth(CoachingCard);
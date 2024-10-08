import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import FooterFront from '../shared/FooterFront';
import styles from './styles.css';


function CoachingDetails() {
    const { coachingId } = useParams();
    const [coaching, setCoaching] = useState(null);
  
    useEffect(() => {
      async function fetchCoaching() {
        const response = await fetch(`https://fitmind-backend.onrender.com/api/coachings/${coachingId}`);
        const data = await response.json();
        console.log(data);        
        setCoaching(data);
      }
  
      fetchCoaching();
    }, [coachingId]);
  
    if (!coaching) {
      return <div>Loading...</div>;
    }
  
    return (
        <main style={{ background: 'black' }}>


          
                 <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Details Coach</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-tittle text-center mb-55 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
            <h2>What I Offer</h2>
          </div>
      <div className="container">
      <section className="about-area2 fix pb-padding pt-50 pb-80">
  <div className="support-wrapper align-items-center">
    <div className="right-content2">
      {/* img */}
      <div className="right-img wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
        <img src={`https://fitmind-backend.onrender.com/uploads/${coaching.image}`} alt="Coaching" style={{ width: '100%' , height: '100%' }} />
      </div>
    </div>
    <div className="left-content2">
      {/* section tittle */}
      <div className="section-tittle2 mb-20 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
        <div className="front-text">
          <h2>{coaching.nameCoaching}</h2>
          <p style={{ display: 'inline-block' }}> Bonjour, je suis </p> <h3 style={{ display: 'inline-block', color: 'white' }}> {coaching.nameCoach} </h3> <br></br>
<p> {coaching.description} <br></br> Et enfin pour réserver à une seance meet en ligne voulez vous cliquez sur le button ci dessous et choissiez une date qui est dans la disponiblité </p> 

          <p>Disponibilité: {new Date(coaching.start).toLocaleDateString()} - {new Date(coaching.end).toLocaleDateString()}</p>
         
          <a href={`/Reservationc/${coaching._id}`}className="border-btn">Réserver</a>
        </div>
      </div>
    </div>
  </div>
</section>


      </div>
      <FooterFront />
    </main>
    );
    
  }

  
// ...
export default CoachingDetails;


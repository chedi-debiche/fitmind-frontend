import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../authentification/requireAuth';
import HeaderSignedInClient from "../shared/HeaderSignedInClient";
import FooterFront from "../shared/FooterFront";
import { useParams } from 'react-router-dom';

const ReservationC = (props) => {
  const { coachingId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [formValues, setFormValues] = useState({
    username: '',
    age: '',
     emailuser:'',
     phoneuser:'',
    reservationdate:'',
    coachingName: '',
    coachName:''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    try {
      const user = localStorage.getItem('userId');
      const response = await axios.get(`https://fitmind-backend.onrender.com/api/reservations/spesific?user=${user}`);
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const coaching = await axios.get(`https://fitmind-backend.onrender.com/api/coachings/${coachingId}`);
      const start = new Date(coaching.data.start);
      const end = new Date(coaching.data.end);
      const reservationdate = new Date(formValues.reservationdate);
      const nameCoaching = coaching.data.nameCoaching;
      const nameCoach = coaching.data.nameCoach;
  
      if (reservationdate < start || reservationdate > end) {
        setError(`La date de réservation doit être comprise entre le ${start.toLocaleDateString()} et le ${end.toLocaleDateString()} !!`);
        return;
      }
  
      const userId = localStorage.getItem('userId');
      const user = await axios.get(`https://fitmind-backend.onrender.com/api/users/${userId}`);
      const { firstName, lastName, phone, email } = user.data;
  
         // Check if the user has already made a reservation
         const u = localStorage.getItem('userId');
         const response = await axios.get(`https://fitmind-backend.onrender.com/api/reservations/spesificc?user=${u}`);
      // Check if user already has a reservation for this coaching
      const hasReservation = response.data.length > 0;
        
      // If the user has already made a reservation, display an error message and prevent form submission
      if (hasReservation) {
        alert('Vous avez déjà effectué une réservation.');
        return;
      }
  
      const reservation = {
        username: `${firstName} ${lastName}`,
        age: formValues.age,
        reservationdate: formValues.reservationdate,
        phoneuser: phone,
        emailuser: email,
        user: userId,
        coaching: coachingId,
        coachingName: nameCoaching,
        coachName: nameCoach
      };
  
      if (editing) {
        await axios.patch(`https://fitmind-backend.onrender.com/api/reservations/${editId}`, reservation);
        setEditing(false);
      } else {
        await axios.post(`https://fitmind-backend.onrender.com/api/reservations/${coachingId}`, reservation);
        setSuccessMessage('Votre réservation a été ajoutée avec succès! Veuillez consulter la liste de réservations.');
        alert('Vérifier votre email pour la confirmation de réservation');
      }
  
      setFormValues({
        username: '',
        age: '',
        reservationdate: '',
        phoneuser: '',
        emailuser: '',
        coachingName: '',
        coachName: ''
      });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400 && error.response.data.error === 'User already has a reservation for this coaching.') {
        setError('Vous avez déjà effectué une réservation pour ce coaching !');
      } else {
        setError('Une erreur est survenue lors de la soumission du formulaire !');
      }
    }
    
  };
  
  
  
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/reservations/${id}`);
      getReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`https://fitmind-backend.onrender.com/api/reservations/${id}`);
      setFormValues(response.data);
      setEditing(true);
      setEditId(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        {/* <Header/>
        <SideNav/> */}
      < HeaderSignedInClient/>
  

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

 
  <section className="contact-section">
    <div className="container">
    
      <div className="row">
        <div className="col-12">
          <h2 className="contact-title">Get in Reservation</h2>
        </div>
        <div className="col-lg-8">

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-contact contact_form"   id="contactForm">
 
<div className="col-sm-6">
           <div className="form-group">
             <input className="form-control valid"  type="text"
   id="age"
   placeholder="Enter your age"
   value={formValues.age}
   onChange={(e) =>
     setFormValues({ ...formValues, age: e.target.value })
   }   />
           </div>
          
         </div> 
       

  <div className="col-12">
                <div className="form-group">
                <label htmlFor="reservationdate" style={{ fontSize: "14px", color: "#999" }}>Select a date</label>
                    <input 
                   className="form-control"
                    type="date"
                     id="reservationdate"
                     value={formValues.reservationdate}
                     onChange={(e) => setFormValues({ ...formValues, reservationdate: e.target.value })}
                     />


                </div>
              </div>
 {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

<div className="form-group mt-3">
              <button type="submit" className="button button-contactForm boxed-btn">{editing ? 'Update' : 'Send'}</button>
            </div>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
{editing && (
 <button type="button" onClick={() => setEditing(false)}>
   Cancel
 </button>
 )}

</form>
          {/* <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" noValidate="novalidate">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <textarea className="form-control w-100" name="message" id="message" cols={30} rows={9} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message" defaultValue={""} />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input className="form-control valid" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input className="form-control valid" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Email" />
                </div>
              </div>
            
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="button button-contactForm boxed-btn">Send</button>
            </div>
          </form> */}
        </div>
        <div className="col-lg-3 offset-lg-1">
          <div className="media contact-info">
            <span className="contact-info__icon"><i className="ti-home" /></span>
            <div className="media-body">
              <h3>Buttonwood, California.</h3>
              <p>Rosemead, CA 91770</p>
            </div>
          </div>
          <div className="media contact-info">
            <span className="contact-info__icon"><i className="ti-tablet" /></span>
            <div className="media-body">
              <h3>+1 253 565 2365</h3>
              <p>Mon to Fri 9am to 6pm</p>
            </div>
          </div>
          <div className="media contact-info">
            <span className="contact-info__icon"><i className="ti-email" /></span>
            <div className="media-body">
              <h3>fit-mind@pegasus.tn</h3>
              <p>Send us your query anytime!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

 < FooterFront/>
  {/* <Footer/> */}
</div>
);
};

export default requireAuth(ReservationC);




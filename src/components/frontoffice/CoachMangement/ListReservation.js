import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../authentification/requireAuth';
import HeaderSignedInClient from "../shared/HeaderSignedInClient";
import FooterFront from "../shared/FooterFront";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReservationC = (props) => {
  const [reservations, setReservations] = useState([]);
  const reservationsRef = useRef(null);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/reservations/${id}`);
      getReservations();
    } catch (error) {
      console.error(error);
    }
  };
  const handlePrint = (id) => {
    const reservation = reservations.find(reservation => reservation._id === id);
  
    // Hide the "Imprimer PDF" and "Supprimer" buttons
    const buttons = document.querySelectorAll(`#reservation-${id} button`);
    buttons.forEach(button => {
      button.style.display = "none";
    });
  
    // Add the logo
    const logo = new Image();
    logo.src = `${process.env.PUBLIC_URL}/fitmindlogo.png`;
  
    // Wait for the logo to load before rendering the PDF
    logo.onload = function() {
      html2canvas(document.querySelector(`#reservation-${id}`)).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
  
        const pdf = new jsPDF();
        const options = {
          scale: 1,
          fontSize: 10,
          fontStyle: "normal"
        };
  
        pdf.addImage(logo, "PNG", 10, 10, 30, 30); // Add the logo to the PDF
  
        pdf.setFontSize(18);
        pdf.setTextColor("red");
        pdf.text("Votre Réservation", pdf.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  
        pdf.addImage(imgData, "PNG", 10, 50, 450, 100, "", "FAST", 0, options);
  
        pdf.setFontSize(14);
        pdf.setTextColor("black");
        pdf.text("FitMind est en fait un site web de méditation et de bien-être mental, Il offre\ndes programmes de méditation guidée de développement personnel et de coaching\nen ligne pour aider les utilisateurs à réduire le stress, à améliorer \nleur concentration,leur bien-être émotionnel et leur performance mentale.\nFitMind utilise une combinaison de \ntechniques modernes de neuroscience et de pratiques de \n méditation traditionnelles pour aider les utilisateurs à cultiver \n leur bien-être mental.  \nLe site web propose également des ressources telles que des articles, des vidéos et\n des podcasts sur la méditation et le bien-être. \n En somme, FitMind est un site web qui permet aux utilisateurs de prendre soin de \nleur santé mentale et de leur bien-être personnel.  \n\n\n\n Merci pour votre réservation, vous êtes les bienvenus!", 5, 170, { align: "left" });
        
  
        pdf.save(`${reservation.coachingName}-${reservation.reservationdate}.pdf`);
  
        // Show the "Imprimer PDF" and "Supprimer" buttons again
        buttons.forEach(button => {
          button.style.display = "inline-block";
        });
      });
    };
  };
  
  
  
  

  
  return (
    <div>
      <HeaderSignedInClient/>
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
        <h1>Vos reservations</h1>
      
          {reservations.map((reservation) => (
             <li key={reservation._id} id={`reservation-${reservation._id}`}>
              <p><strong>Utilisateur :</strong> {reservation.username}</p>
              <p><strong>Email :</strong> {reservation.emailuser}</p>
              <p><strong>Téléphone :</strong> {reservation.phoneuser}</p>
              <p><strong>Âge :</strong> {reservation.age}</p>
              <p><strong>Nom du coaching :</strong> {reservation.coachingName}</p>
              <p><strong>Nom du coach :</strong> {reservation.coachName}</p>
              <p><strong>Date de réservation :</strong> {new Date(reservation.reservationdate).toLocaleDateString()}</p>
              <button className={styles.delete} onClick={() => handleDelete(reservation._id)}>
                <FontAwesomeIcon icon={faTrash} /> Supprimer
              </button>
              <button className={styles.delete} onClick={() => handlePrint(reservation._id)}>Imprimer PDF</button>
            </li>
          ))}
    
      </div>
      {/* <button onClick={handlePrint}>Imprimer PDF</button> */}
      <FooterFront/>
    </div>
  );
};

export default requireAuth(ReservationC);
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";
import requireAuth from '../../frontoffice/authentification/requireAuth';
import { Pie, Line } from 'react-chartjs-2';

// import './Chart.css';
import 'chart.js/auto';




const ReservationCoaching = () => {
  
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState([]);
  const [statsByDate, setStatsByDate] = useState([]);

  

  useEffect(() => {
    getReservations();
    getStats();
    getStatss();
    
  }, []);

  const getReservations = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  const getStats = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/reservations/stats');
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const getStatss = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/reservations/statsByDate');
      setStatsByDate(response.data);
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

  return (
    <div className={styles.container}>
      <Header/>
      <SideNav/> 
      {statsByDate.length > 0 && (
  <div>
    <h2>Statistiques de nombre de réservation par date</h2>
    <Line
      data={{
        labels: statsByDate.map((stat) => stat._id),
        datasets: [
          {
            label: 'Nombre de réservations',
            data: statsByDate.map((stat) => stat.count),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      }}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        aspectRatio: 3.5,
      }}
    />
  </div>
)}

      {stats.length > 0 && (
  <div>
    <h2>Statistiques de nombre de réservation par coach</h2>
    <Pie
      data={{
        labels: stats.map((stat) => stat._id),
        datasets: [
          {
            data: stats.map((stat) => stat.count),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#1abc9c',
              '#3498db',
              '#f1c40f',
              '#8e44ad',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#1abc9c',
              '#3498db',
              '#f1c40f',
              '#8e44ad',
            ],
          },
        ],
      }}
      options={{
        aspectRatio: 3.5
      }}
    />
  </div>
)}
 <h1>Réservations Coachings List</h1>
      {/* <button onClick={getStats}>Stats</button> */}
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>phone</th>
            <th>age</th>
            <th>nameCoaching</th>
            <th>nameCoach</th>
            <th>Date de reservation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.username}</td>
              <td>{reservation.emailuser}</td>
              <td>{reservation.phoneuser}</td>
              <td>{reservation.age}</td>
              <td>{reservation.coachingName}</td>
              <td>{reservation.coachName}</td>
              <td>{new Date(reservation.reservationdate).toLocaleDateString()} </td>
              
              <td>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(reservation._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Footer/> 
    </div>
  );
};

export default requireAuth(ReservationCoaching);

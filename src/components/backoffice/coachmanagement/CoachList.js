import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import SideNav from '../sharedBack/SideNav';
import Header from '../sharedBack/Header';
import Footer from '../sharedBack/Footer';
import { Bar } from 'react-chartjs-2';
import requireAuth from '../../frontoffice/authentification/requireAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Coaching = () => {
  const [coachings, setCoachings] = useState([]);

  useEffect(() => {
    getCoachings();
  }, []);

  const getCoachings = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/coachings');
      setCoachings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getChartData = () => {
    const data = {
      labels: [], // les noms des nameCoachs
      datasets: [
        {
          label: 'Nombre de coachings',
          data: [], // le nombre de coachings pour chaque nameCoach
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
    // calculer le nombre de coachings pour chaque nameCoach
    const coachingsByCoach = {};
    coachings.forEach((coaching) => {
      const { nameCoach } = coaching;
      if (!coachingsByCoach[nameCoach]) {
        coachingsByCoach[nameCoach] = 1;
      } else {
        coachingsByCoach[nameCoach]++;
      }
    });
    // mettre les données dans le format attendu par le graphique
    Object.entries(coachingsByCoach).forEach(([nameCoach, count]) => {
      data.labels.push(nameCoach);
      data.datasets[0].data.push(count);
    });

    return data;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/coachings/${id}`);
      getCoachings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <SideNav />


      <div>
        <h2>Statistiques des coachings par coach</h2>
        <Bar data={getChartData()} />
      </div>

      
      <h1>Coachings List</h1>
  <table className={styles.table}>
    <thead>
      <tr>
        <th>nameCoaching</th>
        <th>nameCoach</th>
        <th>description</th>
        <th>image</th>
        <th>category</th>
        <th>periode</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {coachings.map((coaching) => (
        <tr key={coaching._id}>
          <td>{coaching.nameCoaching}</td>
          <td>{coaching.nameCoach}</td>
          <td>{coaching.description}</td>
          <td>
            <img
        src={`https://fitmind-backend.onrender.com/uploads/${coaching.image}`}
//   alt={`Image of ${product.name}`}
              width="100"
            />
          </td>
          <td>{coaching.category}</td>
          <td>{new Date(coaching.start).toLocaleDateString()} - {new Date(coaching.end).toLocaleDateString()} </td>
          <td>


  <button
    className={styles.delete}
    onClick={() => handleDelete(coaching._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>

      <Footer />
    </div>
  );
};

export default requireAuth(Coaching) ;

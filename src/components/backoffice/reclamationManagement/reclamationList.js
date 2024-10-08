import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash , faBan , faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";








const ReclamationList = () => {
  const [reclamations, setReclamations] = useState([]);
  const [deletedRecId, setDeletedRecId] = useState(null);

  const [showReclamation, setShowReclamation] = useState(false);
  const [latestReclamation, setLatestReclamation] = useState([]);

  

  useEffect(() => {
    const fetchRecs = async () => {
      const response = await axios.get("https://fitmind-backend.onrender.com/api/reclamations/getAll");
      setReclamations(response.data);
    };
    
    fetchRecs();
  }, [deletedRecId]);


  useEffect(() => {
    async function getLatestReclamation() {
      const response = await axios.get(
        "https://fitmind-backend.onrender.com/api/reclamations/getAll?sortBy=date&order=desc&limit=1"
        // "https://fitmind-backend.onrender.com/api/reclamations/getAll?sortBy=date&order=desc"

      );
      setLatestReclamation(response.data);
      console.log(response)
    }
    getLatestReclamation();
  }, []);

  const handleDeleteReclamation = async (recId) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/reclamations/delete/${recId}`);
      setDeletedRecId(recId);
    } catch (error) {
      console.log(error);
    }
  };



  const handleUndoDelete = () => {
    setDeletedRecId(null);
  };



 
  
  
  


  

  const filteredRecs= reclamations.filter((reclamation) => reclamation._id !== deletedRecId);

  const hasUnresolvedReclamations = reclamations.some(reclamation => reclamation.status !== 'resolved');


  return (
    <div className={styles.container}>
      <Header/>
      <SideNav/>

      <h2>Reclamation List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>Profile</th> */}
            <th>User</th>
            <th>Description</th>
            <th>Status</th>
            {/* <th>Password</th> */}
            <th>Date</th>
            <th>Comments</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecs.map((reclamation) => (
            <tr key={reclamation._id}>
              <td>{reclamation.user_id}</td>
              <td>{reclamation.description}</td>
              <td>{reclamation.status}</td>
              <td>{reclamation.date}</td>
              <td>{reclamation.comments}</td>

              <tr>


        <th className={styles.transparent}>
 
  <Button

    className={styles.delete}
    onClick={() => handleDeleteReclamation(reclamation._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button> </th>

  


</tr>

            </tr>
          ))}
        </tbody>


      </table>


      <div>
      
      <button onClick={() => setShowReclamation(true)}>
        <FontAwesomeIcon icon={faExclamationCircle} color={showReclamation ? "red" : "black"} />
      </button>
      {showReclamation && latestReclamation && (
        <div>
          <h2>Latest Reclamation</h2>
          {latestReclamation.map((latestReclamation) => (
          <p>{latestReclamation.description}</p>))}
        </div>
      )}
    </div>

      

      <Footer/>
    </div>
  );
};

export default ReclamationList;

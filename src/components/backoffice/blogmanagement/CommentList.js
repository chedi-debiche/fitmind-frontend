import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { Button } from '@material-ui/core';
import SideNav from "../sharedBack/SideNav";
import Header from "../sharedBack/Header";
import Footer from "../sharedBack/Footer";
import requireAuth from '../../frontoffice/authentification/requireAuth';
import Form from 'react-bootstrap/Form';



const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  

  const getComments = async () => {
    try {
      const response = await axios.get('https://fitmind-backend.onrender.com/api/commentaire');
      getComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/commentaire/${id}`);
      getComments();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
        <Header/>
        <SideNav/>
        <div className="container">

  <h1>Comments List</h1>
  <table>
    <thead>
      <tr>
        <th>comment</th>
        <th>user</th>
        <th>post</th>

        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {comments.map((comment) => (
        <tr key={comment._id}>
          <td>{comment.comment}</td>
            <td>{comment.user}</td>
            <td>{comment.post}</td>




          <td>


  <button
    className={styles.delete}
    onClick={() => handleDelete(comment._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  <Footer/>
</div>
);
};

export default requireAuth (CommentList);
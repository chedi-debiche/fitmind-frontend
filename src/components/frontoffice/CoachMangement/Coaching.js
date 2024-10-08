import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import requireAuth from '../authentification/requireAuth';
// import { Button } from '@material-ui/core';
// import SideNav from "../sharedBack/SideNav";
 import HeaderCoaches from "../shared/HeaderCoaches";
 import FooterFront from "../shared/FooterFront";
 import { Card, Button, Col, Row } from 'react-bootstrap';
 




const Coaching = (props) => {
 // ken bel props jarrabha kif tna7i commentaire taa id user fel form data const Coaching = (props) => {
  // console.log(props);
  //const [nameCoach, setNameCoach] = useState('');
  const [coachings, setCoachings] = useState([]);
  const [formValues, setFormValues] = useState({
    nameCoaching: '',
    nameCoach: '',
    description: '',
    image: '',
    category:'',
    // availability:{
      start :'',
      end: ''
    // },
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getCoachings();
  }, []);



  const getCoachings = async () => {
    try {
      const user = localStorage.getItem('userId');
      const response = await axios.get(`https://fitmind-backend.onrender.com/api/coachings/spesific?user=${user}`);
      setCoachings(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const userId = localStorage.getItem('userId');
      formData.append('user', userId); // Add the user ID to the form data
      const response = await axios.get(`https://fitmind-backend.onrender.com/api/users/${userId}`);
      const user = response.data;
      const nameCoach = `${user.firstName} ${user.lastName}`;
      formData.append('nameCoach', nameCoach);
      formData.append('nameCoaching', formValues.nameCoaching);
     // formData.append('nameCoach', formValues.nameCoach);
      formData.append('description', formValues.description);
      formData.append('image', formValues.image);
      formData.append('rating', 0);
      formData.append('category', formValues.category);
      formData.append('start', formValues.start);
      formData.append('end', formValues.end);
      // formData.append('availability.start', formValues.start);
      // formData.append('availability.end', formValues.end);

    
    

      
      if (editing) {
        await axios.patch(`https://fitmind-backend.onrender.com/api/coachings/${editId}`, formData);
        setEditing(false);
      } else {
        await axios.post('https://fitmind-backend.onrender.com/api/coachings', formData);
      }
      setFormValues({
        nameCoaching: '',
        nameCoach: '',
        description: '',
        image: '',
    //       availability:{
     start :'',
      end: ''
    // },
       // category:'',
      });
      getCoachings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitmind-backend.onrender.com/api/coachings/${id}`);
      getCoachings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`https://fitmind-backend.onrender.com/api/coachings/${id}`);
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
  <h1>Coachings List</h1>

  <div className="container">
  <Row>
    {coachings.map((coaching) => (
      <Col key={coaching._id} sm={6} md={4}>
        <Card className="mb-3">
          <Card.Img variant="top" src={`https://fitmind-backend.onrender.com/uploads/${coaching.image}`} style={{ width: '100%' , height: '100%' }} />
          <Card.Body>
          <Card.Title className="font-weight-bold text-center">{coaching.nameCoaching}</Card.Title>
           
            <Card.Text>{coaching.description}</Card.Text>
            <Card.Text>Category: {coaching.category}</Card.Text>
            <Card.Text>Periode: {new Date(coaching.start).toLocaleDateString()} - {new Date(coaching.end).toLocaleDateString()}</Card.Text>
          
            <Card.Subtitle className="mb-2 text-muted">{coaching.nameCoach}</Card.Subtitle>
            <div className="d-flex justify-content-end">
              <Button variant="outline-secondary" onClick={() => handleEdit(coaching._id)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="outline-danger" onClick={() => handleDelete(coaching._id)} className="ml-2">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</div>

  <section className="contact-section">
    <div className="container">
    
      <div className="row">
        <div className="col-12">
          <h2 className="contact-title">{editing ? 'Edit Coaching' : 'Add Coaching'}</h2>
        </div>
        <div className="col-lg-8">

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-contact contact_form"   id="contactForm">
 
        <div className="col-12">
  <label htmlFor="category">Category:</label>
  <div>
    <input
      type="radio"
      id="sport"
      name="category"
      value="sport"
      checked={formValues.category === "sport"}
      onChange={(e) =>
        setFormValues({ ...formValues, category: e.target.value })
      }
    />
    <label htmlFor="sport">Sport</label>
  </div>
  <div>
    <input
      type="radio"
      id="psychologist"
      name="category"
      value="psychologist"
      checked={formValues.category === "psychologist"}
      onChange={(e) =>
        setFormValues({ ...formValues, category: e.target.value })
      }
    />
    <label htmlFor="psychologist">Psychologist</label>
  </div>
</div>

        <div className="col-12">
                <div className="form-group">
                  <input className="form-control valid"    type="text"
        id="nameCoaching"
        value={formValues.nameCoaching}
        onChange={(e) =>
          setFormValues({ ...formValues, nameCoaching: e.target.value })
        } placeholder="Enter your name coaching" />
                </div>
              </div>

         <div className="col-12">
                <div className="form-group">
                  <textarea className="form-control w-100"   id="description"
        value={formValues.description}
        onChange={(e) =>
          setFormValues({ ...formValues, description: e.target.value })
        } cols={30} rows={9}  placeholder="Enter Description of coaching" defaultValue={""} />
                </div>
              </div> 

              <div className="row">
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="start" style={{ fontSize: "14px", color: "#999" }}>Start date</label>
      <input 
        className="form-control"
        type="date"
        id="start"
        value={formValues.start}
        onChange={(e) =>
          setFormValues({ ...formValues, start: e.target.value })
        }
      />
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="end" style={{ fontSize: "14px", color: "#999" }}>End date</label>
      <input 
        className="form-control"
        type="date"
        id="end"
        value={formValues.end}
        onChange={(e) =>
          setFormValues({ ...formValues, end: e.target.value })
        }
      />
    </div>
  </div>
  
  <div className="form-group">
    <label htmlFor="image">Upload coaching image:</label>
    <div className="custom-file">
      <input
        type="file"
        id="image"
        className="custom-file-input"
        onChange={(e) => {
          setFormValues({ ...formValues, image: e.target.files[0] });
        }}
      />
      <label className="custom-file-label" htmlFor="image">
choose file      </label>
    </div>
  </div>
</div>

 {/* {error && <p className="error" style={{ color: 'red' }}>{error}</p>} */}


<div className="form-group mt-3">
<button type="submit" className="button button-contactForm boxed-btn">{editing ? 'Update' : 'Add'}</button>
</div>
    {editing && (
      <button type="button" className="button button-contactForm boxed-btn" onClick={() => setEditing(false)}>
      Cancel
    </button>
  )}

</form>
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

export default requireAuth(Coaching);
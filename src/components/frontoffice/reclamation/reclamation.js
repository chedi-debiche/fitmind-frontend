import React, { useEffect, useState } from 'react'
import FooterFront from '../shared/FooterFront'
import HeaderFront from '../shared/HeaderFront'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner,faList,faPlus, faEdit, faTrash , faBan} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import styles from "./styles.module.css";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from "react-rating-stars-component";
import HeaderSignedInClient from '../shared/HeaderSignedInClient';



const Reclamation = () => {

    const [formData, setFormData] = useState({
        description: '',
        type: '',
        comments:''
      });

    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        userType:""
        
    });
      const [error, setError] = useState("");
      const [msg, setMsg] = useState("");
      const id=localStorage.getItem('userId');

      const [reclamations, setReclamations] = useState([]);
      const [deletedRecId, setDeletedRecId] = useState(null);
      const [show, setShow] = useState(true);
      const [showUpdate, setShowUpdate] = useState(false);
      const [rating, setRating] = useState(0);
      const [showRating, setShowRating] = useState(true);
      const [ReclamationId, setReclamationId] = useState(null);
      const [update, setUpdate] = useState(false);

    
    useEffect(()=>{
        fetch(`https://fitmind-backend.onrender.com/api/users/getById/${id}`
        ,{
            headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          } 
        )
         .then(response=>response.json())
         .then(({ _id,password,verified,block,__v, ...data }) => setData(data))
        .catch(error =>console.error(error));
    },[id,msg]);

    // const handleChange = ({ currentTarget: input }) => {
    //     setData({ ...data, [input.name]: input.value });
    // };

    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    

      const handleTypeChange = (e) => {
        console.log('Selected type:', e.target.value);
        setFormData({ ...formData, type: e.target.value });
      };


      const handleShowList = () => {
        setShow(false);
      }

      const handleShowAdd = () => {
        setShow(true);
      }
        


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const url = `https://fitmind-backend.onrender.com/api/reclamations/add/${id}`;
          const {data:res} = await axios.post(url, formData);
          setMsg(res);
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
            console.log(error);
          }
        }
      };


      const handleChange = (newRating) => {
        setRating(newRating);
        // Here you can submit the rating to the server or do any other action
        axios.post(`https://fitmind-backend.onrender.com/api/reclamations/rating/${id}`, { rating: newRating })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
        setShowRating(false);
      };




      useEffect(() => {
        const fetchRecs = async () => {
          const response = await axios.get("https://fitmind-backend.onrender.com/api/reclamations/getAll");
          setReclamations(response.data);
        };
        
        fetchRecs();
      }, [deletedRecId]);
    
      const handleDeleteReclamation = async (recId) => {
        try {
          await axios.delete(`https://fitmind-backend.onrender.com/api/reclamations/delete/${recId}`);
          setDeletedRecId(recId);
        } catch (error) {
          console.log(error);
        }
      };





      const handleGetReclamation = async (recId) => {
        try {
        const response = await axios.get(`https://fitmind-backend.onrender.com/api/reclamations/getById/${recId}`);
        setFormData(response.data);
        setReclamationId(recId);

        } catch (error) {
          console.log(error);
        }
      };



        const handleUpdateReclamation = async (e) => {
        try {
          e.preventDefault();
          console.log(ReclamationId);
          console.log(formData.description);
          console.log(formData.type);
          console.log(formData.comments);
          console.log(formData.status);
          console.log(formData.date);
          console.log(formData) ;
          
         // console.log(formData);
          await axios.patch(`https://fitmind-backend.onrender.com/api/reclamations/update/${ReclamationId}`,formData);
          setUpdate(true) ;
        } catch (error) {
          console.log(error);
        }
      };
      





      const filteredRecs= reclamations.filter((reclamation) => reclamation._id !== deletedRecId);

      const handleShowUpdate = async () => {
        setShowUpdate(true);
      };
    
    

  return (
    <div>
<HeaderSignedInClient/>
<main>
  {/*? Hero Start */}
  <div className="slider-area2">
    <div className="slider-height2 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap hero-cap2 pt-70">
              <h2>Reclame</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Hero End */}
  {/*?  Contact Area start  */}
  <section className="contact-section">
    <div className="container">

    {show? (
     
      <div className="row">
        <div className="col-12">
          <h2 className="contact-title">Reclame here</h2>
        </div>
        <div className="col-lg-8">
          <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" noValidate="novalidate" onSubmit={handleSubmit}>
            <div className="row">
             
              <div className="col-sm-6">
                <div className="form-group">
                  <input className="form-control valid" name="name" id="name" type="text"  value={`${data.firstName} ${data.lastName}`} required />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input className="form-control valid" name="email" id="email" type="email" value={data.email}  required  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                <select name="type" id="type" className="form-control" onChange={handleTypeChange} value={formData.type}>
                    <option value="bug">Bug</option>
                    <option value="feature request">Feature Request</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                </select>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <input className="form-control" name="status" id="status" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Pending...'" placeholder="Pending..." />
                </div>
              </div>

              <div className="col-sm-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <FontAwesomeIcon icon={faSpinner} spin size="3x"  />;
              </div>


              <div className="col-12">
                <div className="form-group">
                    <textarea
                    className="form-control w-100"
                    name="description"
                    id="description"
                    cols={30}
                    rows={9}
                    placeholder="Enter Description"
                    onChange={handleTextChange}
                    value={formData.description}
                    />
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                    <textarea
                    className="form-control w-100"
                    name="comments"
                    id="comments"
                    cols={20}
                    rows={6}
                    placeholder="Enter Comments"
                    onChange={handleTextChange}
                    value={formData.comments}
                    />
                </div>
              </div>
              
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
			{msg && <div className={styles.success_msg}>{msg}</div>}
            <div className="form-group mt-3">
              <button type="submit" className="button button-contactForm boxed-btn">Send</button>
            </div>
          </form>
        </div>
        <div className="col-lg-3 offset-lg-1">
          <Link onClick={handleShowList}><div className="media contact-info">
            <span className="contact-info__icon"><FontAwesomeIcon icon={faList} size="3x" color="#007bff" /></span>
            <div className="media-body">
              <h3>Your reclamations list</h3>
              
            </div>
          </div> </Link>
          <Link onClick={handleShowAdd}><div className="media contact-info">
            <span className="contact-info__icon"><FontAwesomeIcon icon={faPlus} size="3x" color="#007bff"  /> </span>
            <div className="media-body">
              <h3>Add reclamation</h3>
            </div>
          </div> </Link>
          
        </div>
      </div>  ):(


    
        <div className="row">
           { !showUpdate ? (
  <div className="col-lg-8 order-lg-1 order-2">
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Description</th>
          <th>Status</th>
          <th>Date</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredRecs.map((reclamation) => (
          <tr key={reclamation._id}>
            {/* <td>{reclamation.user_id}</td> */}
            <td>{reclamation.description}</td>
            <td>{reclamation.status}</td>
            <td>{reclamation.date}</td>
            <td>{reclamation.comments}</td>
            <td>
              <Button className={styles.delete} onClick={() => handleDeleteReclamation(reclamation._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button className={styles.update} onClick={() =>{handleShowUpdate(); handleGetReclamation(reclamation._id);}}>
                <FontAwesomeIcon icon={faEdit}  />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
           ):(          <div className="col-lg-8">
           <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" noValidate="novalidate" onSubmit={handleUpdateReclamation}>
             <div className="row">
              
               <div className="col-sm-6">
                 <div className="form-group">
                   <input className="form-control valid" name="name" id="name" type="text"  value={`${data.firstName} ${data.lastName}`} required />
                 </div>
               </div>
               <div className="col-sm-6">
                 <div className="form-group">
                   <input className="form-control valid" name="email" id="email" type="email" value={data.email}  required  />
                 </div>
               </div>
 
               <div className="col-sm-6">
                 <div className="form-group">
                 <select name="type" id="type" className="form-control" onChange={handleTypeChange} value={formData.type}>
                     <option value="bug">Bug</option>
                     <option value="feature request">Feature Request</option>
                     <option value="complaint">Complaint</option>
                     <option value="other">Other</option>
                 </select>
                 </div>
               </div>
               <div className="col-sm-4">
                 <div className="form-group">
                   <input className="form-control" name="status" id="status" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Pending...'" placeholder="Pending..." />
                 </div>
               </div>
 
               <div className="col-sm-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
               <FontAwesomeIcon icon={faSpinner} spin size="3x"  />;
               </div>
 
 
               <div className="col-12">
                 <div className="form-group">
                     <textarea
                     className="form-control w-100"
                     name="description"
                     id="description"
                     cols={30}
                     rows={9}
                     placeholder="Enter Description"
                     onChange={handleTextChange}
                     value={formData.description}
                     />
                 </div>
               </div>
 
               <div className="col-12">
                 <div className="form-group">
                     <textarea
                     className="form-control w-100"
                     name="comments"
                     id="comments"
                     cols={20}
                     rows={6}
                     placeholder="Enter Comments"
                     onChange={handleTextChange}
                     value={formData.comments}
                     />
                 </div>
               </div>
               
             </div>
             {error && <div className={styles.error_msg}>{error}</div>}
       {msg && <div className={styles.success_msg}>{msg}</div>}
             <div className="form-group mt-3">
               <button type="submit" className="button button-contactForm boxed-btn">Send</button>
             </div>
           </form>
         </div>
         )}


  <div className="col-lg-3 offset-lg-1 order-lg-2 order-1">
    <Link onClick={handleShowList}>
      <div className="media contact-info">
        <span className="contact-info__icon"><FontAwesomeIcon icon={faList} size="3x" color="#007bff" /></span>
        <div className="media-body">
          <h3>Your reclamations list</h3>
        </div>
      </div> 
    </Link>
    <Link onClick={handleShowAdd}>
      <div className="media contact-info">
        <span className="contact-info__icon"><FontAwesomeIcon icon={faPlus} size="3x" color="#007bff"  /> </span>
        <div className="media-body">
          <h3>Add reclamation</h3>
        </div>
      </div>
    </Link>
  </div>
</div>

    

    )}
    </div>
  </section>
  {/* Contact Area End */}
  {/* ? services-area */}
  {showRating && ( <section className="services-area">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 text-center">
        <h2 style={{color:'white'}}>Rate our website:</h2>
        <div className="d-flex justify-content-center">
          <Rating
            count={5}
            size={30}
            activeColor="#ffd700"
            value={rating}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  </div>
</section> )}

</main>
<FooterFront/>

      
    </div>
  )
}

export default Reclamation

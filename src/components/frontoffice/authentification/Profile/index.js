import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from 'react-router-dom';

import { Form,Button } from 'react-bootstrap';
import avatar from '../../profile.png';
import styles from "./styles.module.css";





const Profile = () => {
  const [user, setUser]= useState([{
    // firstName : "",
    // lastName : "",
    // email:"",
    // phone:"",
  }]);
  const {id} = useParams();
  const token = localStorage.getItem('token');
  const url = "https://fitmind-backend.onrender.com/api/users/getById";
  //const { data: res } = await axios.get(`${url}/${id}`);
  const getUser = async()=>{
    try{
    const result = await axios.get(`${url}/${id}`
    ,{
      headers:{
      Authorization:`Bearer ${token}`
      }
    }
    );
    //console.log(result)
    setUser(result.data);
  }catch(error){
    console.error(error);
  }
};
  useEffect(() => {
    getUser();

    },[]);

  
console.log("AaAaAa")
console.log(user)

    return (
        <main>
        <div className={styles.signup_container}>
                    <div className="slider-area2">
                <div className="slider-height2 d-flex align-items-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="hero-cap hero-cap2 pt-70">
                          <h2>Your Profile</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    {/* <HeaderFront/> */}
                    <div className={styles.signup_form_container}>
                        <div className={styles.left}>
                            <h1>Profile <br/>details ! </h1>
                            <h1></h1>
                            < Link to={`/update/${user._id}`} >
                           <button type="button" className={styles.white_btn}>
                           Update
                          </button>
                          </Link>
                            <h1></h1><h1></h1><h1></h1>
                            <Link to="/signedin">
                            
                            <button type="button" className={styles.white_btn}>
                                back
                            </button>
                            </Link>
                           
                        
                        </div>
                        <div className={styles.right}>
                        
                        <br></br><br></br>
                         <img src={avatar} className={styles.profile_img} alt="avatar"  /> 
                         <h1>firstName</h1>
                         <strong>{user.firstName}</strong>
                         <br></br><br></br>
                         <h1>lastName</h1>
                         <strong>{user.lastName}</strong>
                         <br></br><br></br>
                         <h1>Email</h1>
                         <strong>{user.email}</strong>
                         <br></br><br></br>
                         <h1>Phone</h1>
                         <strong>{user.phone}</strong>
                         <br></br><br></br>
                        </div>
                    </div>
                </div>
            </main>
            
  
        
    );
    
};

export default Profile;

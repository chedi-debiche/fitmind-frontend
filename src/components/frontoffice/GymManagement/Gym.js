import React, { useState, useEffect } from 'react';
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import GymFront from './GymFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient'
import CheckUser from '../authentification/CheckUser';
import axios from "axios"
import { Form } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faFilter,faSort, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Rating from "react-rating-stars-component";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { Navbar, Nav } from 'react-bootstrap';



function Gyms() {
  const [term, setTerm] = useState("");
  const [services, setService] = useState("");
  const [name, setName] = useState("");
  const [searchBy, setSearchBy] = useState("name");


  const [showIcons,setShowIcons] = useState(true);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const { transcript,listening, resetTranscript } = useSpeechRecognition();

  const [gyms, setGyms] = useState([]);
  const token=localStorage.getItem('token');

  useEffect(() => {
    async function fetchGyms() {
      const response = await fetch('https://fitmind-backend.onrender.com/api/gyms/getAll');
      const data = await response.json();
      setGyms(data);
      console.log(token)
    }
    fetchGyms();
  }, []);



  function handleTermChange(event) {
    setTerm(event.target.value);
  }
  async function handleSearch(event) {
    event.preventDefault();
    const response = await axios.get(`https://fitmind-backend.onrender.com/api/gyms/searchBy/${searchBy}/${term}`);
    setGyms(response.data);
  }

  const handleSearchClick = () => {
    console.log("search clicked")
    setIsSearchClicked(true);
    setIsFilterClicked(false);
    setIsSortClicked(false);
    setShowIcons(false);
  };

  const handleFilterClick = () => {
    setIsSearchClicked(false);
    setIsFilterClicked(true);
    setIsSortClicked(false);
    setShowIcons(false);
  };

  const handleSortClick = () => {
    setIsSearchClicked(false);
    setIsFilterClicked(false);
    setIsSortClicked(true);
    setShowIcons(false);
  };



  const handleSort = (event) => {
    const sortBy = event.target.value;
    const url = `https://fitmind-backend.onrender.com/api/gyms/sort/${sortBy}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => setGyms(data));

    setIsSortClicked(false);
    setShowIcons(true);
  };


  const handleFilter = (event) => {
    event.preventDefault();
    // const rating = event.target.elements.rating.value;
  
    fetch(`https://fitmind-backend.onrender.com/api/gyms/filter/${minRating}`)
      .then((response) => response.json())
      .then((data) => setGyms(data))
      .catch((error) => console.log(error));
  };



  const handleClick = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const handleVocalSearch=()=>{

    fetch(`https://fitmind-backend.onrender.com/api/gyms/search/${transcript}`)
      .then((response) => response.json())
      .then((data) => setGyms(data))
      .catch((error) => console.log(error));
  }

 
  
  


 


  return (
    <div >
       {token ?(
       <>
      <HeaderSignedInClient/>

      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-100">
                  <h2>Gyms</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Navbar bg="light" expand="lg">
        <Navbar.Brand href=""></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        {/* Add other Nav items as needed */}
        </Nav>
      
  
        <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20vh" }}>
          {showIcons && (<div className='row'>
            <div className='features-icon col lg-4 md-4 sm-4' onClick={() => handleSearchClick()}>
              <FontAwesomeIcon icon={faSearch} size="3x" style={{color: '#8b0000'}}/>
            </div>
            <div className='features-icon col lg-4 md-4 sm-4'>
              <FontAwesomeIcon icon={faFilter} size="3x" style={{ marginLeft: '1rem', marginRight: '1rem' ,color: '#8b0000'}} onClick={handleFilterClick} />
            </div>
            <div className='features-icon col lg-4 md-4 sm-4'>
              <FontAwesomeIcon icon={faSort} size="3x" style={{ marginRight: '1rem',color: '#8b0000' }} onClick={handleSortClick} />
            </div>

            <div className='features-icon col lg-4 md-4 sm-4'>
              <FontAwesomeIcon icon={faMicrophone} size="3x" style={{ marginRight: '1rem',color: '#8b0000' }} onClick={handleClick} />
            </div>

            
              <div style={{justifyContent: "center", alignItems: "center",marginLeft:"75px" }} >
              <p style={{ fontSize: '18px' }}>{transcript}</p>
                {!listening && transcript && (
                <button onClick={handleVocalSearch} style={{ backgroundColor: "#8b0000", color: "white",  padding: "5px 10px", border: "none", borderRadius: "10px", fontSize: "12px", cursor: "pointer"}}>Search</button>
                )}    
              </div>    
            
          </div> )}

        

          {isSearchClicked &&(
      
          <div style={{ border: "1px solid black", padding: "10px", borderRadius: "15px" }}>
            <form onSubmit={handleSearch}>
          {/* <label>
            <h1>location :</h1> */}
            <div>
              <label htmlFor="search-by">Search by:</label>
              <select id="search-by" value={searchBy} onChange={(e) => setSearchBy(e.target.value)} style={{ marginLeft: '10px', padding: '5px',borderRadius:'10px' }}>
                <option value="name">Name</option>
                <option value="localisation">Localisation</option>
              </select>
            </div>         
            <input
              type="text"
              placeholder=" search By"
              value={term}
              onChange={handleTermChange}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                marginBottom: "10px",
              }}
            />
          {/* </label> */}
          <button type="submit" style={{ backgroundColor: "red", color: "white", fontSize: "20px", padding: "10px 20px", borderRadius: "5px", border: "none" }} >find</button>
        </form>
            
        
        </div> )}



              {isSortClicked &&(
            
            <div style={{ border: "1px solid black", padding: "10px", borderRadius: "15px" }}>
              <Form.Group>
                <Form.Label>Sort by:</Form.Label>
                <Form.Control as="select" onChange={handleSort}>
                  <option value="default">Default</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="lowest-rated">Lowest Rated</option>
                </Form.Control>
              </Form.Group>
        
            </div> )}



            {isFilterClicked &&(
              <div>
            <Rating
              name="min-rating"
              count={5}
              size={24}
              activeColor="#ffd700"
              onChange={(newRating) => setMinRating(newRating)}
            /> 
            <button onClick={handleFilter} style={{ backgroundColor: "red", color: "white", fontSize: "15px", padding: "10px 10px", borderRadius: "15px", border: "none", marginLeft:"20px" }} >Filter</button>
            </div>

            )}

        </section>
        </Navbar.Collapse>
      </Navbar>
      

  
  
      



      


      <div className="row">
        {gyms.map((gym) => (
          <div className="col-md-4 mb-4" key={gym._id}>
            <GymFront gym={gym} />
          </div>
        ))}
      </div>

  

      <FooterFront />
      </>
       ):(
        <CheckUser/>
      )
    }
    </div>
  );
}

export default Gyms;

import React, { useState, useEffect } from 'react';
import HeaderCoaches from '../shared/HeaderCoaches';
import FooterFront from '../shared/FooterFront';
import CoachingCard from './CoachingCard';
import requireAuth from '../authentification/requireAuth';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating-stars-component';
import styles from "./styles.module.css";
import CoachingCardCoach from './CoachingCardCoach';
//  import i18n from "i18next";
//  import { initReactI18next } from "react-i18next";

 




function Coachings() {
  const [coachings, setCoachings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [ratings, setRatings] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  

  useEffect(() => {
    async function fetchCoachings() {
      const response = await fetch('https://fitmind-backend.onrender.com/api/coachings');
      const data = await response.json();
      setCoachings(data);
    }
    fetchCoachings();
  }, []);

  const filteredCoachings = coachings.filter((coaching) => {
    if (selectedCategory === '') {
      return true; // Show all coachings if no category is selected
    }
    return coaching.category === selectedCategory;
  }).filter((coaching) =>
    coaching.nameCoaching.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedCoachings = filteredCoachings.sort((a, b) => {
    const ratingA = ratings[a._id] || 0;
    const ratingB = ratings[b._id] || 0;
    return ratingB - ratingA;
  });

  const offset = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(sortedCoachings.length / itemsPerPage);
  const currentPageCoachings = sortedCoachings.slice(offset, offset + itemsPerPage);
  

  // async function handleRating(coachingId, rating) {
  //   try {
  //     const response = await fetch(`https://fitmind-backend.onrender.com/api/coachings/${coachingId}/rating`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ rating })
  //     });
  //     const data = await response.json();
  //     const newRatings = { ...ratings };
  //     newRatings[coachingId] = rating;
  //     setRatings(newRatings);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function handlePageClick({ selected: selectedPage }) {
    setPageNumber(selectedPage);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  return (
    <main style={{ background: 'black' }}>
    <div className={darkMode ? 'dark-mode' : ''}>
    
      <HeaderCoaches />
      
     
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>List of Coaches</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="section-tittle text-center mb-55 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
            <h2>Our Coachings</h2>
          </div> */}

<div className="col-md-4 mb-4">
  <div className="search-container" >
    <input
      type="text"
      placeholder="Search coaching by coaching name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="searchbar"
      style={{
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "30px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        outline: "none",
        fontSize: "16px"
      }}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) =>
        (e.target.placeholder = "Search coaching by coaching name")
      }
    />
    <i
      className="ti-search search-icon"
      style={{ color: "red", position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", fontSize: "20px" }}
    ></i>
  </div>
</div>


      <select className="genric-btn danger mt-3" value={selectedCategory} onChange={handleCategoryChange}
        style={{
          fontSize: "14px",
          borderRadius: "50px",
          padding: "0.9px 20px"
        }}>
  <option value="">All categories</option>
  <option value="sport">Sport</option>
  <option value="psychologist">Psychologist</option>
</select>


      <div className="row">
        {currentPageCoachings.map((coaching) => (
          <div className="col-md-4 mb-4" key={coaching._id}>
            <CoachingCardCoach coaching={coaching} />
            {/* <Rating
          count={5}
          size={24}
          activeColor="#ffd700"
          value={coaching.rating || 0} // Pass the initial rating value from the coaching object
          onChange={(rating) => {
            handleRating(coaching._id, rating); // Pass the new rating value to the handleRating function
          }}
        /> */}

          </div>
        ))}
      </div>

      <ReactPaginate
  previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
  nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
  pageCount={pageCount}
  onPageChange={handlePageClick}
  containerClassName={'pagination'}
  previousLinkClassName={'previous-page'}
  nextLinkClassName={'next-page'}
  disabledClassName={'pagination-disabled'}
  activeClassName={'pagination-active'}
  pageClassName={'pagination-item'}
  pageLinkClassName={'pagination-link'}
/>

{/* <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button> */}

      <FooterFront />
     
    </div>
    </main>
    
  );
}

export default requireAuth(Coachings);

import React, { useState, useEffect } from 'react';
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import ProductCard from './ProductCard';
import requireAuth from '../authentification/requireAuth';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import HeaderSignedInClient from '../shared/HeaderSignedInClient';
import { Link } from 'react-router-dom';
import WelcomeMessage from './WelcomeMessage';
import Dictaphone from './Dictaphone';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector } from 'react-redux';
import { selectCountAll } from "./redux/slices/cartSlice";
import { NavLink } from "react-router-dom";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


// import DarkMode from "./DarkMode"
function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const CartNumber = useSelector(selectCountAll);
  const active = {
      textDecoration:'none'
  };


  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://fitmind-backend.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && product.price >= minPrice && product.price <= maxPrice
  );

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = pageNumber * itemsPerPage;
  const currentPageProducts = filteredProducts.slice(
    offset,
    offset + itemsPerPage
  );

  function handlePageClick({ selected: selectedPage }) {
    setPageNumber(selectedPage);
  }

  

  return (
    <div style={{ background: 'white' }} className="">
      <HeaderSignedInClient />
<WelcomeMessage/>


      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Products</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="conatainer">
      <div className="col-md-4 mb-4">

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchbar"
          />
          
            {/* <i className="fa fa-microphone search-icon"></i> */}
            <i class="fa fa-microphone search-icon" onClick={() => SpeechRecognition.startListening()}></i>



        </div>
      </div>
      <i class="fa fa-microphone search-icon" onClick={() => SpeechRecognition.startListening()}></i>

      <div className="col-md-4 mb-4">
  <Dictaphone setSearchTerm={setSearchTerm} />
</div>


      <div className="col-md-4 mb-4">
        <div className="price-range-container">
            <h2>Filter by price : </h2>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
      <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '32px' }} />
      ({CartNumber})
    </Link>

   

          <input
            type="range"
            min={0}
            max={1000}
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value))}
            className="price-range"
          />
          <input
            type="range"
            min={0}
            max={1000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="price-range"
          />
<span style={{ fontSize: '1.6em' }}>Price Range: ${minPrice} - ${maxPrice}</span>
        </div>
      </div>

      <div className="row">

        {currentPageProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <ProductCard product={product} />
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







      <FooterFront />
    </div>
    </div>
  );
}

export default requireAuth(Products);
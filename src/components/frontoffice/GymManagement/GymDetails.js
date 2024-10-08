import React,{useState,useEffect, useRef} from 'react'
import HeaderFront from '../shared/HeaderFront';
import FooterFront from '../shared/FooterFront';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt,faCheck } from '@fortawesome/free-solid-svg-icons';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import CheckUser from '../authentification/CheckUser';
import OffreFront from './OffreFront';
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import styles from "./styles.module.css";
import { WiDaySunny } from 'react-icons/wi'; // import sun icon
import { WiCloud } from 'react-icons/wi'; // import cloud icon


// const stripePromise = loadStripe('pk_test_51MqwXKLtZDUJknUFqrT9QWqseSlznuwfUJLZb7InHzAZ2EHNxPVqgYmxcy9CE0r96wchlhTvr6QnLWp1vA1kxIWJ00e4rQ4gk4');
function GymDetails () {
  const [gyms, setGyms] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMorePics, setShowMorePics] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [catchRate, setCatchRate] = useState(false);  
  const [rating, setRating] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  const [Offers, setOffers] = useState([]);
  const [role,setRole] = useState('') ;


  const idu=localStorage.getItem('userId');
  const token=localStorage.getItem('token');


  const {id}=useParams()
  const offersSectionRef = useRef(null)


  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => prevIndex<4 ? (prevIndex + 1) : prevIndex=0);
  };


  const handleMorePicsClick = () => {
    setShowMorePics(true);
  }
  const handleCatchPicsClick = () => {
    setShowMorePics(false);
  }

  const handleCatchRate = () => {
    setCatchRate(true);
  }


  // const handleSubscribe = () => {
  //   setShowSubscriptions(true);
  // }

  const handleRatingChange = async(value) => {
    setRating(value);

  };

  // try {
  //   const response =await axios.put(`https://fitmind-backend.onrender.com/api/gyms/rating/${id}`, { rating });
  //   setGyms(response.data);
  // } catch (error) {
  //   console.log(error);
  // }

  const submitRating = async () => {
    try {
      const response = await axios.put(`https://fitmind-backend.onrender.com/api/gyms/rating/${id}/${idu}`, { rating });
      // setGyms(response.data);
      console.log(response.data);
      setMsg(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    
  }
  
  

  useEffect(() => {
    async function fetchGyms() {
      const response = await fetch(`https://fitmind-backend.onrender.com/api/gyms/${id}`);
      const data = await response.json();
      setGyms(data);
    }
    fetchGyms();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextPhoto();
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentPhotoIndex]);


  useEffect(() => {
    async function fetchOffers() {
      const response = await fetch(`https://fitmind-backend.onrender.com/api/gyms/getOffersByGym/${id}`);
      const data = await response.json();
      setOffers(data);
      console.log(Offers);
    }
    fetchOffers();
  }, []);


  useEffect(() => {
    const handleRole = async () =>{
    

      const Role =  await axios.get(`https://fitmind-backend.onrender.com/api/users/userRole/${idu}`);
      setRole(Role.data) ;
      console.log(Role.data) ;
       
   };
    
    handleRole();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Ariana&units=metric&appid=e6c6b890d2b7bfe05c3add6d510da50c `
      );
      setWeatherData(response.data);
      console.log(weatherData);
    };

    fetchData();
    
  }, []);
  let weatherIcon = null;
  if (weatherData && weatherData.weather && weatherData.weather[0]) {
    weatherIcon = weatherData.weather[0].main === 'Clear' ? <WiDaySunny size={64} /> : <WiCloud size={64} />;
  }

  


  
  return (
    <div>
{/* <HeaderFront/> */}
{/* <HeaderSignedInClient/> */}
{token ?(
<main style={{ background: 'black' }}>
  {/*? Hero Start */}
  <div className="slider-area2">
    <div className="slider-height2 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap hero-cap2 pt-70">
              <h2>{gyms.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  
  {/* Services End */}
  {/*? About Area-2 Start */}
  <section className="about-area2 fix pb-padding pt-50 pb-80">
    <div className="support-wrapper align-items-center">
      <div className="right-content2 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
        {/* img */}
        <div className="right-img">
          {gyms.photo && gyms.photo.length > 0 && <img src={`https://fitmind-backend.onrender.com/uploads/${gyms.photo[currentPhotoIndex]}`} alt={gyms.name} style={{borderRadius:'12px'}} />}
        </div>
      </div>
      
      <div className="left-content2">
        {/* section tittle */}
        {showMorePics ? (
          <div>
            <div className="photos-grid">
            {gyms.photo.map((photo) => (
              <img key={photo} src={`https://fitmind-backend.onrender.com/uploads/${photo}`} alt="Gym" />
              
            ))}
          </div>
          <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white'}} onClick={handleCatchPicsClick} >Catch pics</Link>
          </div>
        
        

        ):(
        <div className="section-tittle2 mb-20 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
          <div className="front-text">
            <h2 className>{gyms.name}</h2>
            <p>{gyms.description}</p>
            <p className="mb-40">{gyms.services}</p>

        <div className='row'>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
              <div className="features-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'red' , fontSize: '40px' , cursor: 'pointer'}} />
              </div>
              <div className="features-caption">
                <p>{gyms.localisation}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
              <div className="features-icon">
                <FontAwesomeIcon icon={faPhoneAlt} style={{ color: 'red' , fontSize: '40px' }} />
              </div>
              <div className="features-caption">
                <p>(90) 277 278 2566</p>
              </div>
            </div>
          </div>
         
        </div>





            <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white', borderRadius: '12px'}} onClick={handleMorePicsClick} >All pics</Link>
            <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white', borderRadius: '12px'}} onClick={() => offersSectionRef.current.scrollIntoView({ behavior: 'smooth' })} >Subscribe</Link>
            {/* <button  className="border-btn" style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
              More photos
            </button> */}
            
                    

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '20px'  }} >
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    size={18}
                  />
                </label>
              );
            })}
          </div>
          {/* <Link  className="border-btn" style={{backgroundColor: 'darkred', color: 'white'}} onClick={submitRating} >Rate</Link> */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link style={{ backgroundColor: 'yellow', borderRadius: '4px', padding: '10px 18px', color: 'black' }} onClick={submitRating}>Rate</Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
            </div>




          
          </div>
        </div>
        )}
      </div>
      
    </div>
  </section>

  <div className="row"  ref={offersSectionRef}>
        <div className="col-xl-12">
          <div className="section-tittle text-center mb-55 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".1s">
            <h2>Offers</h2>
          </div>
        </div>
      </div>

  <div className="row">
        {Offers.map((offer) => (
          <div className="col-md-6 mb-6" key={offer._id}>
             {  role === 'User'    && (<Link to={`/subscribeGym/${id}/${idu}/${offer.price}/${offer._id}`} style={{ textDecoration: "none" }} >
            <OffreFront offer={offer} />
            </Link>)  } 
          </div>
          
        ))}
  </div>

  <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
  <div className="weather-widget">
  {weatherData ? (
  <>
  <div className="weather-icon">{weatherIcon}
      <div className="weather-data">
        <h1>Weather in {weatherData.name}</h1>
        <p>Temperature: {weatherData.main.temp} °C</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
        <p>Description: {weatherData.weather[0].description}</p>
    </div>
  </div>
  </>
) : (
  <p>Loading weather data...</p>
)}
    </div>

  </section>


  <FooterFront/>




</main>
):(
  <CheckUser/>
)
}
      
    </div>
  )
}
export default GymDetails;





















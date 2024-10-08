import React from 'react'
import { FaStar } from 'react-icons/fa';
// import HeaderFront from './shared/HeaderFront'
// import FooterFront from './shared/FooterFront'

import { Link } from 'react-router-dom';



function GymFront  ({gym}) {
  const fullStars = Math.floor(gym.rating);
  const starElements = [];

  for (let i = 0; i < fullStars; i++) {
    starElements.push(<FaStar key={i} size={25} color="yellow" />);
  }
  
  
  return (
    <div>


{/* <HeaderFront/> */}






<main style={{ background: 'black' }}>

 
  
  {/*? Gallery Area Start */}
  <div className="gallery-area section-padding30 ">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-6">
          <div className="box snake mb-30">
            <div className="gallery-img big-img" style={{backgroundImage: `url(https://fitmind-backend.onrender.com/uploads/${gym.photo[0]})`, backgroundSize: 'cover'}} />
            <div className="overlay">
              <div className="overlay-content">
                <div>
                  <h3>{gym.name}</h3>
                </div>
                
                <Link to={`/gymDetails/${gym._id}`}><i className="ti-plus" /></Link>
              </div>
            </div>
          </div>
          <div>
          <h3 style={{color: 'white'}}>{gym.localisation}</h3>
          </div>
          <div>
          {starElements}
          </div>
        </div>
        
      </div>
    </div>
  </div>
  
 
  
</main>
{/* <FooterFront/> */}
      
    </div>

    
  )
}

export default GymFront
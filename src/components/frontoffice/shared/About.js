import React from 'react'
import HeaderFront from './HeaderFront'
import FooterFront from './FooterFront'
import IMCCalculator from '../IMCCalculator'
import HeaderSignedInClient from './HeaderSignedInClient'
const About = () => {
  return (
    <div>
<HeaderSignedInClient/>
<main style={{ background: 'black' }}>
  {/*? Hero Start */}
  <div className="slider-area2">
    <div className="slider-height2 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap hero-cap2 pt-70">
              <h2>About Us</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* <IMCCalculator/> */}

  {/* Hero End */}
  {/*? Team */}
  <section className="team-area pt-80">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="single-cat text-center mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
            <div className="cat-icon">
              <img src="assets/img/gallery/team1.png" alt />
            </div>
            <div className="cat-cap">
              <h5><a href="services.html">Body Building</a></h5>
              <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single-cat text-center mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
            <div className="cat-icon">
              <img src="assets/img/gallery/team2.png" alt />
            </div>
            <div className="cat-cap">
              <h5><a href="services.html">Muscle Gain</a></h5>
              <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single-cat text-center mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".6s">
            <div className="cat-icon">
              <img src="assets/img/gallery/team3.png" alt />
            </div>
            <div className="cat-cap">
              <h5><a href="services.html">Weight Loss</a></h5>
              <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Services End */}
  {/*? About Area-2 Start */}
  <section className="about-area2 fix pb-padding pt-50 pb-80">
    <div className="support-wrapper align-items-center">
      <div className="right-content2 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
        {/* img */}
        <div className="right-img">
          <img src="assets/img/gallery/about.png" alt />
        </div>
      </div>
      <div className="left-content2">
        {/* section tittle */}
        <div className="section-tittle2 mb-20 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
          <div className="front-text">
            <h2 className>About Me</h2>
            <p>You’ll look at graphs and charts in Task One, how to approach the task and the language needed 
              for a successful answer. You’ll examine Task Two questions and learn how to plan, write and 
              check academic essays.</p>
            <p className="mb-40">Task One, how to approach the task and the language needed for a successful answer. You’ll 
              examine Task Two questions and learn how to plan, write and check academic essays.</p>
            <a href="courses.html" className="border-btn">My Courses</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Area End */}
  {/*? Blog Area Start */}
  <section className="home-blog-area pt-10 pb-50">
    <div className="container">
      {/* Section Tittle */}
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9 col-sm-10">
          <div className="section-tittle text-center mb-100 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
            <h2>From Blog</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6">
          <div className="home-blog-single mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
            <div className="blog-img-cap">
              <div className="blog-img">
                <img src="assets/img/gallery/blog1.png" alt />
              </div>
              <div className="blog-cap">
                <span>Gym &amp; Fitness</span>
                <h3><a href="blog_details.html">Your Antibiotic One Day To 10 Day Options</a></h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6">
          <div className="home-blog-single mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
            <div className="blog-img-cap">
              <div className="blog-img">
                <img src="assets/img/gallery/blog2.png" alt />
              </div>
              <div className="blog-cap">
                <span>Gym &amp; Fitness</span>
                <h3><a href="blog_details.html">Your Antibiotic One Day To 10 Day Options</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Blog Area End */}
  {/*? video_start */}
  <div className="video-area section-bg2 d-flex align-items-center" data-background="assets/img/gallery/video-bg.png">
    <div className="container">
      <div className="video-wrap position-relative">
        <div className="video-icon">
          <a className="popup-video btn-icon" href="https://www.youtube.com/watch?v=up68UAfH0d0"><i className="fas fa-play" /></a>
        </div>
      </div>
    </div>
  </div>
  {/* video_end */}
  {/* ? services-area */}
  <section className="services-area">
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
            <div className="features-icon">
              <img src="assets/img/icon/icon1.svg" alt />
            </div>
            <div className="features-caption">
              <h3>Location</h3>
              <p>You’ll look at graphs and charts in Task One, how to approach </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
            <div className="features-icon">
              <img src="assets/img/icon/icon2.svg" alt />
            </div>
            <div className="features-caption">
              <h3>Phone</h3>
              <p>(90) 277 278 2566</p>
              <p>  (78) 267 256 2578</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-40 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
            <div className="features-icon">
              <img src="assets/img/icon/icon3.svg" alt />
            </div>
            <div className="features-caption">
              <h3>Email</h3>
              <p>pegasus-sport@gmail.com</p>
              <p>fit-mind@pegasus.tn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
<FooterFront/>

      
    </div>
  )
}

export default About

import React from 'react'

const FooterFront = () => {
  return (
    <div>

<div>
  <footer>
    {/*? Footer Start*/}
    <div className="footer-area black-bg">
      <div className="container">
        <div className="footer-top footer-padding">
          {/* Footer Menu */}
          <div className="row">
            <div className="col-xl-12">
              <div className="single-footer-caption mb-50 text-center">
                {/* logo */}
                <div className="footer-logo wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                  <a href="index.html"><img src="../assets/img/logo/logo2.png" alt="logo2" style={{width: 300, height: 200}} /></a>
                </div>
                {/* Menu */}
                {/* Header Start */}
                <div className="header-area main-header2 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
                  <div className="main-header main-header2" style={{marginLeft:'0'}}>
                    <div className="menu-wrapper menu-wrapper2">
                      {/* Main-menu */}
                      <div className="main-menu main-menu2 text-center">
                        <nav>
                          <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="courses.html">Gyms</a></li>
                            <li><a href="pricing.html">Coaches</a></li>
                            <li><a href="gallery.html">Products</a></li>
                            <li><a href="contact.html">Contact</a></li>
                          </ul>
                        </nav>
                      </div>   
                    </div>
                  </div>
                </div>
                {/* Header End */}
                {/* social */}
                <div className="footer-social mt-30 wow fadeInUp" data-wow-duration="3s" data-wow-delay=".8s">
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="https://bit.ly/sai4ull"><i className="fab fa-facebook-f" /></a>
                  <a href="#"><i className="fab fa-pinterest-p" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row d-flex align-items-center">
            <div className="col-lg-12">
              <div className="footer-copy-right text-center">
                <p>
                  Copyright © All rights reserved | PEGASUS TEAM <i className="fa fa-heart" aria-hidden="true" />  <a href="https://colorlib.com" target="_blank"></a>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End*/}
  </footer>
  {/* Scroll Up */}
  <div id="back-top">
    <a title="Go to Top" href="#"> <i className="fas fa-level-up-alt" /></a>
  </div>
</div>

    </div>
  )
}

export default FooterFront

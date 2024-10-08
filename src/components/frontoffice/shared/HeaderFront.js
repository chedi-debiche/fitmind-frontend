
import { Link } from 'react-router-dom';


const HeaderFront = () => {
  return (

<div>
<div>
  <meta charSet="utf-8" />
  <meta httpEquiv="x-ua-compatible" content="ie=edge" />
  <title>Gym trainer | Template </title>
  <meta name="description" content />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" href="site.webmanifest" />
  <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico" />
</div>


<body className="black-bg">
</body>

  {/* ? Preloader Start */}
  {/* <div id="preloader-active">
    <div className="preloader d-flex align-items-center justify-content-center">
      <div className="preloader-inner position-relative">
        <div className="preloader-circle" />
        <div className="preloader-img pere-text">
          <img src="assets/img/logo/loder.png" alt />
        </div>
      </div>
    </div>
  </div> */}
  {/* Preloader Start */}
  <header>
    {/* Header Start */}
    <div className="header-area header-transparent">
    {/* style={{marginLeft:'0'}} */}
      <div className="main-header header-sticky" style={{marginLeft:'0'}} >   
        <div className="container-fluid">
          <div className="menu-wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
<a href="index.html"><img src="assets/img/logo/logofit.png" alt="Logo" style={{width: 180, height: 100}} /></a>
              {/* <img src="assets/img/logo/logo.png" alt="Logo" style="width: 50px; height: 50px;"> */}



            </div>
            {/* Main-menu */}
            <div className="main-menu f-right d-none d-lg-block">
  <nav>
    <ul id="navigation">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/gyms">Gyms</Link></li>
      <li><Link to="/coaches">Coaches</Link></li>
      <li><Link to="/products">Products</Link></li>

      <li>
        <Link to="/blog">Blog</Link>
        <ul className="submenu">
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/blog_details">Blog Details</Link></li>
          <li><Link to="/elements">Elements</Link></li>
        </ul>
      </li>
      <li><Link to="/contact">Contact</Link></li>
      <li>
        <Link to="/blog">Start the adventure</Link>
        <ul className="submenu">
          <li><Link to="/signup">Sign up </Link></li>
          <li><Link to="/signin">Sign in</Link></li>
        </ul>
      </li>
    </ul>
  </nav>
</div>
     
           
            {/* Mobile Menu */}
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Header End */}
  </header>
</div>

  )
}

export default HeaderFront

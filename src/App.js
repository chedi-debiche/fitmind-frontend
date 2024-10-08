import Header from "./components/backoffice/sharedBack/Header";
import Home from "./components/backoffice/Home";
import SideNav from "./components/backoffice/sharedBack/SideNav";
import Footer from "./components/backoffice/sharedBack/Footer";
import HeaderFront from "./components/frontoffice/shared/HeaderFront";
import HomeFront from "./components/frontoffice/HomeFront";
import FooterFront from "./components/frontoffice/shared/FooterFront";
import About from "./components/frontoffice/shared/About";
import Contact from "./components/frontoffice/contact/Contact";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/frontoffice/authentification/Login/index"
import Signup from "./components/frontoffice/authentification/Signup/index";
import ForgotPassword from "./components/frontoffice/authentification/ForgotPassword/index";
import PasswordReset from "./components/frontoffice/authentification/PasswordReset/index";
import Signedin from "./components/frontoffice/shared/signedin";
import Captcha from "./components/frontoffice/authentification/Captcha/index";
import HeaderSignedInClient from "./components/frontoffice/shared/HeaderSignedInClient";
import EmailVerify from "./components/frontoffice/authentification/EmailVerify/index";
import  User  from "./components/backoffice/usermanagement/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./components/frontoffice/authentification/Profile/index";
import { useEffect, useState } from 'react';
import UpdateUser from "./components/frontoffice/update";
import GymFront from "./components/frontoffice/GymManagement/GymFront";
import Gyms from "./components/frontoffice/GymManagement/Gym";
import GymDetails from "./components/frontoffice/GymManagement/GymDetails";
import GymSubscribe from "./components/frontoffice/GymManagement/GymSubscribe";
import StripeContainer from "./components/frontoffice/GymManagement/StripeContainer";
import GymsManagement from "./components/frontoffice/GymManagement/GymsManagement";
import Subscription from "./components/frontoffice/GymManagement/subscription";
import Reclamation from "./components/frontoffice/reclamation/reclamation";

//jawher imports
import HeaderCoaches from "./components/frontoffice/shared/HeaderCoaches";
 import Coaching from "./components/frontoffice/CoachMangement/Coaching";
 import CoachingCard from "./components/frontoffice/CoachMangement/CoachingCard";
 import Coachings from "./components/frontoffice/CoachMangement/Coachings";
 import SignedinUser from "./components/frontoffice/shared/signedinUser";
 import CoachingsClient from "./components/frontoffice/CoachMangement/CoachingsClient";
 import CoachList from "./components/backoffice/coachmanagement/CoachList";
 import ReservationC from "./components/frontoffice/CoachMangement/ReservationC";
 import ListReservation from "./components/frontoffice/CoachMangement/ListReservation";
 import ReservationCoaching from "./components/backoffice/listreservationmanagement/ReservationCoaching";
 import CoachingAffRes from "./components/frontoffice/CoachMangement/CoachingAffRes";
 import CoachingDetails from "./components/frontoffice/CoachMangement/CoachingDetails";
 import CoachingCardCoach from "./components/frontoffice/CoachMangement/CoachingCardCoach";//end jawher imports

//chedi imports : 
import ProductList from "./components/backoffice/productmanagement/ProductList";
import Products from "./components/frontoffice/ProductManagement/Products";
import ProductCard from "./components/frontoffice/ProductManagement/ProductCard";
// import Cart from "./components/frontoffice/ProductManagement/Cart"
import Dictaphone from "./components/frontoffice/ProductManagement/Dictaphone";
import BlogList from "./components/frontoffice/blogManagement/BlogList";
import CreateBlogPost from "./components/frontoffice/blogManagement/createBlog";
import BlogUpdate from "./components/frontoffice/blogManagement/BlogUpdate";
import Blogdashboard from "./components/backoffice/blogmanagement/BlogList";
import BlogPost from "./components/frontoffice/blogManagement/BlogPost"
import CommentForm from "./components/frontoffice/blogManagement/commentForm";
import CommentsList from "./components/frontoffice/blogManagement/CommentsList";
import Cart from "./components/frontoffice/ProductManagement/Cart";
import NotFound from "./components/frontoffice/shared/NotFound";
import CommentsListd from "./components/backoffice/blogmanagement/CommentList";
import HomeConnected from "./components/frontoffice/HomeConnected";
import Dashboard from "./components/frontoffice/Dash/index";


//end chedi imports

//naaan dirrr 
import ReclamationList from "./components/backoffice/reclamationManagement/reclamationList";






function App() {

  return (

    <BrowserRouter>
    <div>
     
      <Routes>
           <Route path="/" element={<HomeFront />} />
           <Route path="/about" element={<About/>} />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/signin" element={<Login/>} />
           <Route path="/signup" element={<Signup/>} />
           <Route path="/showdetails/:id" element={<Profile/>} />
           <Route path="/update/:id" element={<UpdateUser/>} />
           <Route path="/homec" element={<HomeConnected/>} />



          {/* jawhar routes */}

          <Route path="/signedin" element={<Signedin/>} />
           <Route path="/signedinUser" element={<SignedinUser/>} /> 
           <Route path="/test" element={<HeaderSignedInClient/>} />
           <Route path="/testt" element={<HeaderCoaches/>} />
           <Route path="/user" element={<User/>} />
           <Route path="/CoachList" element={<CoachList/>} /> 
           <Route path="/ReservationCoaching" element={<ReservationCoaching/>} /> 



           <Route path="/Coaching" element={<Coaching/>} /> 
           <Route path="/CoachingCard" element={<CoachingCard/>} />
           <Route path="/CoachingCardCoach" element={<CoachingCardCoach/>} />
           <Route path="/Coachings" element={<Coachings/>} />
           <Route path="/CoachingsClient" element={<CoachingsClient/>} />
           <Route path="/CoachingAffRes" element={<CoachingAffRes/>} />
           {/* <Route path="/coaching/:id" element={<CoachingDetails/>} /> */}
           <Route path="/coaching/:coachingId" element={<CoachingDetails/>}/>

           <Route path="/Reservationc/:coachingId" element={<ReservationC/>} />
           {/* <Route path="/Reservationc" element={<ReservationC/>} /> */}

           <Route path="/listreservation" element={<ListReservation/>} />
{/* jawhar routes */}







          <Route path="/gyms" element={<Gyms/>} />
          <Route path="/gymf" element={<GymFront/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/gymDetails/:id" element={<GymDetails/>} />
          <Route path="/subscribe" element={<GymSubscribe/>} />
          <Route path="/subscribeGym/:idg/:idu/:amount/:ido" element={<StripeContainer/>} />
          <Route path="/subscriptions/:id" element={<Subscription/>} />
          <Route path="/gymsmanagement" element={<GymsManagement/>} />

          <Route path="/reclame" element={<Reclamation/>} />
          <Route path="/reclamations" element={<ReclamationList/>} />











           {/* <Route path="/Captcha" element={<Captcha/>} /> */}
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
		      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

 {/* chedi routes react */}

<Route path="/productsd" element={<ProductList/>} />
          <Route path="/Products" element={<Products/>} />
          <Route path="/productcard" element={<ProductCard/>} />
          {/* <Route path="/cart" element={<Cart/>} /> */}
          <Route path="/voice" element={<Dictaphone/>} />

          <Route path="/blogd" element={<Blogdashboard/>} />
          <Route path="/createblog" element={<CreateBlogPost/>} />
          <Route path="/listBlog" element={<BlogList/>} />
          {/* <Route path="/blog/:id/update" exact component={BlogUpdate} /> */}
          <Route path="/blogpost/:id" element={<BlogPost/>} />
          <Route path="/comment" element={<CommentForm/>} />
          <Route path="/commentList" element={<CommentsList/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/commentListd" element={<CommentsListd/>} />
          <Route path="/*" element={<NotFound />} />

{/* end chedi routes */}


        {/* Add more routes for other components */}
      </Routes>
        
    </div>
  </BrowserRouter>

    );
  }






    // <>
    // <HomeFront/>
    // <HeaderFront/>
    // <FooterFront/>
    
    
    // </>

    // <BrowserRouter>
    
    //   <div className="App">
        
    //     <Route exact path="/" component={Home} />
    //     <Route path="/about" component={About} />


    //     </div>
    // </BrowserRouter>
  // <>

  // back office
  //  <Header /> 
  // <Home />
  // <SideNav/>
  //  <Footer/>  

  //  front office 
  //  <HeaderFront/>
  // <HomeFront/>
  // <FooterFront/> 

  //   <HeaderFront/>
  //   <About/>

  // </>
  // );
// }

export default App;

// import axios from 'axios';
// import React, { useRef, useState } from 'react';
// import ReCAPTCHA from "react-google-recaptcha";
// import styles from "./styles.module.css";
// import HeaderFront from "../../shared/HeaderFront";

// //import "./App.css";

// const SITE_KEY = '6LfG7dckAAAAAKKcQVqZ5mS2jKb5DHWf4hVZwCx2';

// const Captcha = () => {
//   const [formValues, setFormValues] = useState({});
//   const [recaptchaValue, setRecaptchaValue] = useState('');
//   const captchaRef = useRef()

//   const handleInput = (e) => {
//     const values = {...formValues};

//     values[e.target.name] = e.target.value;

//     setFormValues(values);
//   }


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     captchaRef.current.reset();
    
//     axios.post('https://fitmind-backend.onrender.com/api/users', {
//       ...formValues,
//       recaptchaValue,
//     }).then(res => alert('User created!'))
//     .catch(error => alert(error.response.data.message));
//   }

//   const onChange = value => {
//     setRecaptchaValue(value);
//   }

//   return (
//     <main>
//     <div className={styles.signup_container}>
//                 <div className="slider-area2">
//             <div className="slider-height2 d-flex align-items-center">
//               <div className="container">
//                 <div className="row">
//                   <div className="col-xl-12">
//                     <div className="hero-cap hero-cap2 pt-70">
//                       <h2>SIGN UP</h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//                 <HeaderFront/>
//                 <div className={styles.signup_form_container}>
//                     <div className={styles.left}>
//                         <h1>Welcome back <br/>customer ! </h1>
//                         <Link to="/signin">
//                             <button type="button" className={styles.white_btn}>
//                                 Sing in
//                             </button>
//                         </Link>
//                     </div>
//                     <div className={styles.right}>
//                         <form className={styles.form_container} onSubmit={handleSubmit}>
//                             <h1>Create Account</h1>
//                             <input
//                                 type="text"
//                                 placeholder="First Name"
//                                 name="firstName"
//                                 onChange={handleChange}
//                                 value={data.firstName}
//                                 required
//                                 className={styles.input}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Last Name"
//                                 name="lastName"
//                                 onChange={handleChange}
//                                 value={data.lastName}
//                                 required
//                                 className={styles.input}
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 name="email"
//                                 onChange={handleChange}
//                                 value={data.email}
//                                 required
//                                 className={styles.input}
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 name="password"
//                                 onChange={handleChange}
//                                 value={data.password}
//                                 required
//                                 className={styles.input}
//                             />
                            
//                                 <input
//                                 type="text"
//                                 placeholder="phone"
//                                 name="phone"
//                                 onChange={handleChange}
//                                 value={data.phone}
//                                 required
//                                 className={styles.input}
//                             />
//                             {error && <div className={styles.error_msg}>{error}</div>}
//                             {msg && <div className={styles.success_msg}>{msg}</div>}
//                             <button type="submit" className={styles.green_btn}>
//                                 Sing Up
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             </main>
//   );
// };

// export default Captcha;

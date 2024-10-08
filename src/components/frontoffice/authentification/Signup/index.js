import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./styles.module.css";
import HeaderFront from "../../shared/HeaderFront";
import avatar from "../../profile.png";
import convertToBase64 from "../../convert";

const SITE_KEY = "6LfG7dckAAAAAKKcQVqZ5mS2jKb5DHWf4hVZwCx2";

const Signup = () => {
  const [data, setData] = useState({
    //profile:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userType: "User",
	 //experience: "0",
	// gender: "", 
  certificate: {
    title: "", // Ajouté dans le state
    date: "",
    file: "",
  },
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [recaptchaResponse, setRecaptchaResponse] = useState("");
  const [file, setFile] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [experience, setExperience] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleCertificateChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      certificate: {
        ...data.certificate,
        [input.name]: input.value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaResponse) {
      setError("Please complete the reCAPTCHA.");
      return;
    }
    try {
      const url = "https://fitmind-backend.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleRecaptcha = (response) => {
    setRecaptchaResponse(response);
  };

  const captchaRef = useRef();

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    // setData({ ...data, profile: base64 });
  };
  


	return (
        
    <main>
<div className={styles.signup_container}>
            <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>SIGN UP</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* <HeaderFront/> */}
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome back <br/>customer ! </h1>
					<Link to="/signin">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
				</div>
				
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						
						 {/* <div className='profile flex justify-center py-4'> */}

						 <label htmlFor="profile">
                   
                  
                     <img src={file || avatar} className={styles.profile_img} alt="avatar"  />  
                     {/* <img src={postImage.profile || avatar} alt="" /> */}
                     {/* <img src={postImage.profile ? URL.createObjectURL(postImage.profile) : avatar} alt="" /> */}

					 </label>
                      {/* <input onChange={onUpload} type="file" id='profile' name='profile' />  */}
                      {/* <input 
        //   type="file"
        //   lable="Image"
        //   name="profile"
        //   id='profile'
        //   accept='.jpeg, .png, .jpg'
        //   onChange={(e) => onUpload(e)}
        //  />
                  */}
              
				   
					 {/* <div>
            Register As
            <input
              type="radio"
              name="userType"
            //   value="User"
			value= {data.userType}
             onChange={(e) => setUserType(e.target.value)}
			//onChange={handleChange}
            />
            User
            <input
              type="radio"
              name="userType"
              value={data.userType}
           onChange={(e) => setUserType(e.target.value)}
			 // onChange={handleChange}
            />
            Admin
          </div>
		   {userType == "Admin" ? (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
               onChange={(e) => setSecretKey(e.target.value)}
				//onChange={handleChange}
              />
            </div>
          ) : null}   */}

			 			{/* <input
							type="file"
							name="profile"
							id= "profile"
							onChange={onUpload} 
							onchange={handleChange} 
							value={data.profile}
							required
							 
							/> */}
						
						

            
			<h4>Register as : </h4>
	<div>		
  <label>
    <input
      type="radio"
      name="userType"
      value="User"
      checked={data.userType === "User"}
      onChange={handleChange}
      required
      className={styles.input}
    />
    User
  </label>

  <label>
    <input
      type="radio"
      name="userType"
      value="Coach"
      checked={data.userType === "Coach"}
      onChange={handleChange}
      required
      className={styles.input}
    />
    Coach
  </label>

  <label>
    <input
      type="radio"
      name="userType"
      value="GymManager"
      checked={data.userType === "GymManager"}
      onChange={handleChange}
      required
      className={styles.input}
    />
    GymManager
  </label>
  </div>

						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						
							<input
							type="text"
							placeholder="Phone"
							name="phone"
							onChange={handleChange}
							value={data.phone}
							required
							className={styles.input}
						/>
{data.userType === "GymManager" && (
              <input
							type="text"
							placeholder="Location"
							name="location"
							onChange={handleChange}
							value={data.location}
							required
							className={styles.input}
						/>
            )}

{data.userType === "Coach" && (
          <div>
           
            <input
              type="number"
              id="experience"
              name="experience"
			  placeholder=" Experience (years)"
              value={data.experience}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        )}



{data.userType === "Coach" && (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <input
      type="text"
      id="certificateTitle"
      name="title"
      placeholder="Certificate Title"
      value={data.certificate.title}
      onChange={handleCertificateChange}
      required
      className={styles.input}
    />

    <label htmlFor="certificateDate" className={styles.label}>
      Certificate Date
    </label>
    <input
      type="date"
      id="certificateDate"
      name="date"
      value={data.certificate.date}
      onChange={handleCertificateChange}
      required
      className={styles.input}
    />

<label htmlFor="certificateFile" className={styles.label}>
      Certificate File
    </label>
    <input
      type="file"
      id="certificateFile"
      name="file"
      value={data.certificate.file}
      onChange={handleCertificateChange}
      required
      className={styles.input}
    />
  </div>
)}







{data.userType === "Coach" && (
  <div>
     {/* <label htmlFor="gender" className={styles.label}>
      Gender
    </label>  */}
    <div className={styles.radioGroup}>
      <label htmlFor="man" className={styles.radioLabel}>
        <input
          type="radio"
          id="man"
          name="gender"
          value="man"
          checked={data.gender === "man"}
          onChange={handleChange}
          className={styles.radioInput}
          required
        />
        man
      </label>
      <label htmlFor="woman" className={styles.radioLabel}>
        <input
          type="radio"
          id="woman"
          name="gender"
          value="woman"
          checked={data.gender === "woman"}
          onChange={handleChange}
          className={styles.radioInput}
          required
        />
        woman
      </label>
    </div>
  </div>
)}





							
							 <ReCAPTCHA
							 sitekey={SITE_KEY}
							 onChange={handleRecaptcha}
							 ref={captchaRef}
							 className={styles.input}
							 required
						   />
						
					
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
    </main>
		
	);
};

export default Signup;
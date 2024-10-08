import { useState,useEffect} from "react";
import axios from "axios";
import {useParams, Link } from "react-router-dom";
import styles from "./styles.module.css";




const UpdateUser = () => {
  
 
  const [data, setData] = useState({
	firstName:"",
    lastName:"",
    email:"",
    phone:"",
	userType:""
	
});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { id } =useParams();

useEffect(()=>{
	fetch(`https://fitmind-backend.onrender.com/api/users/getById/${id}`
	,{
		headers:{
		Authorization:`Bearer ${localStorage.getItem('token')}`
		}
	  } 
	)
	 .then(response=>response.json())
	 .then(({ _id,password,verified,__v, ...data }) => setData(data))
	.catch(error =>console.error(error));
},[id]);

 
const handleCertificateChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      certificate: {
        ...data.certificate,
        [input.name]: input.value
      }
    });
};


const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
	
	e = await Object.assign(e)
	
    e.preventDefault();
    try {
      const{userType,...updatedData}=data;
      const url = "https://fitmind-backend.onrender.com/api/users/update";
      const { data: res } = await axios.put(`${url}/${id}`,updatedData
	  ,{
		headers:{
		Authorization:`Bearer ${localStorage.getItem('token')}`
		}
	  } 
	  );
      console.log(res);
      setMsg(res);
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

 


	return (
        <div>
        {/* <HeaderSignedInClient/> */}
        
        
    <main>
<div className={styles.signup_container}>
            <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Update</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* <HeaderFront/> */}
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Here you can  <br/>update your <br/> account ! </h1>
					<Link to={`/showdetails/${id}`}>
						<button type="button" className={styles.white_btn}>
							Back
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
                    {/* <form className={styles.form_container}> */}
						<h1>Update Account</h1>
						 {/* <div className='profile flex justify-center py-4'> */}

						 {/* <label htmlFor="profile">
                   
                  
                     <img src={file || avatar} className={styles.profile_img} alt="avatar"  /> 
					 </label>
                      <input onChange={onUpload} type="file" id='profile' name='profile' />  */}
              
				   


			 			{/* <input
							type="file"
							name="profile"
							id= "profile"
							onChange={onUpload} 
							onchange={handleChange} 
							value={data.profile}
							required
							 
							/> */}
						


						<input
							type="text"
							name="firstName"
                            // placeholder="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							name="lastName"
                            // placeholder="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							name="email"
                            // placeholder="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>


                        {/* <input
							type="password"
							name="password"
                            // placeholder="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/> */}
						
							<input
							type="text"
							name="phone"
                            // placeholder="phone"
							onChange={handleChange}
						    value={data.phone}
							required
							className={styles.input}
						/>

							{/* <input
							type="text"
							name="userType"
                            // placeholder="userType"
							onChange={handleChange}
						    value={data.userType}
							required
							className={styles.input}
						/> */}

						




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
						<div style={{ display: "flex", flexDirection: "column" }}>
						    
							<label htmlFor="certificateDate" className={styles.label}>
								Experience
							</label>
							<input
							type="number"
							id="experience"
							name="experience"
							value={data.experience}
							onChange={handleCertificateChange}
							required
							className={styles.input}
							/>
						</div>
						)}



				{data.userType === "Coach" && (
				<div style={{ display: "flex", flexDirection: "column" }}>
					
					<label htmlFor="certificateDate" className={styles.label}>
					Certificate Title
					</label>
					<input
					type="text"
					id="certificateTitle"
					name="title"
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
				</div>
				)}


				{data.userType === "Coach" && (
				<div>
					
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
					<label htmlFor="woman" className={styles.radioLabel} style={{ marginLeft: "20px" }}>
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




						
						
						 {error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>} 
						<button type="submit" className={styles.green_btn}>
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
    </main>
    </div>
		
	);
};

export default UpdateUser;
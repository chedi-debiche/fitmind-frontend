import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import HeaderFront from "../../shared/HeaderFront";
// import FooterFront from "../../shared/FooterFront";

const Login = () => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate=useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials((prevState) => ({
		  ...prevState,
		  [name]: value,
		}));
	  };

	  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://fitmind-backend.onrender.com/api/auth/";
			const { data: res } = await axios.post(url, credentials);
			localStorage.setItem("token", res.token);
			localStorage.setItem("userId", res.userId);
			sessionStorage.setItem("isAuthenticated", true);
	
			switch (res.userType) {
				case "User":
					navigate("/signedinUser");
					break;
				case "Coach":
					navigate("/signedin");
					break;	
				case "GymManager":
					navigate("/signedinUser");
					break;
				case "Admin":
					navigate("/user");
					break;
			}
	
			console.log(res.token);
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


<div className={styles.login_container}>
{/* <HeaderFront/> */}

			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={credentials.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={credentials.password}
							required
							className={styles.input}
						/>
						<Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className={styles.error_msg}>{error}</div>}

						{/* <Link to="/signedin"> */}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
						{/* </Link> */}
						
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
<br/>

		</div>

	);
};

export default Login;
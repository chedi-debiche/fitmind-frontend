// requireAuth.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const requireAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthenticated(true);
      } else {
        navigate("/signin");
      }
    }, [navigate]);

    return authenticated ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default requireAuth;

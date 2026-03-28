import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  console.log("Line added to push to the github for the demo...!");
  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );

        alert("Login successful");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate(-1);
      } else {
        await axios.post(
          "http://localhost:5000/api/auth/signup",
          { email, password }
        );

        alert("Signup successful");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

       
        <div className="login-left">
          <img
            src="https://th.bing.com/th/id/OIP.zQLlscpt3uD_DdZd2ZCLTQHaFN?w=222&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt="student-login"
          />
        </div>

        
        <div className="login-right">

          <h2>{isLogin ? "Login" : "Signup"}</h2>

          <p>
            {isLogin
              ? "Hey enter your details to sign in to your account"
              : "Create your account to get started"}
          </p>

          
          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your Username/Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          
          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isLogin && (
            <p className="trouble">Having Trouble in sign in?</p>
          )}

          <button className="login-in-btn" onClick={handleSubmit}>
            {isLogin ? "Login In" : "Sign Up"}
          </button>

          {isLogin && (
            <div className="social-login">
              <p>Or Sign in with</p>
              <div className="social-buttons">
                <button>Google</button>
                <button>Facebook</button>
              </div>
            </div>
          )}

          <p className="toggle-text">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Signup Now" : " Login Now"}
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;

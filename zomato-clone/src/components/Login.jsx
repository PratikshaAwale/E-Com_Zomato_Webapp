import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    if (!Array.isArray(users)) {
      alert("No users found. Please Sign Up first.");
      return;
    }

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
    } else {
      alert("Incorrect email or password. Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>
        <p>
          New to Zomato? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

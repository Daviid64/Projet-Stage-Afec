import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api.js";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.post("/auth/login", {email,password,});

    if (response.data.success) {
      const token = response.data.token;
      localStorage.setItem("token", token);

      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      // Récupérer les infos utilisateur
      const userResponse = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (userResponse.data.success) {
        localStorage.setItem("user", JSON.stringify(userResponse.data.user));
      }

      navigate("/", {replace: true});
      
    } else {
      setMessage("Erreur:" + (response.data.message || "Échec de connexion"));
    }
  } catch (err) {
    console.error("Erreur login:", err);
    setMessage(err.response?.data?.message || "Erreur de connexion au serveur" );
  }
};

return (
  <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Connexion</h2>

      <input
      type="email"
      placeholder="Adresse e-mail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="login-input"
      required
      />

      <input
      type="password"
      placeholder="Mot de passe"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="login-input"
      required
      />

    <button type="submit" className="login-button">
      Se connecter
    </button>

    {message && <p className="login-message">{message}</p>}

    <p className="forgotPassword">
      <Link to="/forgotPassword">Mot de passe oublié ?</Link>
    </p>

    </form>
  </div>
  );
}

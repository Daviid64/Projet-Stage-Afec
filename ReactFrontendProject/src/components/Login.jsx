import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // On vérifie si l'utilisateur à un role
  const hasRole = (roles, allowedRoles) => {
    if (!roles) return false;
    const roleArray = Array.isArray(roles)
    ? roles
    : roles.split(",").map((r) => r.trim()); //pour supprimer les espaces 
    return roleArray.some((role) => allowedRoles.includes(role));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
    });

    if (response.data.success) {
      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // console.log("Utilisateur connecté:", user);
      // console.log("Rôles de l'utilisateur :", user.roles);

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
      <a href="/forgotPassword">Mot de passe oublié ?</a>
    </p>

    </form>
  </div>
  );
}

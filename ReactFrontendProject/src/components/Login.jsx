import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Vérifie si le rôle contient super_admin
  const isSuperAdmin = (roles) => {
    if (!roles) return false;
    if (Array.isArray(roles)) return roles.includes("super_admin");
    if (typeof roles === "string") return roles.split(",").includes("super_admin");
    return false;
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

        // Stocker les infos
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Utilisateur connecté :", user);

        // Redirection selon le rôle
        if (isSuperAdmin(user.roles)) {
          console.log("Redirection vers /admin");
          navigate("/admin", { replace: true });
        } else {
          console.log("Redirection vers /");
          navigate("/", { replace: true });
        }
      } else {
        setMessage("Erreur : " + (response.data.message || "Échec de connexion"));
      }
    } catch (err) {
      console.error("Erreur login:", err);
      setMessage(err.response?.data?.message || "Erreur de connexion au serveur");
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

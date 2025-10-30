import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Stocker le token pour les futures requêtes
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setMessage("Connexion réussie !");
        console.log("Utilisateur connecté :", response.data.user);

        // Redirection selon le rôle
        const role = response.data.user.roles?.[0];
        if (role === "super_admin") window.location.href = "/admin";
        else window.location.href = "/dashboard";
      } else {
        setMessage("❌ " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Email ou mot de passe invalide");
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
      </form>
    </div>
  );
}

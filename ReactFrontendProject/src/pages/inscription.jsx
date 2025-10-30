import { useState } from "react";
import "./Login.css"; // On utilise ton style existant

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    agency: "",
    email: "",
    password: "",
  });

  const agences = [
    "Afec Bayonne",
    "Afec Pau",
    "Afec Dax",
    "Afec Angoulème",
    "Afec La Rochelle",
    "Afec Agen",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Ici tu peux appeler ton API backend pour créer le compte
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        <input
          className="login-input"
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          className="login-input"
          type="text"
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <select
          className="login-input"
          name="agency"
          value={formData.agency}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Choisir une agence
          </option>
          {agences.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="login-button" type="submit">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

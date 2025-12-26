import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import RGPDCookieBanner from "../components/RGPDCookieBanner.jsx";
import API from "../api.js";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification du token + récupération user réelle (backend)
  useEffect(() => {
  const fetchMe = async () => {
    try {
      const res = await API.get("/auth/me");
      if (res.success) {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
      }
    } catch {
      localStorage.clear();
      setUser(null);
    }
  };

  fetchMe();
}, []);


  // 🚪 Déconnexion
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.warn("Erreur logout (non bloquante)");
    } finally {
      localStorage.clear();
      setUser(null);
      navigate("/login");
    }
  };

  // ⏳ Optionnel : éviter un clignotement UI
  if (loading) {
    return <p style={{ textAlign: "center" }}>Chargement...</p>;
  }

  return (
    <div className="page-container">
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />

        <nav className="header-nav">
          <Link to="/exploration" className="nav-link">
            Exploration des Métiers
          </Link>

          {user ? (
            <>
              <span className="nav-user">
                Bonjour {user.first_name}
              </span>

              <button onClick={handleLogout} className="btn-logout">
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Connexion
            </Link>
          )}
        </nav>
      </header>

      <main className="main-content">
        <h2>Découvrez les métiers du numérique avec l’AFEC</h2>

        <p>
          Le numérique est partout : dans nos entreprises, nos vies et nos métiers.
          Avec l’AFEC, explorez un univers de carrières passionnantes : développement web,
          cybersécurité, data, design web…
        </p>

        <div className="button-container">
          <Link to="/exploration" className="btn btn-blue">
            Exploration Métiers
          </Link>
        </div>

        {/* 🔒 Exemple accès admin sécurisé */}
        {user?.roles?.includes("super_admin") && (
          <div style={{ marginTop: "20px" }}>
            <Link to="/admin" className="btn btn-red">
              Accès Admin
            </Link>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link> |{" "}
          <Link to="/privacy-policy">Politique de confidentialité</Link>
        </p>
      </footer>

      <RGPDCookieBanner />
    </div>
  );
}

export default Home;

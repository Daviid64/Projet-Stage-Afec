import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import RGPDCookieBanner from "../components/RGPDCookieBanner.jsx";
import API from "../api.js";

function Acceuil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Pas de token : on nettoie et redirige vers login
        localStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        // Appel pour valider le token et récupérer les infos utilisateur
        const response = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data?.success && response.data.user) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          // Token invalide côté serveur
          throw new Error("Token invalide côté serveur");
        }
      } catch (err) {
        console.error("Token invalide ou expiré:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await API.post("/auth/logout", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      alert("Impossible de se déconnecter correctement.");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="page-container">
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/exploration" className="nav-link">Exploration des Métiers</Link>
          {user && (
            <button onClick={handleLogout} className="btn-logout">
              Déconnexion
            </button>
          )}
        </nav>
      </header>

      <main className="main-content">
        <h2>Découvrez les métiers du numérique avec l’AFEC</h2>
        <p>
          Le numérique est partout : dans nos entreprises, nos vies et nos métiers. 
          Mais savez-vous vraiment quelles opportunités il offre ? Avec l’AFEC, explorez 
          un univers de carrières passionnantes et accessibles à tous : développement web, 
          cybersécurité, data, et design web ! À travers nos programmes de découverte, 
          nos témoignages de professionnels et nos formations certifiantes, nous vous 
          aidons à mieux comprendre les métiers du digital et à trouver celui qui vous correspond.
        </p>
        <div className="button-container">
          <Link to="/exploration" className="btn btn-blue">Exploration Métiers</Link>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés | </p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link> |{" "}
          <Link to="/privacy-policy">Politique de confidentialité</Link> |{" "}
        </p>
      </footer>

      <RGPDCookieBanner />
    </div>
  );
}

export default Acceuil;

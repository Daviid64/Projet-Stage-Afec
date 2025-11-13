import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function AdministrateurReseau() {
  return (
    <div className="page-container">
      {/* HEADER */}
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/Home" className="nav-link">Accueil</Link>
          <Link to="/exploration" className="nav-link">Exploration des Métiers</Link>
        </nav>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="reseau-main">
        <h1>ADMINISTRATEUR RÉSEAU (ADMINISTRATEUR SYSTÈMES ET RÉSEAUX)</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            L'<strong>Administrateur systèmes et réseaux</strong> garantit la disponibilité et la performance de l’infrastructure informatique d’une entreprise. 
            Il installe, sécurise et maintient le matériel et le réseau, tout en assurant le support technique aux utilisateurs en cas de panne ou de dysfonctionnement.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <ul>
            <li>Maintenir le système et le réseau informatique en bon état</li>
            <li>Installer, paramétrer et sécuriser les équipements</li>
            <li>Assurer le support technique aux utilisateurs</li>
            <li>Participer à l’évolution de l’infrastructure en proposant de nouvelles solutions</li>
            <li>Veiller à la protection des données personnelles</li>
          </ul>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li><strong>Techniques :</strong> maîtrise des systèmes d’exploitation (Windows, Linux), réseaux, solutions de stockage et virtualisation</li>
            <li><strong>Soft skills :</strong> organisation, travail en équipe et pédagogie pour sensibiliser les collaborateurs aux bonnes pratiques</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Formations techniques spécialisées en systèmes et réseaux.  
            Salaire junior : environ <strong>31 000 € brut/an</strong>.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Évolution possible vers Administrateur de bases de données, Architecte Cloud ou Directeur des Systèmes d’Information (DSI).
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Installer et paramétrer le matériel et les logiciels sur le réseau</li>
            <li>Maintenir et assurer le bon fonctionnement du système et du réseau</li>
            <li>Assurer la sécurité de l’infrastructure informatique</li>
            <li>Fournir un support technique aux collaborateurs</li>
            <li>Proposer de nouvelles solutions pour faire évoluer l’infrastructure</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Systèmes d’exploitation (Windows, Linux)</li>
            <li>Réseaux informatiques et protocoles</li>
            <li>Solutions de stockage et virtualisation</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Outre la résolution de pannes, l’Administrateur forme et sensibilise les collègues aux bonnes pratiques, 
            comme l’utilisation sécurisée des mots de passe et des équipements, pour optimiser les processus internes.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Administrateur Réseau, Infrastructure IT, Support Utilisateur, Systèmes d’Information, Maintenance Informatique
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link> |{" "}
          <Link to="/privacy-policy">Politique de confidentialité</Link> |{" "}
          <Link to="/cookies">Gestion des cookies</Link>
        </p>
      </footer>
    </div>
  );
}

export default AdministrateurReseau;

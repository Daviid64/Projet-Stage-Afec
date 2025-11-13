import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function FullstackDescription() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/Home" className="nav-link">Accueil</Link>
          <Link to="/exploration" className="nav-link">Exploration des Métiers</Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="fullstack-main">
        <h1>DÉVELOPPEUR FULL STACK</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            Le Développeur full stack maîtrise à la fois le front-end et le back-end,
            capable de gérer toutes les couches d’une application web. Il est polyvalent
            et joue un rôle clé dans la création d’expériences numériques complètes.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <p>
            Il conçoit, développe et maintient l’application dans sa globalité, 
            du serveur jusqu’à l’interface utilisateur. Il peut intervenir sur 
            l’architecture logicielle, le code source, les bases de données 
            ainsi que sur l’optimisation des performances. Sa vision globale du 
            projet lui permet de collaborer efficacement avec les équipes 
            de design, de développement et de gestion de projet.
          </p>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li>Maîtrise du HTML, CSS et JavaScript</li>
            <li>Langages back-end : Python, PHP, Ruby…</li>
            <li>Gestion de bases de données et d’API</li>
            <li>Rigueur, polyvalence et autonomie</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Formation universitaire en informatique ou bootcamps spécialisés. 
            Une expérience pratique significative dans le développement web 
            est très appréciée pour ce type de profil.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Chef de projet technique, Lead développeur, Architecte logiciel. 
            Le développeur full stack peut également se spécialiser dans une 
            technologie précise ou évoluer vers des postes à responsabilité.
          </p>
        </section>

        <section>
          <h2>Liste de tâches ou responsabilités typiques</h2>
          <ul>
            <li>Développer des applications web complètes (front et back)</li>
            <li>Maintenir et optimiser le code existant</li>
            <li>Gérer les bases de données et les serveurs</li>
            <li>Assurer la sécurité et la performance des applications</li>
            <li>Collaborer avec designers et autres développeurs</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Front-end : HTML, CSS, JavaScript, React, Angular</li>
            <li>Back-end : Node.js, Python, PHP, Ruby</li>
            <li>Bases de données : MySQL, MongoDB</li>
            <li>Outils de versioning : Git, GitHub, GitLab</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Le développeur full stack est souvent surnommé le « couteau suisse » du web,
            car il peut intervenir sur tous les aspects d’un projet, de la conception 
            à la mise en production. Sa polyvalence en fait un atout précieux 
            dans les petites structures et startups.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Développement Full Stack, Front-end, Back-end, Base de données, Application Web
          </p>
        </section>
      </main>

      {/* Footer */}
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

export default FullstackDescription;

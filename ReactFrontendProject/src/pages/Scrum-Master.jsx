import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function ScrumMasterDescription() {
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
      <main className="scrum-main">
        <h1>SCRUM MASTER</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            Le Scrum Master facilite la mise en œuvre de la méthode Agile Scrum au sein d’une équipe
            pour optimiser la collaboration et la livraison des projets.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <p>
            Le Scrum Master accompagne l’équipe dans l’application de la méthodologie Scrum.
            Il retire les obstacles qui pourraient ralentir la progression du projet et veille
            au respect des processus Agiles pour garantir une livraison fluide et efficace.
          </p>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li>Connaissance approfondie des principes Scrum et Agile</li>
            <li>Excellente organisation et leadership naturel</li>
            <li>Communication claire et écoute active</li>
            <li>Capacité à résoudre les conflits et motiver les équipes</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Certifications reconnues : <strong>PSM (Professional Scrum Master)</strong> ou <strong>CSM (Certified Scrum Master)</strong>.<br />
            Niveau recommandé : Bac+3 à Bac+5 en gestion de projet, informatique ou management d’équipe.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Le Scrum Master peut évoluer vers un poste de <strong>Coach Agile</strong>,
            <strong>Responsable de projet</strong> ou <strong>Product Owner senior</strong>.
          </p>
        </section>

        <section>
          <h2>Liste de tâches ou responsabilités typiques</h2>
          <ul>
            <li>Animer les cérémonies Scrum (daily meetings, sprint planning, rétrospectives)</li>
            <li>Identifier et lever les obstacles pour l’équipe</li>
            <li>Former et accompagner l’équipe à Scrum et Agile</li>
            <li>Suivre les indicateurs de performance et d’avancement</li>
            <li>Faciliter la communication entre l’équipe et les parties prenantes</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Jira, Trello, ClickUp</li>
            <li>Confluence</li>
            <li>Outils de collaboration : Slack, Microsoft Teams</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Un Scrum Master peut parfois transformer la dynamique d’une équipe réticente à adopter
            la méthode Agile, et en quelques semaines, améliorer considérablement la communication
            et la productivité du groupe.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Scrum Master, Méthode Agile, Gestion de projet, Sprint, Coaching, Productivité
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link> |{" "}
          <Link to="/privacy-policy">Politique de confidentialité</Link> |{" "}
        </p>
      </footer>
    </div>
  );
}

export default ScrumMasterDescription;

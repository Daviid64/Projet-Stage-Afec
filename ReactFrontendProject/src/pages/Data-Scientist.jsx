import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function DataScientist() {
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
      <main className="data-main">
        <h1>DATA SCIENTIST</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            Le <strong>Data Scientist</strong> exploite les données massives afin d’en tirer une valeur stratégique.  
            Grâce à des techniques d’analyse statistique et de <em>machine learning</em>, 
            il construit des modèles prédictifs pour aider à la prise de décision, améliorer les produits 
            et stimuler la croissance d’une entreprise.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <ul>
            <li>Extraire, traiter et interpréter de grandes quantités de données</li>
            <li>Créer des modèles prédictifs via le <strong>machine learning</strong></li>
            <li>Identifier les <strong>KPI</strong> pertinents pour mesurer la performance</li>
            <li>Transformer les données en informations exploitables pour les décideurs</li>
          </ul>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li><strong>Techniques :</strong> programmation (Python, R), statistiques, machine learning, analyse de données</li>
            <li><strong>Soft skills :</strong> curiosité, rigueur, veille technologique, capacité d’analyse et de synthèse</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Le Data Scientist suit souvent une formation de haut niveau en <strong>mathématiques</strong>, 
            <strong>statistiques</strong>, <strong>informatique</strong> ou <strong>ingénierie</strong>.  
            Une maîtrise du machine learning et des statistiques avancées est indispensable.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Il peut évoluer vers des postes à responsabilité comme <strong>Architecte Data</strong>, 
            <strong>Responsable de l’infrastructure de données</strong> ou encore vers la 
            <strong>Direction de projets IA / R&D</strong>.
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Extraire et interpréter des données massives</li>
            <li>Appliquer des analyses statistiques avancées</li>
            <li>Construire et entraîner des modèles prédictifs</li>
            <li>Identifier les indicateurs de performance (KPI)</li>
            <li>Intégrer les modèles IA dans des applications concrètes</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Langages : Python, R</li>
            <li>Algorithmes de machine learning</li>
            <li>Outils Big Data et bases de données</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            (Informations non disponibles)
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Data Scientist, Modélisation Prédictive, Machine Learning, Algorithmes, Analyse Big Data, Intelligence Artificielle
          </p>
        </section>

        <section>
          <h2>Liens ressources fiables</h2>
          <p>(Informations non disponibles)</p>
        </section>
      </main>

      {/* FOOTER */}
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

export default DataScientist;

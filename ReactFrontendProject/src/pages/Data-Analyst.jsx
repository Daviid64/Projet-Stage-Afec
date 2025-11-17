import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function DataAnalyst() {
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
      <main className="data-analyst-main">
        <h1>DATA ANALYST</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            Le <strong>Data Analyst</strong> explore et décrypte les données de l’entreprise 
            (marketing, production, relation client) pour fournir des insights précis 
            et orienter la prise de décision stratégique.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <ul>
            <li>Collecter et analyser les données issues de différentes sources</li>
            <li>Créer des tableaux de bord et visualisations pour les équipes décisionnelles</li>
            <li>Identifier les tendances et opportunités pour l’entreprise</li>
            <li>Collaborer avec les équipes métiers pour définir les besoins d’analyse</li>
          </ul>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li><strong>Techniques :</strong> SQL, outils d’analyse et de visualisation (Google Analytics, Looker Studio, BigQuery)</li>
            <li><strong>Soft skills :</strong> curiosité, esprit de synthèse, organisation, pédagogie, travail en équipe</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Les parcours sont variés : écoles de commerce, informatique, ou reconversion professionnelle.  
            L’autoformation et la pratique sur des projets réels sont un atout majeur.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Le Data Analyst peut évoluer vers des postes de <strong>Data Scientist</strong>, 
            <strong>Product Owner</strong> ou <strong>Consultant externe</strong>.
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Définir le besoin d’analyse avec les équipes métiers</li>
            <li>Configurer le tracking et collecter les données</li>
            <li>Utiliser SQL pour extraire les informations pertinentes</li>
            <li>Analyser les données afin d’identifier des tendances</li>
            <li>Créer des visualisations et tableaux de bord interactifs</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Google Analytics, Google Tag Manager</li>
            <li>SQL</li>
            <li>Big Data : GCP, BigQuery</li>
            <li>Looker Studio</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Charline Bonnet, Web Analyst, décrit son travail comme celui d’un « cartographe » : 
            vérifier le tracking, interroger la base de données et analyser les résultats pour 
            répondre aux besoins des Product Owners.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Data Analyst, Web Analyse, Tableaux de Bord, Requêtage SQL, Comportement Utilisateur, Analyse de Données
          </p>
        </section>

        <section>
          <h2>Liens ressources fiables</h2>
          <p>
            <a href="https://ecole-du-digital.com/ecole-data-analyse-toulouse/" target="_blank" rel="noopener noreferrer">
              école-data-analyse-toulouse
            </a>
          </p>
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

export default DataAnalyst;

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function DeveloppeurIA() {
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
      <main className="ia-main">
        <h1>DÉVELOPPEUR IA (INGÉNIEUR IA)</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            L'Ingénieur IA conçoit, développe et déploie des solutions basées sur l’Intelligence Artificielle. 
            Il transforme les données en insights stratégiques via des algorithmes d’apprentissage automatique pour automatiser et prédire des tâches.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <ul>
            <li>Collecter et préparer les données</li>
            <li>Développer, entraîner et optimiser des modèles d’apprentissage automatique</li>
            <li>Intégrer les solutions IA dans des applications concrètes</li>
            <li>Concevoir des algorithmes pour prédire des tendances ou automatiser des processus</li>
            <li>Veiller à la performance et à l’innovation des solutions IA</li>
          </ul>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li><strong>Techniques :</strong> Python, R, statistiques avancées, machine learning, gestion de projet</li>
            <li><strong>Soft skills :</strong> curiosité, capacité d’analyse, veille technologique, créativité</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Bac+5 ou plus en sciences, ingénierie, Data Science ou Intelligence Artificielle.  
            Salaire junior : ~45 000 €.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Évoluer vers Responsable R&D, Directeur Innovation ou Expert en IA générative.
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Collecter, préparer et nettoyer les données</li>
            <li>Développer des algorithmes de Machine Learning</li>
            <li>Entraîner et optimiser les modèles prédictifs</li>
            <li>Intégrer les solutions IA dans des applications métier</li>
            <li>Réaliser une veille technologique sur les avancées IA</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Langages : Python, R</li>
            <li>Algorithmes de machine learning</li>
            <li>Outils d’IA générative (ChatGPT, Midjourney)</li>
            <li>API d’IA pour cadrage et optimisation des réponses</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            L’émergence de rôles comme Prompt Engineer montre l’importance de l’IA générative et la nécessité pour l’Ingénieur IA de l’intégrer dans les processus industriels.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Ingénieur IA, Intelligence Artificielle, Développement Machine Learning, Modèles Algorithmiques, Automatisation
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

export default DeveloppeurIA;

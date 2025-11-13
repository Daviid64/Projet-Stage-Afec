import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function IntegrateurWebDescription() {
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
      <main className="integrateur-main">
        <h1>INTÉGRATEUR WEB</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            L'Intégrateur web est responsable de la structure et de la mise en forme
            du design visuel sur le web. Il prend les maquettes graphiques des designers
            et les traduit en code (HTML, CSS, JavaScript). Son objectif est de garantir
            une navigation fluide, ergonomique et compatible avec tous les terminaux
            (mobile, tablette, PC).
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <p>
            L’Intégrateur web intervient dans la création ou la refonte de sites (vitrines, e-commerce)
            ou d’applications mobiles. Il s’appuie sur les maquettes graphiques des designers
            pour transposer le contenu en code informatique. Ses principales missions incluent :
          </p>
          <ul>
            <li>Définir la structure du site en HTML</li>
            <li>Assurer la mise en page visuelle et l'apparence via le CSS (couleurs, polices, mise en forme)</li>
            <li>Ajouter des composants interactifs avec JavaScript</li>
            <li>Garantir le respect des standards du web et de l’accessibilité</li>
            <li>Veiller à l’ergonomie et à la compatibilité multi-terminaux</li>
          </ul>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li>Techniques : HTML, CSS, JavaScript, accessibilité et responsive design</li>
            <li>Soft skills : rigueur, précision, sens du détail</li>
            <li>Collaboration avec designers et développeurs front-end</li>
            <li>Bonne communication et compréhension des contraintes techniques</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Formations spécialisées en développement web ou intégration. 
            La maîtrise des langages HTML/CSS est essentielle. 
            Un profil junior peut débuter autour de 30 000 € brut/an.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Évolution vers un poste de Développeur front-end, ou spécialisation
            dans l’accessibilité web, l’UX ou l’optimisation des performances.
          </p>
        </section>

        <section>
          <h2>Liste de tâches ou responsabilités typiques</h2>
          <ul>
            <li>Transformer les maquettes graphiques en code fonctionnel</li>
            <li>Créer la structure sémantique des pages (HTML)</li>
            <li>Définir le style et la mise en page (CSS)</li>
            <li>Intégrer des éléments interactifs (JavaScript)</li>
            <li>Assurer la compatibilité sur tous les navigateurs et appareils</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Langages : HTML, CSS, JavaScript</li>
            <li>Logiciels de maquettage : Figma, Adobe XD</li>
            <li>Éditeurs de code : Visual Studio Code, Sublime Text</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Lors de la mise en œuvre du tracking, l'Intégrateur web collabore avec
            le Web Analyst ou le Développeur front-end pour s’assurer que les événements
            nécessaires à la collecte de données sont correctement implémentés.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Intégrateur Web, HTML CSS, Mise en Page Web, Responsive Design, Accessibilité Web
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

export default IntegrateurWebDescription;

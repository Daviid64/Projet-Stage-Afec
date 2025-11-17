import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function UXUIDesignerDescription() {
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
      <main className="uxui-main">
        <h1>UX/UI DESIGNER</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            L'UX/UI Designer combine deux expertises pour créer des produits numériques réussis :
            <br />
            <strong>UX (User eXperience)</strong> : optimiser l’expérience utilisateur pour la rendre intuitive et fluide.<br />
            <strong>UI (User Interface)</strong> : s’assurer que l’interface est esthétique, fonctionnelle et attrayante.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <p>
            L’<strong>UX Designer</strong> analyse les besoins des utilisateurs afin de concevoir des parcours optimaux et agréables.
            L’<strong>UI Designer</strong>, de son côté, crée les maquettes graphiques et les éléments interactifs
            en respectant l’identité visuelle de la marque.
            Ensemble, ils garantissent une expérience cohérente, accessible et respectueuse de l’écoconception web.
          </p>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li>Créativité et curiosité pour suivre les tendances du design</li>
            <li>Maîtrise des outils de maquettage et de prototypage (ex. Figma)</li>
            <li>Connaissance des référentiels <strong>RGAA</strong> et <strong>RGESN</strong></li>
            <li>Bonne communication et travail collaboratif</li>
            <li>Capacité à recueillir et synthétiser les besoins utilisateurs</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Diplômes supérieurs d’<strong>arts appliqués</strong> (Bac+5) avec spécialisation en design numérique,
            UX/UI ou ergonomie web. Les parcours en design graphique peuvent aussi déboucher sur ce métier.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Le poste d’UX/UI Designer ouvre vers des rôles de <strong>Lead Designer</strong>,
            <strong>Product Designer</strong> ou <strong>UX Researcher</strong>.
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Analyser les besoins des utilisateurs (UX)</li>
            <li>Créer maquettes graphiques et prototypes (UI)</li>
            <li>Garantir esthétique et fonctionnalité du design</li>
            <li>Assurer la cohérence avec l’identité visuelle</li>
            <li>Collaborer avec développeurs et équipes métiers</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Figma</li>
            <li>Référentiels RGAA et RGESN</li>
            <li>Outils collaboratifs de design et de test utilisateur</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Amélie Poirier, Lead Designer UX/UI, a partagé lors d’un live Figma sa méthodologie
            d’écoconception basée sur le <strong>RGESN</strong>, démontrant l’importance croissante
            de la durabilité dans la conception numérique.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            UX/UI Design, Expérience Utilisateur, Interface Conviviale, Figma, Accessibilité Web,
            Écoconception, Ergonomie Digitale
          </p>
        </section>

        <section>
          <h2>Liens ressources fiables</h2>
          <ul>
            <li><a href="https://www.flupa.eu/" target="_blank" rel="noopener noreferrer">Flupa (UX Days)</a></li>
            <li><a href="https://www.paris-web.fr/" target="_blank" rel="noopener noreferrer">Paris Web</a></li>
            <li><a href="https://www.opquast.com/" target="_blank" rel="noopener noreferrer">Opquast</a></li>
          </ul>
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

export default UXUIDesignerDescription;

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function GraphisteMotionDesigner() {
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

      {/* Contenu principal */}
      <main className="motion-main">
        <h1>GRAPHISTE / MOTION DESIGNER</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            Le <strong>Graphiste Motion Designer</strong> crée des éléments graphiques animés en 2D ou 3D — effets spéciaux, typographies, transitions —
            pour donner vie aux messages d’une marque via des vidéos, bannières ou infographies interactives.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <p>
            Il conçoit et réalise tout type d’animations graphiques : vidéos promotionnelles, infographies animées,
            effets visuels, transitions dynamiques ou encore intégrations audio/vidéo.
            À partir d’un brief client, il traduit un message en une animation visuelle percutante.
          </p>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li>Compétences techniques : graphisme, animation 2D/3D, montage vidéo</li>
            <li>Maîtrise de la suite Adobe : Photoshop, Illustrator, InDesign, After Effects</li>
            <li>Créativité, sens du détail et écoute des tendances graphiques</li>
            <li>Bonne compréhension du message et du public cible</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Formations en <strong>design graphique</strong>, <strong>audiovisuel</strong> ou <strong>animation</strong>.
            Un profil junior démarre autour de <strong>28 000 € brut/an</strong>, avec des perspectives de progression rapide selon la spécialisation.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Le Graphiste Motion Designer peut se spécialiser dans l’<strong>animation 3D</strong>,
            les <strong>effets spéciaux</strong> ou évoluer vers un poste de <strong>Directeur Artistique (DA)</strong>.
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Créer des animations 2D et 3D</li>
            <li>Ajouter des effets spéciaux, typographies et sons</li>
            <li>Concevoir des vidéos promotionnelles et infographies animées</li>
            <li>Réaliser les projets selon un brief client</li>
            <li>Assurer une veille constante sur les tendances graphiques et audiovisuelles</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Suite Adobe : Photoshop, InDesign, Illustrator, After Effects</li>
            <li>Logiciels d’animation 2D/3D et de montage vidéo (Premiere Pro, Blender)</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Le Motion Design est aujourd’hui incontournable dans le marketing digital :
            les publicités animées sur les réseaux sociaux sont souvent conçues par des Graphistes Motion Designers.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Motion Design, Animation 2D 3D, Création Graphique, Vidéo Marketing, After Effects,
            Suite Adobe, Design Numérique, Graphisme Animé
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

export default GraphisteMotionDesigner;

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function ProductOwner() {
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
      <main className="po-main">
        <h1>PRODUCT OWNER</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            Le <strong>Product Owner (PO)</strong> est le garant de la vision et de la qualité d’un produit numérique 
            (application, site ou logiciel). Il définit les fonctionnalités, priorise les tâches du backlog 
            et veille à ce que le produit réponde parfaitement aux besoins des utilisateurs.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <p>
            Le PO incarne la vision du produit et veille à sa qualité, tout en respectant les délais et les budgets impartis.  
            Il applique les méthodes <strong>Agiles</strong> (notamment <strong>Scrum</strong>) pour :
          </p>
          <ul>
            <li>Définir les fonctionnalités et recueillir les besoins des clients et des équipes métiers (discovery)</li>
            <li>Prioriser le backlog produit</li>
            <li>Coordonner les équipes de développement, de design et de marketing</li>
            <li>Superviser les sprints et assurer l’amélioration continue du produit</li>
          </ul>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li><strong>Techniques :</strong> compréhension des enjeux business, marketing et techniques</li>
            <li><strong>Soft skills :</strong> leadership, communication, curiosité, empathie et persévérance</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Les parcours sont variés : Bac+3/4 en digital, informatique ou marketing.  
            Des formations complémentaires comme un <strong>MBA Digital Marketing & Business</strong> ou 
            des certifications professionnelles (ex : <strong>PrestaShop</strong>, <strong>Scrum</strong>) sont fortement valorisées.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Le Product Owner peut évoluer vers des postes à plus grande responsabilité tels que 
            <strong> Product Manager</strong> ou <strong>Chief Product Officer (CPO)</strong>.
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Définir les fonctionnalités et la vision du produit</li>
            <li>Gérer et prioriser le backlog</li>
            <li>Coordonner les équipes de développement, design et marketing</li>
            <li>Recueillir les besoins utilisateurs et des parties prenantes</li>
            <li>Superviser le développement itératif jusqu’à la livraison</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Méthodes Agiles et Scrum</li>
            <li>Outils de conception partagée : Figma</li>
            <li>Outils de gestion de projet : Jira, Trello</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            <em>Clément Del Aguila</em>, PO chez <strong>Lalalab</strong>, a dirigé une équipe de 5 développeurs 
            malgré un parcours initial en lettres modernes.  
            Il témoigne : <em>« On a réellement les capacités de le faire, il faut juste se donner les moyens. »</em>
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Product Owner, Gestion de Produit, Méthode SCRUM, Product Management, Vision Produit, Backlog, Agile, CPO
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

export default ProductOwner;

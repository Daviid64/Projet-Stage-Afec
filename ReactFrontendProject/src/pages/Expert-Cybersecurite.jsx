import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function ExpertCybersecurite() {
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
      <main className="cyber-main">
        <h1>EXPERT CYBERSÉCURITÉ (CONSULTANT EN CYBERSÉCURITÉ)</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            L’<strong>Expert en cybersécurité</strong> protège les systèmes d’information et les réseaux contre les menaces numériques. 
            Il audite, identifie les vulnérabilités et recommande des solutions techniques pour sécuriser les données sensibles d’une entreprise.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <ul>
            <li>Évaluer l’infrastructure et analyser les vulnérabilités</li>
            <li>Recommander et mettre en place des solutions de sécurité</li>
            <li>Surveiller les systèmes pour prévenir et détecter les incidents</li>
            <li>Conseiller lors de crises et former les collaborateurs</li>
            <li>Rôles connexes : Pentester, Analyste SOC</li>
          </ul>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li><strong>Techniques :</strong> sécurité des systèmes, réseaux, protocoles, chiffrement</li>
            <li><strong>Soft skills :</strong> organisation, travail d’équipe, pédagogie, communication</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Formations spécialisées en cybersécurité (niveau Bac+5).  
            Un salaire junior débute autour de <strong>42 000 € brut/an</strong>.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Évolution possible vers les postes de <strong>RSSI</strong> (Responsable de la Sécurité des Systèmes d’Information), 
            <strong>Cryptologue</strong> ou <strong>Directeur des Systèmes d’Information (DSI)</strong>.
          </p>
        </section>

        <section>
          <h2>5 tâches ou responsabilités typiques</h2>
          <ul>
            <li>Évaluer l’infrastructure et analyser les vulnérabilités</li>
            <li>Recommander des solutions de sécurisation adaptées</li>
            <li>Surveiller les systèmes pour détecter les menaces</li>
            <li>Conseiller sur la gestion des crises de sécurité</li>
            <li>Sensibiliser et former les collaborateurs à la cybersécurité</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Outils d’audit de sécurité (Nessus, OpenVAS, Metasploit...)</li>
            <li>Outils d’analyse de données de sécurité (SIEM, Splunk, ELK Stack)</li>
            <li>Protocoles et algorithmes de chiffrement (SSL/TLS, AES, RSA...)</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Lors d’un <strong>Pentest</strong>, l’expert en cybersécurité utilise les mêmes techniques que les hackers 
            (tests d’intrusion, exploitation de failles, social engineering) afin d’identifier et de corriger les failles de sécurité d’une organisation.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Cybersécurité, Consultant Sécurité, Protection SI, Pentesting, Menaces Informatiques, Audit de Sécurité
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés |{" "}</p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link> |{" "}
          <Link to="/privacy-policy">Politique de confidentialité</Link> |{" "}
        </p>
      </footer>
    </div>
  );
}

export default ExpertCybersecurite;

import React from "react";
import "./LegalPages.css";
import logoAfec from "../assets/logoAfec.png";
import { Link } from "react-router-dom";


const PolitiqueConfidentialite = () => {
  return (
    <div className="page-container-rgpd">

    <header className="header-blue">
            <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
            <nav className="header-nav">
              <Link to="/Home" className="nav-link">Accueil</Link>
              <Link to="/exploration" className="nav-link"> Exploration des Métiers</Link>
            </nav>
          </header>

      <h1>Politique de confidentialité</h1>

      <section>
        <h2>Données collectées</h2>
        <p>
          Les informations recueillies sur nos formulaires sont enregistrées dans un fichier informatisé par nos responsables d’agence pour vous renseigner sur nos formations et prestations. La base légale du traitement est le consentement.

          Les données collectées seront communiquées aux seuls destinataires suivants : le responsable et les conseillers en formation de l’agence que vous contactez.
          Les données sont conservées pendant 1 an.

          Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données. Vous pouvez retirer à tout moment votre consentement au traitement de vos données.

          Consultez le site cnil.fr pour plus d’informations sur vos droits.

          Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter : <a href="mailto:paris@afec.fr">paris@afec.fr</a>
          Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
        </p>
      </section>

     

      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default PolitiqueConfidentialite;

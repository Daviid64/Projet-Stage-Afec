import React from "react";
import { Link } from "react-router-dom";
import AfecImage from "../assets/AfecImage.png";
import "../App.css";

function Acceuil() {
  return (
    <div className="page-container">
     
      <header className="header">
        <img src={AfecImage} alt="AFEC" className="header-image" />
        <div className="header-content">
          <h1>Accueil</h1>
          <nav>
            <Link to="/contact" className="nav-link">Formulaire de Contact</Link>
            <Link to="/exploration" className="nav-link">Exploration des Métiers</Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <h2>Plateforme de Formation en ligne AFEC</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore quod id fuga at nesciunt, rem accusantium veniam obcaecati iste aliquam cupiditate reiciendis. Magnam voluptate, optio est magni ipsa voluptatum? Laudantium.
          Distinctio repudiandae dolorem et eos minus suscipit ipsam reiciendis id minima. Doloribus obcaecati totam, architecto iste officia, dolorum debitis deserunt quos aliquid temporibus voluptatum assumenda libero! Omnis ea officiis odio?
          Id, voluptatum natus sed deserunt repellendus atque. Nobis, quae rem id ab vitae consequuntur fuga animi sit itaque totam error! Cumque obcaecati amet aliquam at quam fugit odio quod nisi.
          Consequuntur, repellendus? Voluptatibus, deserunt nulla! Consectetur doloribus ullam ea reiciendis beatae, placeat sunt doloremque commodi rerum? Consectetur voluptatum laudantium debitis, iste accusamus magni a? Vel, necessitatibus quis. Sed, nulla non.
          Et soluta tempore in unde? Voluptatum ex blanditiis animi a delectus quasi fugit modi numquam repellat sequi, voluptas id asperiores. Id quae recusandae repellat blanditiis? Beatae culpa quaerat blanditiis doloremque.
          Tenetur nam ipsa assumenda voluptatem ipsam atque eligendi inventore nobis molestiae saepe! Quasi maxime in eum repudiandae, rem laudantium quo sed. Quibusdam corporis voluptates quo odio, eligendi possimus repudiandae maiores?
          Ea libero, repellendus veritatis numquam nihil laborum soluta perspiciatis adipisci tempora? Molestias facilis, soluta, facere quidem voluptatem, beatae qui at repudiandae ullam ipsam vel explicabo. Suscipit sequi eos fugit deserunt.
        </p>

        <div className="button-container">
          <Link to="/exploration" className="btn btn-blue">
            Exploration Métiers
          </Link>
          <Link to="/contact" className="btn btn-green">
            Formulaire de Contact
          </Link>
        </div>
      </main>

      
      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default Acceuil;
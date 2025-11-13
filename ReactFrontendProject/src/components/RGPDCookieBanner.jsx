import React, { useState, useEffect } from "react";
import "./RGPDCookieBanner.css"; // Pour le style (voir plus bas)

const RGPDCookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
  });

  // Vérifier si le consentement a déjà été donné
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent){
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPrefs = { analytics: true,};
    savePreferences(newPrefs);
  };

  const handleRejectAll = () => {
    const newPrefs = { analytics: false,};
    savePreferences(newPrefs);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        date: new Date().toISOString(),
        preferences: prefs,
      })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <h3>🍪 Gestion des cookies</h3>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience
          d’administration et respecter le <strong>Règlement Général sur la Protection des Données (RGPD)</strong>.
          Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos choix.
        </p>

        <div className="cookie-options">
          <label>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) =>
                setPreferences({ ...preferences, analytics: e.target.checked })
              }
            />
            Cookies analytiques (mesure d’audience)
          </label>
        </div>

        <div className="cookie-actions">
          <button className="btn-accept" onClick={handleAcceptAll}>
            Tout accepter
          </button>
          <button className="btn-reject" onClick={handleRejectAll}>
            Tout refuser
          </button>
          <button className="btn-save" onClick={handleSavePreferences}>
            Sauvegarder mes choix
          </button>
        </div>

        <p className="cookie-legal">
          Vous pouvez modifier vos choix à tout moment dans la page{" "}
          <a href="/cookies">Gestion des cookies</a>.<br />
          Consultez aussi notre{" "}
          <a href="/privacy-policy">Politique de confidentialité</a>.
        </p>
      </div>
    </div>
  );
};

export default RGPDCookieBanner;

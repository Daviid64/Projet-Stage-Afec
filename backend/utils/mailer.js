import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Validation de la configuration au démarrage
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`❌ Variable d'environnement manquante: ${varName}`);
  }
});

// Configuration du transporteur (compatible avec plusieurs services)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  maxConnections: 1,      // 1 seul connection à la fois
   maxMessages: 5,       // max 5 messages par connexion
  rateDelta: 10000,    // délai de 10 secondes
  rateLimit: 1,     //1 email toutes les 10 secondes
});

// Vérifier la connexion au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erreur de connexion SMTP:', error.message);
  } else {
    console.log('✅ Serveur SMTP prêt');
  }
});

// Validation d'email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation URL souple
const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    // Autoriser localhost en plus des URLs standard
    return parsed.hostname === 'localhost' || parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Template HTML responsive
const getEmailTemplate = (link) => {
  // S'assurer que le lien est propre (pas d'espaces ni retours à la ligne)
  const cleanLink = link.trim();

  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .button { 
        display: inline-block; 
        padding: 12px 24px; 
        background-color: #007bff; 
        color: white !important; 
        text-decoration: none; 
        border-radius: 5px;
        margin: 20px 0;
      }
      .footer { font-size: 12px; color: #666; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Vérification de votre compte</h2>
      <p>Bonjour,</p>
      <p>Merci de vous être inscrit. Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
      <a href="${cleanLink}" target="_blank" rel="noopener noreferrer" class="button">
        Valider mon compte
      </a>
      <p>Ou copiez ce lien dans votre navigateur :</p>
      <p style="word-break: break-all; color: #007bff;">${cleanLink}</p>
      <p class="footer">
        <strong>Ce lien expire dans 24 heures.</strong><br>
        Si vous n'avez pas créé de compte, veuillez ignorer cet email.
      </p>
    </div>
  </body>
  </html>
  `;
};


// Envoie email de vérification
export const sendVerificationEmail = async (to, link) => {
  if (!to || !isValidEmail(to)) {
    throw new Error('Adresse email invalide');
  }

  if (!link || !isValidUrl(link)) {
    console.warn('⚠️ Lien de vérification invalide (non bloquant en dev) :', link);
    // En production, on stoppe si le lien est invalide
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Lien de vérification invalide');
    } else {
      // Fournir un lien de secours en dev pour que mailOptions fonctionne
      link = 'http://localhost:5000';
    }
  }

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'Support'}" <${process.env.SMTP_FROM}>`,
    to,
    subject: 'Vérification de votre compte',
    text: `Bonjour,\n\nVeuillez cliquer sur ce lien pour vérifier votre compte : ${link}\n\nCe lien expire dans 24 heures.\n\nSi vous n'avez pas créé de compte, ignorez ce mail.`,
    html: getEmailTemplate(link),
    headers: {
      'X-Priority': '3',
      'X-Mailer': 'Node.js',
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé à:', to.replace(/(.{3}).*(@.*)/, '$1***$2'));
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error.message);
    throw new Error(`Échec de l'envoi de l'email: ${error.message}`);
  }
};

// Envoie notification admin
export const sendAdminNotification = async (traineeEmail, validationLink) => {
  if (!process.env.ADMIN_EMAIL || !isValidEmail(process.env.ADMIN_EMAIL)) {
    throw new Error('Email administrateur non configuré');
  }

  const mailOptions = {
    from: `"Système" <${process.env.SMTP_FROM}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'Nouveau compte stagiaire à valider',
    html: `
      <h3>Nouveau compte en attente</h3>
      <p>Un nouveau stagiaire s'est inscrit : <strong>${traineeEmail}</strong></p>
      <p><a href="${validationLink}">Accéder au panneau de validation</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Notification admin envoyée');
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur notification admin:', error.message);
    throw error;
  }
};

// Fermeture propre du transporteur
export const closeMailer = () => {
  transporter.close();
  console.log('📧 Connexions SMTP fermées');
};

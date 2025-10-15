import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS  
    }
});

export const sendVerificationEmail = async (to, link) => {
    const mailOptions = {
        from: '"Support" <no-reply@example.com> ',
        to,
        subject: `Vérification de votre compte`,
        html: `Bonjour,<br>Veuillez cliquer sur ce lien pour vérifier votre compte : <a href="${link}">Valider mon compte</a>
        <p>Si vous n'avez pas créé de compte, ignorez ce mail.</p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé :", info.response);
    }catch(error) {
        console.error("Erreur email :", error);
    }
};
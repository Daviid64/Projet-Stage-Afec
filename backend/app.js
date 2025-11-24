import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from "cors";
import path from 'path';
import UserRoute from './routes/UserRoute.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Sécurité
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.NODE_ENV
      ? process.env.FRONTEND_URL_PROD
      : process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser
app.use(express.json());

// Routes API
app.use("/users", UserRoute);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

// Endpoint pour vérification de token
app.get('/verify/:token', (req, res) => {
  const { token } = req.params;
  console.log('Token reçu :', token);
  res.send(`Token reçu : ${token}`);
});

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../ReactFrontendProject/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ReactFrontendProject/dist/index.html'));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});

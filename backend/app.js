import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from "cors";
import UserRoute from './routes/UserRoute.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoute.js';
import { limiter } from './middleware/rateLimiters.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(helmet());
app.use(limiter);

/* ✅ CORS robuste */
const allowedOrigins = [
  process.env.FRONTEND_URL_PROD,
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* Routes */
app.use("/auth", authRoutes);
app.use("/users", UserRoute);
app.use("/admin", adminRoutes);

/* Health check (optionnel mais utile sur Render) */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

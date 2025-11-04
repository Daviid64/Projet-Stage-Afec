import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js'
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoute.js'
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true   // Pour autoriser les cookies
}));

app.use(express.json());

app.use("/users", UserRoute)
app.use("/admin", adminRoutes);
app.use("/auth",authRoutes)

app.get('/api/test',(req, res) => {
res.json({message: 'Connexion backend OK'});
});


app.get('/verify/:token', (req, res) => {
  const { token } = req.params;
  console.log('Token reçu :', token);
  res.send(`Token reçu : ${token}`);
});

app.listen (PORT, () =>{
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
})

import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js'
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoute.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", UserRoute)
app.use("/admin", adminRoutes);
app.use("/auth",authRoutes)

app.get('/verify/:token', (req, res) => {
  const { token } = req.params;
  console.log('Token reçu :', token);
  res.send(`Token reçu : ${token}`);
});

app.listen (PORT, () =>{
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
})

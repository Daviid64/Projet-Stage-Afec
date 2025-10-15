import express from "express"
import cors from "cors"

const app = express();

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

app.post("/api/contact", (req, res) =>{
    console.log("Données recues :",req.body);
    res.status(200).json({message: "Message recu !"});
});

app.listen(3001, () => console.log("Serveur backend sur http://localhost:3001"));
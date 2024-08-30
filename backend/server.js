/*const express = require("express");
const mongoose = require("mongoose");
const possessionRoutes = require("./routes/possessionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/possession", possessionRoutes);

// Connect to MongoDB (replace 'mongodb://localhost:27017/yourdb' with your database URI)
mongoose
  .connect("mongodb://localhost:27017/patrimoineDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));
*/

// patrimoine-economique-backend/server.js
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001; // Remplacez 5001 par le port de votre choix
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let possessions = [
  {
    id: 1,
    libelle: "MacBook Pro",
    valeur: 4000000,
    dateDebut: "25/12/2023",
    dateFin: "01/01/1970",
    taux: 5,
    valeurActuelle: 3863433.99,
  },
  {
    id: 2,
    libelle: "Alternance",
    valeur: 0,
    dateDebut: "01/01/2023",
    dateFin: "01/01/1970",
    taux: 0,
    valeurActuelle: 0.0,
  },
  {
    id: 3,
    libelle: "Survie",
    valeur: 0,
    dateDebut: "31/12/2022",
    dateFin: "01/01/1970",
    taux: 0,
    valeurActuelle: 0.0,
  },
  {
    id: 1,
    libelle: "MacBook Pro",
    valeur: 4000000,
    dateDebut: "25/12/2023",
    dateFin: "01/01/1970",
    taux: 5,
    valeurActuelle: 3863433.99,
  },
  {
    id: 2,
    libelle: "Alternance",
    valeur: 0,
    dateDebut: "01/01/2023",
    dateFin: "01/01/1970",
    taux: 0,
    valeurActuelle: 0.0,
  },
  {
    id: 3,
    libelle: "Survie",
    valeur: 0,
    dateDebut: "31/12/2022",
    dateFin: "01/01/1970",
    taux: 0,
    valeurActuelle: 0.0,
  },
  // autres possessions
];

app.get("/api/possessions", (req, res) => {
  res.json(possessions);
});

app.get("/api/possessions/:id", (req, res) => {
  const possession = possessions.find((p) => p.id === parseInt(req.params.id));
  res.json(possession);
});

app.put("/api/possessions/:id", (req, res) => {
  const index = possessions.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    possessions[index] = { ...possessions[index], ...req.body };
    res.status(200).json(possessions[index]);
  } else {
    res.status(404).send("Possession not found");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

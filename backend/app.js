const express = require("express");
const bodyParser = require("body-parser");
const possessionRoutes = require("./routes/possessionRoutes");

const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Utilisation des routes pour les possessions
app.use("/possession", possessionRoutes);

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose a mal tourné !");
});

module.exports = app;

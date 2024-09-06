const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

let patrimoineData = [
  {
    model: "Personne",
    data: { nom: "John Doe" },
  },
  {
    model: "Patrimoine",
    data: {
      possesseur: { nom: "John Doe" },
      possessions: [
        {
          id: 1,
          libelle: "MacBook Pro",
          valeur: 4300000,
          dateDebut: "2023-12-25T00:00:00.000Z",
          dateFin: null,
          tauxAmortissement: 5,
        },
        {
          id: 2,
          libelle: "Compte épargne",
          valeur: 500000,
          dateDebut: "2019-01-06T00:00:00.000Z",
          dateFin: null,
          tauxAmortissement: -5,
        },
        {
          id: 3,
          libelle: "Clothes",
          valeur: 2000000,
          dateDebut: "2020-01-01T00:00:00.000Z",
          dateFin: null,
          tauxAmortissement: 10,
        },
        {
          id: 4,
          libelle: "Alternance",
          valeur: 600000,
          dateDebut: "2023-02-13T00:00:00.000Z",
          dateFin: null,
          tauxAmortissement: 0,
          jour: 1,
          valeurConstante: 600000,
        },
        {
          id: 5,
          libelle: "Survie",
          valeur: 300000,
          dateDebut: "2023-02-13T00:00:00.000Z",
          dateFin: null,
          tauxAmortissement: 0,
          jour: 2,
          valeurConstante: -300000,
        },
        {
          id: 6,
          libelle: "Redmi Note 9",
          valeur: 800000,
          dateDebut: "2022-12-29T00:00:00.000Z",
          dateFin: null,
          tauxAmortissement: 15,
        },
      ],
    },
  },
];

// Route pour récupérer toutes les possessions d'une personne donnée
app.get("/api/possessions", (req, res) => {
  const patrimoine = patrimoineData.find((p) => p.model === "Patrimoine");
  if (patrimoine) {
    res.json(patrimoine.data.possessions);
  } else {
    res.status(404).send("Patrimoine not found");
  }
});

// Route pour récupérer une possession par son ID
app.get("/api/possessions/:id", (req, res) => {
  const patrimoine = patrimoineData.find((p) => p.model === "Patrimoine");
  const possession = patrimoine?.data.possessions.find(
    (pos) => pos.libelle === req.params.id
  );
  if (possession) {
    res.json(possession);
  } else {
    res.status(404).send("Possession not found");
  }
});

// Route pour mettre à jour une possession par son libellé
app.put("/api/possessions/:libelle", (req, res) => {
  const patrimoine = patrimoineData.find((p) => p.model === "Patrimoine");
  const index = patrimoine?.data.possessions.findIndex(
    (pos) => pos.libelle === req.params.libelle
  );
  if (index !== -1) {
    patrimoine.data.possessions[index] = {
      ...patrimoine.data.possessions[index],
      ...req.body,
    };
    res.status(200).json(patrimoine.data.possessions[index]);
  } else {
    res.status(404).send("Possession not found");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/*// Route pour créer une nouvelle possession
app.post("/api/possessions", (req, res) => {
  const patrimoine = patrimoineData.find((p) => p.model === "Patrimoine");
  if (patrimoine) {
    const newId = patrimoine.data.possessions.length
      ? Math.max(...patrimoine.data.possessions.map((p) => p.id)) + 1
      : 1;
    const newPossession = { id: newId, ...req.body };
    patrimoine.data.possessions.push(newPossession);
    res.status(201).json(newPossession);
  } else {
    res.status(404).send("Patrimoine not found");
  }
});*/

// backend/server.js
app.post("/api/possessions", (req, res) => {
  const newPossession = req.body;
  console.log("Données reçues pour ajout de possession:", newPossession); // Vérifiez les données reçues
  // Ajoutez la nouvelle possession à patrimoineData
  const patrimoine = patrimoineData.find((p) => p.model === "Patrimoine");
  const newId = patrimoine.data.possessions.length
    ? Math.max(...patrimoine.data.possessions.map((p) => p.id)) + 1
    : 1;
  newPossession.id = newId;
  patrimoine.data.possessions.push(newPossession);
  res.status(201).json(newPossession);
});

// backend/server.js
app.post("/api/possessions/:id/close", (req, res) => {
  const { id } = req.params;
  const patrimoine = patrimoineData.find((p) => p.model === "Patrimoine");
  const possession = patrimoine.data.possessions.find(
    (p) => p.id === parseInt(id)
  );
  if (!possession) {
    return res.status(404).json({ error: "Possession non trouvée" });
  }
  possession.dateFin = new Date().toISOString();
  res.status(200).json(possession);
});

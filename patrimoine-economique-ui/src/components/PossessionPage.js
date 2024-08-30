/*import React, { useState } from "react";

const PossessionPage = () => {
  const [possessions, setPossessions] = useState([]);
  const [newPossession, setNewPossession] = useState({
    libelle: "",
    valeurInitiale: "",
    dateDebut: "",
    dateFin: "",
    amortissement: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPossession({
      ...newPossession,
      [name]: value,
    });
  };

  const handleAddPossession = () => {
    setPossessions([...possessions, newPossession]);
    setNewPossession({
      libelle: "",
      valeurInitiale: "",
      dateDebut: "",
      dateFin: "",
      amortissement: "",
    });
  };

  return (
    <div>
      <h1>Gestion des Possessions</h1>

      <div>
        <h2>Ajouter une Nouvelle Possession</h2>
        <input
          type="text"
          name="libelle"
          value={newPossession.libelle}
          onChange={handleInputChange}
          placeholder="Libellé"
        />
        <input
          type="number"
          name="valeurInitiale"
          value={newPossession.valeurInitiale}
          onChange={handleInputChange}
          placeholder="Valeur Initiale"
        />
        <input
          type="date"
          name="dateDebut"
          value={newPossession.dateDebut}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dateFin"
          value={newPossession.dateFin}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amortissement"
          value={newPossession.amortissement}
          onChange={handleInputChange}
          placeholder="Amortissement (%)"
        />
        <button onClick={handleAddPossession}>Ajouter</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement (%)</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => {
            const valeurActuelle =
              possession.valeurInitiale -
              possession.valeurInitiale * (possession.amortissement / 100);
            return (
              <tr key={index}>
                <td>{possession.libelle}</td>
                <td>{possession.valeur}</td>
                <td>{possession.dateDebut}</td>
                <td>{possession.dateFin}</td>
                <td>{possession.tauxAmortissement}</td>
                <td>{valeurActuelle.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PossessionPage;
*/

import React from "react";
import { Link } from "react-router-dom";

const PossessionPage = () => {
  // Simulez vos données pour le tableau
  const possessions = [
    {
      libelle: "MacBook Pro",
      valeurInitiale: 4000000,
      dateDebut: "25/12/2023",
      dateFin: "01/01/1970",
      taux: 5,
      valeurActuelle: 3863433.99,
    },
    // Ajoutez plus de données ici
  ];

  return (
    <div>
      <h2>Possessions</h2>
      <Link
        to="/possession/create"
        style={{ marginBottom: "20px", display: "block" }}
      >
        <button>Créer une Possession</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement (%)</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeurInitiale}</td>
              <td>{possession.dateDebut}</td>
              <td>{possession.dateFin}</td>
              <td>{possession.taux}</td>
              <td>{possession.valeurActuelle}</td>
              <td>
                <Link to={`/possession/update/${possession.libelle}`}>
                  <button>Modifier</button>
                </Link>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PossessionPage;

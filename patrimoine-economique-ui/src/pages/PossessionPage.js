/*import React from "react";
import { useNavigate } from "react-router-dom";

const PossessionPage = () => {
  const navigate = useNavigate();

  const possessions = [
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
  ]; // Exemple de données

  return (
    <div>
      <h1>Liste des Possessions</h1>
      <button onClick={() => navigate("/possession/create")}>
        Créer une Possession
      </button>
      <table>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession) => (
            <tr key={possession.id}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{possession.dateDebut}</td>
              <td>{possession.dateFin}</td>
              <td>{possession.taux}%</td>
              <td>{possession.valeurActuelle.toFixed(2)} Ar</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/possession/update/${possession.id}`)
                  }
                >
                  Modifier
                </button>
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
*/

/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PossessionPage = () => {
  const navigate = useNavigate();
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    // Remplacez ce code par une logique pour charger les possessions depuis un backend
    const fetchPossessions = async () => {
      const response = await fetch("/api/possessions"); // Exemple d'appel à une API
      const data = await response.json();
      setPossessions(data);
    };

    fetchPossessions();
  }, []); // Rechargement lorsque le composant est monté

  return (
    <div>
      <h1>Liste des Possessions</h1>
      <button onClick={() => navigate("/possession/create")}>
        Créer une Possession
      </button>
      <table>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession) => (
            <tr key={possession.id}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{possession.dateDebut}</td>
              <td>{possession.dateFin}</td>
              <td>{possession.taux}%</td>
              <td>{possession.valeurActuelle.toFixed(2)} Ar</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/possession/update/${possession.id}`)
                  }
                >
                  Modifier
                </button>
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
*/

// patrimoine-economique-ui/src/components/PossessionPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPossessions, closePossession } from "../api";
import "../css/PossessionPage.css"; // Import du fichier CSS

const PossessionPage = () => {
  const [possessions, setPossessions] = useState([]);
  const navigate = useNavigate();

  const getPossessions = async () => {
    const data = await fetchPossessions();
    setPossessions(data);
  };

  useEffect(() => {
    // Chargement initial des possessions
    getPossessions();

    // Écoute de l'événement pour mettre à jour les possessions
    const handlePossessionsUpdated = () => {
      getPossessions();
    };

    window.addEventListener("possessionsUpdated", handlePossessionsUpdated);

    // Nettoyage de l'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener(
        "possessionsUpdated",
        handlePossessionsUpdated
      );
    };
  }, []);

  const handleClose = async (id) => {
    try {
      await closePossession(id); // Appel API pour clôturer la possession
      // Réactualiser la liste après la clôture
      getPossessions();
    } catch (error) {
      console.error("Erreur lors de la clôture de la possession :", error);
    }
  };

  return (
    <div className="container">
      <h1>Liste des Possessions</h1>
      <div style={{ textAlign: "center" }}>
        <button
          className="create-button"
          onClick={() => navigate("/possession/create")}
        >
          Créer une Possession
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession) => (
            <tr key={possession.id}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{possession.dateDebut}</td>
              <td>{possession.dateFin}</td>
              <td>{possession.taux}%</td>
              <td>{possession.valeurActuelle.toFixed(2)} Ar</td>
              <td className="actions">
                <button
                  className="modify-button"
                  onClick={() =>
                    navigate(`/possession/update/${possession.id}`)
                  }
                >
                  Modifier
                </button>
                <button
                  className="close-button"
                  onClick={() => handleClose(possession.id)}
                >
                  Clôturer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PossessionPage;

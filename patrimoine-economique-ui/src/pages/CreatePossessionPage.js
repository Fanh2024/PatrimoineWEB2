import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreatePossessionPage.css";
import { createPossession } from "../api"; // Assurez-vous que le chemin est correct

const CreatePossessionPage = () => {
  const [libelle, setLibelle] = useState("");
  const [valeur, setValeur] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [taux, setTaux] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer la nouvelle possession en appelant l'API
    try {
      await createPossession({ libelle, valeur, dateDebut, taux });
      // Rediriger vers la page des possessions
      navigate("/possession");
      // Émettre un événement personnalisé pour notifier les autres composants
      window.dispatchEvent(new Event("possessionsUpdated"));
    } catch (error) {
      console.error("Erreur lors de la création de la possession :", error);
    }
  };

  return (
    <div className="create-possession-page-container">
      <h1 className="create-possession-page-title">
        Créer une Nouvelle Possession
      </h1>
      <form onSubmit={handleSubmit} className="create-possession-page-form">
        <div>
          <label className="create-possession-page-label">Libelle: </label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
            className="create-possession-page-input"
          />
        </div>
        <div>
          <label className="create-possession-page-label">
            Valeur Initiale:{" "}
          </label>
          <input
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
            className="create-possession-page-input"
          />
        </div>
        <div>
          <label className="create-possession-page-label">Date Début: </label>
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
            className="create-possession-page-input"
          />
        </div>
        <div>
          <label className="create-possession-page-label">Taux: </label>
          <input
            type="number"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
            required
            className="create-possession-page-input"
          />
        </div>
        <button type="submit" className="create-possession-page-button">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default CreatePossessionPage;

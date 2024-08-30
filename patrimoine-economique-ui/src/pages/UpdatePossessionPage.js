import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/UpdatePossessionPage.css";

const UpdatePossessionPage = () => {
  const { id } = useParams();
  const [libelle, setLibelle] = useState("");
  const [dateFin, setDateFin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPossession = async () => {
      const response = await fetch(`/api/possessions/${id}`);
      const data = await response.json();
      setLibelle(data.libelle);
      setDateFin(data.dateFin);
    };

    fetchPossession();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/possessions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ libelle, dateFin }),
    });

    // Émettre un événement pour notifier la mise à jour
    window.dispatchEvent(new Event("possessionsUpdated"));

    navigate("/possession");
  };

  return (
    <div className="update-possession-page-container">
      <h1 className="update-possession-page-title">
        Mettre à Jour une Possession
      </h1>
      <form onSubmit={handleSubmit} className="update-possession-page-form">
        <div>
          <label className="update-possession-page-label">Libelle: </label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
            className="update-possession-page-input"
          />
        </div>
        <div>
          <label className="update-possession-page-label">Date Fin: </label>
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            required
            className="update-possession-page-input"
          />
        </div>
        <button type="submit" className="update-possession-page-button">
          Mettre à Jour
        </button>
      </form>
    </div>
  );
};

export default UpdatePossessionPage;

import React, { useState, useEffect } from "react";
import PossessionsTable from "./components/PossessionsTable";
import possessionsData from "./data/possessions";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updatedPossessions, setUpdatedPossessions] = useState(possessionsData);
  const [newPossession, setNewPossession] = useState({
    libelle: "",
    valeur: "",
    dateDebut: "",
    dateFin: "",
    tauxAmortissement: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Calcul de la valeur actuelle des possessions
  const calculateValue = () => {
    const updated = updatedPossessions.map((possession) => {
      const dateDebut = new Date(possession.dateDebut);
      const currentDateParsed = currentDate || new Date(); // Vérifie que la date actuelle est bien définie
      const elapsedTime =
        (currentDateParsed - dateDebut) / (1000 * 60 * 60 * 24 * 365); // Calcul du temps écoulé en années
      const amortissement = possession.tauxAmortissement || 0;
      const initialValue = possession.valeur || 0;
      const newValue = initialValue * (1 - (amortissement * elapsedTime) / 100);

      return {
        ...possession,
        valeurActuelle: isNaN(newValue)
          ? "0.00"
          : Math.max(newValue, 0).toFixed(2),
      };
    });
    setUpdatedPossessions(updated);
  };

  // Gestion des changements de date
  const handleDateChange = (event) => {
    setCurrentDate(new Date(event.target.value));
  };

  // Gestion des changements dans le formulaire de création de possession
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPossession({
      ...newPossession,
      [name]: value,
    });
  };

  // Ajouter une nouvelle possession
  const handleAddPossession = () => {
    setUpdatedPossessions([
      ...updatedPossessions,
      {
        ...newPossession,
        valeur: parseFloat(newPossession.valeur),
        tauxAmortissement: parseFloat(newPossession.tauxAmortissement),
      },
    ]);
    setNewPossession({
      libelle: "",
      valeur: "",
      dateDebut: "",
      dateFin: "",
      tauxAmortissement: "",
    });
  };

  // Gestion de la modification de possession
  const handleEdit = (index) => {
    setEditIndex(index);
    setNewPossession(updatedPossessions[index]);
  };

  // Appliquer les modifications à la possession
  const handleSaveEdit = () => {
    const updated = [...updatedPossessions];
    updated[editIndex] = {
      ...newPossession,
      valeur: parseFloat(newPossession.valeur),
      tauxAmortissement: parseFloat(newPossession.tauxAmortissement),
    };
    setUpdatedPossessions(updated);
    setEditIndex(null);
    setNewPossession({
      libelle: "",
      valeur: "",
      dateDebut: "",
      dateFin: "",
      tauxAmortissement: "",
    });
  };

  // Supprimer une possession
  const handleDelete = (index) => {
    const newPossessions = updatedPossessions.filter((_, i) => i !== index);
    setUpdatedPossessions(newPossessions);
  };

  useEffect(() => {
    calculateValue(); // Calculer les valeurs initiales au chargement de la page
  }, [updatedPossessions, currentDate]);

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Gestionnaire de patrimoine économique</h1>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <Form.Group controlId="datePicker">
            <Form.Label>Date de référence</Form.Label>
            <Form.Control type="date" onChange={handleDateChange} />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button onClick={calculateValue}>Valider</Button>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <h2>
            {editIndex !== null
              ? "Modifier une Possession"
              : "Ajouter une Nouvelle Possession"}
          </h2>
          <input
            type="text"
            name="libelle"
            value={newPossession.libelle}
            onChange={handleInputChange}
            placeholder="Libellé"
          />
          <input
            type="number"
            name="valeur"
            value={newPossession.valeur}
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
            name="tauxAmortissement"
            value={newPossession.tauxAmortissement}
            onChange={handleInputChange}
            placeholder="Amortissement (%)"
          />
          <Button
            onClick={editIndex !== null ? handleSaveEdit : handleAddPossession}
          >
            {editIndex !== null ? "Enregistrer les Modifications" : "Ajouter"}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <PossessionsTable
            possessions={updatedPossessions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <h4>
            Valeur du patrimoine au {currentDate.toLocaleDateString()}:{" "}
            {updatedPossessions
              .reduce((total, p) => total + parseFloat(p.valeurActuelle), 0)
              .toFixed(2)}{" "}
            Ar
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

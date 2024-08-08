import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import PossessionsTable from "./components/PossessionsTable";
import possessions from "./data/possessions";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updatedPossessions, setUpdatedPossessions] = useState(possessions);

  const handleDateChange = (event) => {
    setCurrentDate(new Date(event.target.value));
  };

  const calculateValue = () => {
    const updated = possessions.map((possession) => {
      const dateDebut = new Date(possession.dateDebut);
      const currentDateParsed = currentDate
        ? new Date(currentDate)
        : new Date(); // Vérifiez que la date actuelle est bien définie
      const elapsedTime =
        (currentDateParsed - dateDebut) / (1000 * 60 * 60 * 24 * 365); // Calcul du temps écoulé en années
      const amortissement = possession.tauxAmortissement || 0;

      // Assurez-vous que la valeur initiale n'est pas undefined ou NaN
      const initialValue = possession.valeur || 0;

      const newValue = initialValue * (1 - (amortissement * elapsedTime) / 100);

      // Affichage des valeurs dans la console pour vérification
      console.log("Libellé:", possession.libelle);
      console.log("Date Début:", dateDebut);
      console.log("Temps écoulé:", elapsedTime);
      console.log("Amortissement (%):", amortissement);
      console.log("Valeur actuelle:", newValue);

      return {
        ...possession,
        valeurActuelle: isNaN(newValue)
          ? "0.00"
          : Math.max(newValue, 0).toFixed(2),
      };
    });
    setUpdatedPossessions(updated);
  };

  useEffect(() => {
    calculateValue(); // Calculate initial values on page load
  }, []);

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
      <Row>
        <Col>
          <PossessionsTable possessions={updatedPossessions} />
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

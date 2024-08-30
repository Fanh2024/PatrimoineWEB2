/*import React from "react";
import { Table, Button } from "react-bootstrap";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Format par défaut selon les paramètres régionaux
};

const PossessionsTable = ({ possessions, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Libellé</th>
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
            <td>{possession.valeur}</td>
            <td>{formatDate(possession.dateDebut)}</td>
            <td>{formatDate(possession.dateFin)}</td>
            <td>{possession.tauxAmortissement}</td>
            <td>{possession.valeurActuelle}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(index)}>
                Modifier
              </Button>
              <Button variant="danger" onClick={() => onDelete(index)}>
                Supprimer
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PossessionsTable;
*/

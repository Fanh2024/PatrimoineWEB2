import React from "react";
import Table from "react-bootstrap/Table";

const PossessionsTable = ({ possessions }) => {
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
        </tr>
      </thead>
      <tbody>
        {possessions.map((possession, index) => (
          <tr key={index}>
            <td>{possession.libelle}</td>
            <td>{possession.valeur}</td> {/* Valeur Initiale */}
            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
            <td>
              {possession.dateFin
                ? new Date(possession.dateFin).toLocaleDateString()
                : "N/A"}
            </td>
            <td>{possession.tauxAmortissement}</td>
            <td>{possession.valeurActuelle}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PossessionsTable;

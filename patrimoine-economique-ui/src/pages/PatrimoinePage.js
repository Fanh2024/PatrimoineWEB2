import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js/auto";
import "../css/PatrimoinePage.css"; // Import du fichier CSS

const PatrimoinePage = () => {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [patrimoineValue, setPatrimoineValue] = useState(0);

  const handleValidate = () => {
    // Logique pour calculer la valeur du patrimoine pour la plage de dates sélectionnée
    const newValue = Math.random() * 100000; // Remplacer par une logique réelle
    setPatrimoineValue(newValue);

    // Logique pour afficher le graphique
    const ctx = document.getElementById("patrimoineChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Date 1", "Date 2", "Date 3"],
        datasets: [
          {
            label: "Valeur du patrimoine",
            data: [newValue, newValue * 1.1, newValue * 1.2],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  return (
    <div className="container">
      <h1>Patrimoine</h1>
      <div className="date-picker">
        <label>Date de référence: </label>
        <DatePicker
          selected={referenceDate}
          onChange={(date) => setReferenceDate(date)}
        />
        <button onClick={handleValidate}>Valider</button>
      </div>
      <div className="date-picker">
        <label>Date Début:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label>Date Fin:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <button onClick={handleValidate}>Valider</button>
      </div>
      <div className="result">
        <h2>
          Valeur du patrimoine à la date d'aujourd'hui:{" "}
          {patrimoineValue.toFixed(2)} Ar
        </h2>
      </div>
      <h3>Graphique de la valeur du patrimoine</h3>
      <div className="chart-container">
        <canvas id="patrimoineChart"></canvas>
      </div>
    </div>
  );
};

export default PatrimoinePage;
/**
 * import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js/auto";
import './PatrimoinePage.css'; // Import du fichier CSS

const PatrimoinePage = () => {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [patrimoineValue, setPatrimoineValue] = useState(0);

  const handleValidate = () => {
    // Logique pour calculer la valeur du patrimoine pour la plage de dates sélectionnée
    const newValue = Math.random() * 100000; // Remplacer par une logique réelle
    setPatrimoineValue(newValue);

    // Logique pour afficher le graphique
    const ctx = document.getElementById("patrimoineChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Date 1", "Date 2", "Date 3"],
        datasets: [
          {
            label: "Valeur du patrimoine",
            data: [newValue, newValue * 1.1, newValue * 1.2],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  return (
    <div className="container">
      <h1>Patrimoine</h1>
      <div className="date-picker">
        <label>Date de référence: </label>
        <DatePicker
          selected={referenceDate}
          onChange={(date) => setReferenceDate(date)}
        />
        <button onClick={handleValidate}>Valider</button>
      </div>
      <div className="date-picker">
        <label>Date Début:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label>Date Fin:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <button onClick={handleValidate}>Valider</button>
      </div>
      <div className="result">
        <h2>
          Valeur du patrimoine à la date d'aujourd'hui:{" "}
          {patrimoineValue.toFixed(2)} Ar
        </h2>
      </div>
      <h3>Graphique de la valeur du patrimoine</h3>
      <div className="chart-container">
        <canvas id="patrimoineChart"></canvas>
      </div>
    </div>
  );
};

export default PatrimoinePage;

 */

import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js/auto";
import "../css/PatrimoinePage.css";

const PatrimoinePage = () => {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("Lundi");
  const [patrimoineValue, setPatrimoineValue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null); // Référence pour le graphique

  // Fonction pour récupérer la valeur du patrimoine à une date précise
  const getPatrimoineByDate = async () => {
    // Logique pour récupérer la valeur du patrimoine à la date sélectionnée
    const newValue = Math.random() * 100000; // Remplacer par une logique réelle
    setPatrimoineValue(newValue);
  };

  // Fonction pour récupérer la valeur du patrimoine pour une plage de dates
  const getPatrimoineByRange = async () => {
    // Simuler un appel à l'API pour obtenir des données de patrimoine sur une période
    const randomData = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 15000 + 5000)
    );
    setChartData(randomData); // Mise à jour des données du graphique
  };

  // Fonction pour mettre à jour le graphique
  const updateChart = () => {
    const ctx = document.getElementById("patrimoineChart").getContext("2d");

    // Si le graphique existe déjà, le détruire avant de créer un nouveau
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Date 1", "Date 2", "Date 3", "Date 4", "Date 5"], // Remplacer par des dates réelles si besoin
        datasets: [
          {
            label: `Valeur du patrimoine (${selectedDay})`,
            data: chartData,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  // useEffect pour mettre à jour le graphique quand les données changent
  useEffect(() => {
    if (chartData.length > 0) {
      updateChart(); // Mettre à jour le graphique
    }
  }, [chartData]);

  // Fonction qui sera appelée quand l'utilisateur clique sur "Valider" pour la plage de dates
  const handleValidateRange = () => {
    getPatrimoineByRange(); // Mettre à jour les données du graphique
  };

  return (
    <div className="container">
      <h1>Patrimoine</h1>

      {/* Sélection de la date de référence */}
      <div className="date-picker">
        <label>Date de référence: </label>
        <DatePicker
          selected={referenceDate}
          onChange={(date) => setReferenceDate(date)}
        />
        <button onClick={getPatrimoineByDate}>Valider</button>
      </div>

      {/* Affichage de la valeur du patrimoine */}
      <div className="result">
        <h2>
          Valeur du patrimoine à la date sélectionnée:{" "}
          {patrimoineValue.toFixed(2)} Ar
        </h2>
      </div>

      {/* Sélection de la plage de dates */}
      <div className="date-picker">
        <label>Date Début:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label>Date Fin:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <label>Jour:</label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
        </select>
        <button onClick={handleValidateRange}>Valider</button>
      </div>

      {/* Graphique */}
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

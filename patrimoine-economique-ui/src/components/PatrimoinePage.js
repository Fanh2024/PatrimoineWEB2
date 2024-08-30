import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js/auto";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale);
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale);

const PatrimoinePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleValidation = () => {
    // Logique pour valider et récupérer les données
  };

  return (
    <div>
      <h2>Patrimoine</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Date de référence :</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <button onClick={handleValidation}>Valider</button>
      </div>
      <div>
        <h4>
          Valeur du patrimoine au {new Date().toLocaleDateString()} : ... Ar
        </h4>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>Sélectionnez une plage de dates pour voir l'évolution :</h4>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <button onClick={handleValidation}>Valider</button>
        <div style={{ marginTop: "20px" }}>
          <canvas id="patrimoineChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default PatrimoinePage;

// patrimoine-economique-ui/src/apiService.js

export const updatePossession = async (id, updatedData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/possessions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

/*
export const fetchPossessions = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/possessions");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};

export const closePossession = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/possessions/${id}/close`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la clôture de la possession");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
*/

// api.js
export const fetchPossessions = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/possessions");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des possessions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur dans fetchPossessions :", error);
    return [];
  }
};

// api.js
export const closePossession = async (id) => {
  const response = await fetch(
    `http://localhost:5001/api/possessions/${id}/close`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la clôture de la possession");
  }
  return response.json();
};

// api.js
export const createPossession = async (possession) => {
  const response = await fetch("http://localhost:5001/api/possessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      libelle: possession.libelle,
      valeur: parseFloat(possession.valeur),
      dateDebut: possession.dateDebut,
      tauxAmortissement: parseFloat(possession.taux), // Assurez-vous que c'est un nombre
    }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de la possession");
  }
  return response.json();
};

const express = require("express");
const {
  getPossessions,
  createPossession,
  updatePossession,
  closePossession,
} = require("../controllers/possessionController");
const router = express.Router();

router.get("/", getPossessions);
router.post("/", createPossession);
router.put("/:libelle", updatePossession);
router.patch("/:libelle/close", closePossession);

module.exports = router;

app.put("/api/possessions/:id", (req, res) => {
  const patrimoine = patrimoineData.find((p) => p.model === "Patrimoine");
  const possessionIndex = patrimoine?.data.possessions.findIndex(
    (pos) => pos.libelle === req.params.id
  );

  if (possessionIndex !== -1) {
    patrimoine.data.possessions[possessionIndex] = {
      ...patrimoine.data.possessions[possessionIndex],
      ...req.body,
    };
    res.status(200).json(patrimoine.data.possessions[possessionIndex]);
  } else {
    res.status(404).send("Possession not found");
  }
});

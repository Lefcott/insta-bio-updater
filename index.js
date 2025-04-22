const express = require("express");
const bioUpdater = require("./utils/bioUpdater");
const ageCalculator = require("./utils/ageCalculator");
const app = express();
const port = process.env.PORT || 3000;

let currentBio = "";

app.get("/update-bio", async (req, res) => {
  if (req.query.token !== process.env.TOKEN) {
    return res.status(401).send("Unauthorized");
  }

  const { years, months, days, hours } = ageCalculator.calculateAge();

  const daysSeparator = !hours ? " y" : ",";
  const monthsSeparator = !days && !hours ? " y" : ",";

  const monthsText = !months
    ? ""
    : months === 1
    ? `${monthsSeparator} 1 mes`
    : `${monthsSeparator} ${months} meses`;
  const daysText = !days
    ? ""
    : days === 1
    ? `${daysSeparator} 1 día`
    : `${daysSeparator} ${days} días`;
  const hoursText = !hours
    ? ""
    : hours === 1
    ? " y 1 hora"
    : ` y ${hours} horas`;

  const newBio = `🇦🇷 ${years} años${monthsText}${daysText}${hoursText}
💻 Dev (en mi máquina funciona)
🎸 Guitarrista en @_acidamente
🏓`;

  if (newBio === currentBio) {
    return res.send("");
  }

  currentBio = newBio;

  await bioUpdater.updateBio(newBio);

  res.send("");
});

app.listen(port, () => {
  console.log(`Bio Updater listening on port ${port}`);
});

const { setupRoutes } = require("./controllers");
const express = require("express");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// je suis la !!!!!
// bon... petit chien

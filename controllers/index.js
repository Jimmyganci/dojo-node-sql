const moviesRouter = require("./movies");

const setupRoutes = (app) => {
  // Movie routes
  app.use("/api/movies", moviesRouter);
};

module.exports = {
  setupRoutes,
};

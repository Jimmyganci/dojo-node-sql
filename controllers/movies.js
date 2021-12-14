const moviesRouter = require("express").Router();
const Movie = require("../models/movie");

moviesRouter.get("/", (req, res) => {
  const { title, max_duration, color, sort, min, max } = req.query;
  Movie.findMany({
    filters: { title, max_duration, color, sort, min, max },
  }).then((movies) => res.status(200).json(movies));
});

moviesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Movie.findOne(id).then((movies) => res.status(200).json(movies));
});

moviesRouter.post("/", (req, res) => {
  console.log(req.body);
  Movie.createMovie(req.body).then((movie) => res.status(200).json(movie));
});

moviesRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Movie.deleteMovie(id).then((movie) => res.status(200).send("movie deleted"));
});

module.exports = moviesRouter;

const express = require('express');
const Router = express.Router();
const MoviesController = require('./../Controllers/MovieController');








Router.route('/')
    .get(MoviesController.GetMovies)
    .post(MoviesController.addMovie)


Router.route('/:Id')
    .get(MoviesController.getMovie)
    .patch(MoviesController.updateMovie)
    .delete(MoviesController.DeleteMovie)

module.exports = Router;
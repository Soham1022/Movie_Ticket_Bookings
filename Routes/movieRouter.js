const express= require('express');
const movieController = require('../Controller/movieController');

const MovieRouter = express.Router();

MovieRouter.post("/",movieController.addMovie);
MovieRouter.get("/",movieController.showMovies);
MovieRouter.get("/:id",movieController.MovieById);



module.exports=MovieRouter;
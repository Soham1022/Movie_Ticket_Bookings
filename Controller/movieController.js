const jwt = require('jsonwebtoken');
const MovieModel = require('../ModelSchema/movieSchema');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

class movieController {
    static addMovie = (req, res) => {
        const extractedToken = req.headers["authorization"];
        const Token = extractedToken.split(" ")[1];
        if (!Token) {
            res.status(404).json({ msg: "Token not found" })
        }
        console.log(Token);
        let admin;
        dotenv.config();
        jwt.verify(Token, process.env.Secret_Key, (err, decrypted) => {
            if (err) {
                res.status(404).json({ msg: err.message, msge: 'No token' })
            }
            else {
                admin = decrypted.id;
                return;
            }
        })
        const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
        if (!title) {
            res.status(404).json({ msg: "Invalid Title" })
        }
        if (!description) {
            res.status(404).json({ msg: "Invalid Description" })
        }
        if (!releaseDate) {
            res.status(404).json({ msg: "Invalid Release Date" })
        }
        if (!posterUrl) {
            res.status(404).json({ msg: "Invalid Poster URL" })
        }

        try {
            const movie = new MovieModel({ title, description, releaseDate: new Date(`${releaseDate}`), featured, admin: admin, actors, posterUrl })
            movie = movie.save();

            const session = mongoose.startSession();
            const adminUser = mongoose.findById(admin);

            session.startTransaction();
            movie.save({ session });
            adminUser.addmovies.push(movie);
            adminUser.save({ session });
            session.commitTransaction();

            if (!movie) {
                res.status(404).json({ msg: "Request failed" })
            }
            else {
                res.status(200).json({ data: movie });
            }
        }

        catch (error) {
            res.status(404).json({ mesg: error.message }) 
        }


    };

    static showMovies = async (req, res) => {
        try {
            const movies = await MovieModel.find();
            if (!movies) {
                res.status(404).json({ msg: err.message });
            }
            res.status(200).json({ data:movies });
        }
        catch (err) {
            res.status(404).json({ msge: err.message });
        }
    }

    static MovieById = async (req, res) => {
        try {
            const movieId = req.params.id;
            const Find = await MovieModel.findById(movieId);
            if (!Find) {
                res.status(404).json({ msg: "Put valid Id" });
            }
            res.status(200).json({ Movie: Find })
        } 
        catch (error) {
            console.log(error);
            res.status(404).json({ msge: error.message });
        }
    }

}

module.exports = movieController;
const fs = require('fs');



const movies = JSON.parse(fs.readFileSync('./Data/Movies.json'));
exports.GetMovies = (request, response) => {
    response.status(200).json({
        Status: 'success',
        Count: movies.length,
        requestAt: request.requestedAt,
        data: {
            movies: movies
        }
    });
};

exports.getMovie = (request, response) => {
    console.log(request.params.Id);
    const SendMovie = movies.find(mov => mov.id == request.params.Id);
    if (SendMovie) {
        response.status(200).json({
            Status: 'success',
            data: {
                movies: SendMovie
            }
        });
    } else {
        response.status(404).json({
            Status: "Failed",
            data: {
                movies: "movie not found with id " + request.params.Id + " please try another movie"
            }
        })
    }


};

exports.addMovie = (req, res) => {
    const newID = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ id: newID }, req.body);
    movies.push(newMovie);
    fs.writeFile('./Data/Movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            statu: "Success",
            data: {
                movie: newMovie
            }
        });
    })
};


exports.updateMovie = (req, res) => {
    const MovieToUpdate = movies.find(mov => mov.id == req.params.Id);
    if (!MovieToUpdate) {
        return res.status(404).json({
            Status: "Failed",
            data: {
                movies: "movie not found with id " + req.params.Id + " please try another movie"
            }
        })
    }

    let index = movies.indexOf(MovieToUpdate);
    Object.assign(MovieToUpdate, req.body);
    movies[index] = MovieToUpdate;
    fs.writeFile('./Data/Movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            statu: "Success",
            data: {
                movie: MovieToUpdate
            }
        });
    })
};

exports.DeleteMovie = (req, res) => {
    const MovieToDelete = movies.find(mov => mov.id == req.params.Id);
    if (!MovieToDelete) {
        return res.status(404).json({
            Status: "Failed",
            data: {
                movies: "movie not found with id " + req.params.Id + " please try another movie"
            }
        })
    }

    let index = movies.indexOf(MovieToDelete);
    movies.splice(index, 1);
    fs.writeFile('./Data/Movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            statu: "Success",
            data: {
                movie: MovieToDelete
            }
        });
    })

};
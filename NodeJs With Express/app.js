const express = require('express');
const fs = require('fs');
var morgan = require('morgan');

let app = express();
app.use(express.json());
const logger = function (req, res, next) {
    console.log("custom middlewere executed");
    next();
}
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});


const movies = JSON.parse(fs.readFileSync('./Data/Movies.json'));

// route =http method + Url ;
app.get('/', (req, res) => {
    // res.send('hello form express server');
    // res.status(200).send('hello form express server');
    res.status(200).json({ Name: "hello", Id: 25 });
});

const GetMovies = (request, response) => {
    response.status(200).json({
        Status: 'success',
        Count: movies.length,
        requestAt:request.requestedAt,
        data: {
            movies: movies
        }
    });
};

const getMovie = (request, response) => {
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

const addMovie = (req, res) => {
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


const updateMovie = (req, res) => {
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

const DeleteMovie = (req, res) => {
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


// //api/movies

// //get all items
// app.get('/api/v1/movies', GetMovies);

// // get specific item
// app.get('/api/v1/movies/:Id', getMovie);

// // post request
// app.post('/api/v1/movies', addMovie);
// // patch method 

// app.patch('/api/v1/movies/:Id', updateMovie);

// // delete an item
// app.delete('/api/v1/movies/:Id', DeleteMovie);

app.route('/api/v1/movies')
    .get(GetMovies)
    .post(addMovie)


app.route('/api/v1/movies/:Id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(DeleteMovie)



//create a server
const PORT = 8000;
app.listen(PORT, () => {
    console.log("server has started");
});
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const MovieRoute = require('./Routes/MoviesRoutes')



let app = express();
// middelwere

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./Public'));
const logger = function (req, res, next) {
    console.log("custom middlewere executed");
    next();
}
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});


//using the routes
app.use('/api/v1/movies', MovieRoute);

// exporting object 
module.exports = app;
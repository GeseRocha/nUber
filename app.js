const express = require('express')
const app = express();
// Morgan is a logging package
const morgan = require('morgan');
// Used to easily parse information
const bodyParser = require('body-parser');
// Database
const mongoose = require('mongoose');

//imports routes to be use
const driverRoutes = require('./api/routes/drivers');
const orderRoutes = require('./api/routes/orders');

// Imports database
mongoose.connect('mongodb+srv://geserocha:'
    + process.env.MONGO_ATLAS_PW
    + '@node-rest-nuber-noaag.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    });


// implements logging for all requests
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Funnels request through it so that it allows for CORS
app.use((req, res, next) => {
    // Allows access to all servers
    res.header("Access-Control-Allow-Origin", "*");

    // Allows these types of requests
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Allows these types of methods
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
})

// acts as a middle ware between requests and the routes
app.use('/drivers', driverRoutes);
app.use('/orders', orderRoutes);

// Catches all request that are not found in our routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    // Forward 404 error instead of the original error
    next(error);
})

// Catches the request errors from the function above as well as any other error in the program
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    // returns an error message
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
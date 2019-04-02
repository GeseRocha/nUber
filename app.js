const express = require('express')
const app = express();
// Morgan is a logging package
const morgan = require('morgan');

//imports routes to be use
const driverRoutes = require('./api/routes/drivers');
const orderRoutes = require('./api/routes/orders');

// implements logging for all requests
app.use(morgan('dev'));

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
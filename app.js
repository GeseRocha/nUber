const express = require('express')
const app = express();

//imports routes to be use
const driverRoutes = require('./api/routes/drivers');
const orderRoutes = require('./api/routes/orders');

// acts as a middle ware between requests and other methods
app.use('/drivers', driverRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
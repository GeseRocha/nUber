const express = require('express')
const app = express();

// acts as a middle ware between requests and other methods
app.use((req, res, next) => {
    res.status(200).json({
       message: 'It works!'
    });
});

module.exports = app;
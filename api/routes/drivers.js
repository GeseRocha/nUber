const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = Promise;


const Driver = require('../models/driver');

// Gets sub route '/' and has a handler (function) that returns a json object
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

// TODO Update location to be given as a google API location
router.post('/', (req, res, next) =>{
    // Creates an object for database
    const driver = new Driver ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location
    });

    // Stores to the database and checks for errors
    driver.save()/*.then(result => {
        console.log("this went throug")
        console.log(result)
    })
        .catch(err => console.log(err));*/

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdDriver: driver
    });
});

// Gets an individual driver
router.get('/:driverId', (req, res, next) =>{
    const id = req.params.driverId;

    Driver.findById(id).then(driver)


});

// TODO: implement patch function
router.patch('/:driverId', (req, res, next) =>{
    res.status(200).json({
        message: 'Updated driver!'
    })
});

// TODO: implement delete function
router.delete('/:driverId', (req, res, next) =>{
    res.status(200).json({
        message: 'Deleted driver!'
    })
});

// Exports routes so that app.js can use them
module.exports = router;
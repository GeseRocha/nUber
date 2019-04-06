const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = Promise;


const Driver = require('../models/driver');

// Gets sub route '/' and has a handler (function) that returns a json object
router.get('/', (req, res, next) =>{
    Driver.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
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
    driver.save()
        .then(result => {console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdDriver: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });


});

// Gets an individual driver
router.get('/:driverId', (req, res, next) =>{
    const id = req.params.driverId;

    Driver.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            // Checks to see if document is in the collection
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'})
            }
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });


});

// TODO: implement patch function
router.patch('/:driverId', (req, res, next) =>{
    const id = req.params.driverId;
    const updateOps = {};

    // Uses an array dynamically update properties instead of updating all of them
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Driver.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

// TODO: implement delete function
router.delete('/:driverId', (req, res, next) =>{

    const id = req.params.driverId;

    Driver.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Exports routes so that app.js can use them
module.exports = router;
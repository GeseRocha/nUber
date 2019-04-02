const express = require('express');
const router = express.Router();

// Gets sub route '/' and has a handler (function) that returns a json object
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) =>{
    // Creates an object
    const driver = {
        name: req.body.name,
        location: req.body.location
    };

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdDriver: driver
    });
});

// Gets an individual driver
router.get('/:driverId', (req, res, next) =>{
    const id = req.params.driverId;

    if (id == 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
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
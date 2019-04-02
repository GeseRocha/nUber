const express = require('express');
const router = express.Router();

// TODO implement method
router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

// TODO implement method
router.post('/', (req, res, next) =>{
    // Status code 201 means everything went okay and resource was created
    res.status(201).json({
        message: 'Orders were created'
    });
});

// TODO implement method
// Colin means that orderId is a dynamic parameter
router.get('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message: 'Order details',
        orderId: req.param.orderId
    });
});

// TODO implement method
router.delete('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.param.orderId
    });
});

module.exports = router;
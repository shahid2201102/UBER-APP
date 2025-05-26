const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { user, vehicleType, pickup, destination } = req.body;
    //console.log(user);
    try { 
        const ride = await rideService.createRide({ user: req.user._id, vehicleType, pickup, destination });
        return res.status(201).json(ride);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
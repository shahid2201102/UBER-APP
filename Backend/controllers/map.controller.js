const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    try {
        // Validate query parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check for address in query params
        if (!req.query.address) {
            return res.status(400).json({ 
                success: false,
                message: 'Address is required as a query parameter' 
            });
        }

        const address = req.query.address;
        const result = await mapService.getAddressCoordinate(address);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.error
            });
        }

        return res.status(200).json({
            success: true,
            data: result.coordinates
        });

    } catch (error) {
        console.error('Coordinate fetch error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Failed to get coordinates',
            error: error.message 
        });
    }
};


module.exports.getDistanceTime = async (req, res, next) => {
    try {
        // Validate query parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);

    } catch (error) {
        console.error('Distance and time fetch error:', error);
        res.status(500).json({message: 'Internal server error'});
    }

}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);

    } catch (error) {
        console.error('Auto-complete suggestions fetch error:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}
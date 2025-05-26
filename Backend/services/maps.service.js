const axios = require('axios');
require('dotenv').config();

module.exports.getAddressCoordinate = async (address) => {
    try {
        if (!process.env.GOOGLE_MAPS_API) {
            throw new Error('Google Maps API key is not configured');
        }

        // URL encode the address
        const encodedAddress = encodeURIComponent(address);
        
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API}`
        );

        // Log response for debugging
        console.log('Google Maps API Response:', response.data);

        if (response.data.status === 'ZERO_RESULTS') {
            return {
                success: false,
                message: 'No results found for this address'
            };
        }

        if (response.data.status !== 'OK') {
            return {
                success: false,
                message: `Geocoding failed: ${response.data.status}`
            };
        }

        if (!response.data.results || response.data.results.length === 0) {
            return {
                success: false,
                message: 'No coordinates found for this address'
            };
        }

        const { lat, lng } = response.data.results[0].geometry.location;
        
        return {
            success: true,
            coordinates: {
                latitude: lat,
                longitude: lng
            }
        };

    } catch (error) {
        console.error('Geocoding error:', error.message);
        return {
            success: false,
            message: 'Failed to get coordinates',
            details: error.message
        };
    }
};


module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No results found for this route');
            }
            return response.data.rows[0].elements[0];
        }
        else {
            throw new Error(`Unable to fetch distance and time`);
        }
    } catch (error){
        console.log(error);
        throw error;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input) {
        throw new Error('query is required');
    }
    
    const apiKey = process.env.GOOGLE_MAPS_API;
    
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(`Unable to fetch suggestions`);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
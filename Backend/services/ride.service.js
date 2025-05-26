const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required to calculate fare');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    console.log('Distance and Time:', distanceTime);
    
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1
    };

    const fare = {
        auto: baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto + (distanceTime.duration.value / 60) * perMinuteRate.auto,
        car: baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value / 60) * perMinuteRate.car,
        moto: baseFare.moto + (distanceTime.distance.value / 1000) * perKmRate.moto + (distanceTime.duration.value / 60) * perMinuteRate.moto
    };
    return fare;
}

function getOtp(num) {
    function generatedOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp;
    }
    return generatedOtp(num);
}

module.exports.createRide = async ({
    user,
    vehicleType,
    pickup,
    destination
}) => {
    if (!user || !vehicleType || !pickup || !destination) {
        throw new Error('User ID, vehicle type, pickup, and destination are required to create a ride');
    }

    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })

    return ride;
}
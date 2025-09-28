const mongoose = require("mongoose")

const usedBikeSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    manufactureYear: {
        type: Number,
        required: true
    },
    mileageKm: {
        type: Number
    },
    price: {
        type: Number
    },
    images: [{
        url: { type: String, required: true },
        description: { type: String } // like "RC Front", "Side View", etc
    }],
    shopId: {
        type: String
    },
    shopName: {
        type: String
    },
    shopAddress: {
        type: String
    },
    shopPhone: {
        type: String
    },
    conditionStatus: {
        type: String // Excellent, Good, Average, Poor
    },
    vehicleType: {
        type: String // Petrol or EV
    },
    bikeStatus: {
        type: String // Old, Used
    },
    previousOwners: {
        type: Number // number of previous owners
    },
    registrationNumber: {
        type: String
    }
}, {
    timestamps: true
})

const UsedBike = mongoose.model("UsedBike", usedBikeSchema)
module.exports = UsedBike

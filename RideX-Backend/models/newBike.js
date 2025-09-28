const mongoose = require("mongoose")

const newBikeSchema = new mongoose.Schema({
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
    vehicleType: {
        type: String // Petrol or EV
    },
    bikeStatus: {
        type: String // New or Old
    }
}, {
    timestamps: true
})

const newBike = mongoose.model("Bike", newBikeSchema)
module.exports = newBike

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const dealerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String
    },
    address: {
        type: String
    }
}, {
    timestamps: true
})

// generate JWT token
dealerSchema.methods.getJWT = async function () {
    const dealer = this
    const token = jwt.sign({ _id: dealer._id }, "Jag@123", { expiresIn: "1d" })
    return token
}

// validate password
dealerSchema.methods.validatePassword = async function (passwordInput) {
    const dealer = this
    const isValid = await bcrypt.compare(passwordInput, dealer.password)
    return isValid
}

const Dealer = mongoose.model("Dealer", dealerSchema)
module.exports = Dealer

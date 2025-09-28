const jwt = require("jsonwebtoken")
const Dealer = require("../models/dealer")

const dealerAuth = async(req,res,next)=>{
try{
const cookies = req.cookies
const {token} = cookies
if(!token){
throw new Error("Token not valid")
}

const decoded = jwt.verify(token,"Jag@123")
const {_id} = decoded

const dealer = await Dealer.findById(_id)
if(!dealer){
throw new Error("Dealer not found")
}

req.dealer = dealer
next()

}catch(err){
res.status(400).send("Error : "+err.message)
}
}

module.exports = {dealerAuth}

const validator = require("validator")

const validateDealerData = (req)=>{
const {name,emailId,password,phoneNo,address} = req.body

if(!name || name.trim().length<3){
throw new Error("Name must be at least 3 characters long")
}

if(!validator.isEmail(emailId)){
throw new Error("Email is not valid")
}

if(!validator.isStrongPassword(password,{minLength:6})){
throw new Error("Enter a stronger password")
}

if(phoneNo && phoneNo.trim().length<10){
throw new Error("Phone number is not valid")
}

return true
}

module.exports = validateDealerData

const validateBikeData = (req)=>{
const {brand, modelName, manufactureYear, mileageKm, price, images, vehicleType, bikeStatus, conditionStatus} = req.body

if(!brand || brand.trim().length<2){
throw new Error("Brand is not valid")
}

if(!modelName || modelName.trim().length<1){
throw new Error("Model Name is not valid")
}

if(!manufactureYear || manufactureYear<1900 || manufactureYear>new Date().getFullYear()+1){
throw new Error("Manufacture Year is not valid")
}

if(mileageKm && mileageKm<0){
throw new Error("Mileage cannot be negative")
}

if(price && price<0){
throw new Error("Price cannot be negative")
}

if(!images || !Array.isArray(images) || images.length==0){
throw new Error("Add at least one image")
}
else{
images.forEach((img)=>{
if(!img.url){
throw new Error("Image URL is missing")
}
})
}

if(!vehicleType){
throw new Error("Vehicle type is required")
}

if(!bikeStatus){
throw new Error("Bike status is required")
}

if(!conditionStatus){
throw new Error("Condition status is required")
}

return true
}

module.exports=validateBikeData

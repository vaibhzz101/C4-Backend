const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
    userId: {type:String, required: true},
   ipaddress: {type:String, required: true, unique: true},
   createdat: {type:Date, required: true},
    city: {type:String, required: true}
})

const city = mongoose.model("search", citySchema)

module.exports = city;
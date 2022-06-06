const mongoose= require("mongoose");

const partnerSchema = mongoose.Schema({
    name:{type: String, required: true},
    logo:{ type: String,required:false },
    address:{ type: String,required:true },
    city:{ type: String,required:true },
    working_hours:{ type: String,required:true },
    phone:{ type:String, required:true},
    email:{type:String, required:true},
    password:{ type: String,required:true },
})

const Partner = mongoose.model("Partner", partnerSchema)
module.exports = Partner;
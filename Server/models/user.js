const mongoose = require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    username:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true
    },
    address:{
        type: String
    },
    phone:{
        type: String,
        min:9,
        required: true

    }


},{timestamps:true}

)
module.exports=mongoose.model('User',userSchema)

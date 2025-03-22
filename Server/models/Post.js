const mongoose = require('mongoose')
const postSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true
},
body:{
    type:String
}
},{})
module.exports= mongoose.model('Post',postSchema)
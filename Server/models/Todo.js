const mongoose=require("mongoose")   
const todoSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true
},
tags:{
    type:[String]
},
completed:{
    type:Boolean,
    default:false
}
},{})                                                       
module.exports=mongoose.model("todo",todoSchema)
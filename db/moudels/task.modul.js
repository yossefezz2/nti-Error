const mongoose = require('mongoose');
const validator = require("validator")
const taskSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minLenght:3,
        maxLenght:20,
        required: true,
    },type:{
        type:String,
        trim:true,
        enum:["file","txt"]
    },content:{
        type:String,
        trim:true,
        minLenght:3,
        maxLenght:20,
        required:function(){return this.type == "txt"}
    },file:{
        type:String,
        trim:true,
        required:function(){return this.type == "file"}
    }

})
const taskModel =mongoose.model("task", taskSchema)

module.exports=taskModel
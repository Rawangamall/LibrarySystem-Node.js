const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//create schema object

const schema=new mongoose.Schema({
    _id: Number,
    fullName:String,
    email:{type: String,required:true,validate:[validateEmail,"invalid email"],unique:true},
    password:String ,
    image:String ,
    phoneNumber:Number ,
    birthdate: Date ,
    fullAddress:String,
},
{ timestamps: true }   // createAT updateAT
);

schema.plugin(AutoIncrement);

//mapping
mongoose.model("member",schema);
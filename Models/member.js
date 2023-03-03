const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//create schema object
const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regex.test(email);
  };

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

//  schema.plugin(AutoIncrement ,{inc_field: 'id'});

//mapping
mongoose.model("member",schema);
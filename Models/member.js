const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//create schema object
const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regex.test(email);
  };

const schema=new mongoose.Schema({
    _id : Number,
    fullName:String,
    email:{type: String,required:true,validate:[validateEmail,"invalid email"],unique:true},
    password:{ type: String, select: false },
    image:String ,
    phoneNumber:Number ,
    birthdate: Date ,
    fullAddress:String
    
   
},
{ timestamps: true }  
);

schema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

schema.plugin(AutoIncrement,{id:'member_id',inc_field:"_id"});

//mapping
mongoose.model("member",schema);
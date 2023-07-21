const mongoose=require("mongoose");
const bcrypt = require("bcrypt");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regex.test(email);
  };

const schema=new mongoose.Schema({
    _id: Number,
    firstName:String,
    lastName:String,
    email:{type: String,required:true,validate:[validateEmail,"invalid email"],unique:true},
    password:{ type: String, select: false },
    birthdate:Date,
    hireDate:{type:Date, default: Date.now()},
    image:String,
    salary:Number,
    Role:{type:String, enum:["Admin","BasicAdmin","Owner"]},
});

schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

schema.plugin(AutoIncrement,{id:'Admin_id',inc_field:"_id"});
//mapping
mongoose.model("Admin",schema);
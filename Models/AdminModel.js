
const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema=new mongoose.Schema({
    _id: Number,
    firstName:String,
    lastName:String,
    email:{type:String, unique:true},
    password:String,
    birthdate:Date,
    hireDate:{type:Date, default: Date.now()},
    image:String,
    salary:Number,
    Role:{type:String, enum:["Admin","BasicAdmin"]},
});
schema.plugin(AutoIncrement ,{inc_field: '_id'});
//mapping
mongoose.model("Admin",schema);
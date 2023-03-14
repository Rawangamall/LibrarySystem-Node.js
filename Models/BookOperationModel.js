const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema=new mongoose.Schema({
    _id: Number,
    operation:{type:String, enum:["borrow","read"]},
    memberID:{ 
        type:Number,
        require:true,
        ref:"member"},
    bookID:{ 
        type:Number,
        require:true,
        ref:"book"},
     employeeID:{ 
       type:Number,
       require:true,
       ref:"Emp"},
    startDate:{type:Date , default:new Date()},    
    expireDate:Date,
    returned:Boolean
});
schema.plugin(AutoIncrement,{id:'BookOper_id',inc_field:"_id"});
//mapping
mongoose.model("BookOperation",schema);
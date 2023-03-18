const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema=new mongoose.Schema({
    _id: Number,
    title:String,
    author:String,
    publisher:String,
    publishingDate:Date,
    category:String,
    edition:String,
    pages:Number,
    noOfCopies:Number,
    available:Boolean,
    shelfNo:Number,
    noBorrowed:{type:Number,default:0},
    noOfCurrentBorrowed:{type:Number,default:0},
    noOfCurrentReading:{type:Number,default:0},
    noReading:{type:Number,default:0}
},
{timestamps: true });
schema.plugin(AutoIncrement,{id:'Book_id',inc_field:"_id"});
mongoose.model("Book",schema);
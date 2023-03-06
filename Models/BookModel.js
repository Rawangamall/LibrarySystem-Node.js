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
    noBorrowed:Number
},
{ timestamps: true }  );
schema.plugin(AutoIncrement,{id:'Book_id',inc_field:"_id"});
//mapping
mongoose.model("Book",schema);
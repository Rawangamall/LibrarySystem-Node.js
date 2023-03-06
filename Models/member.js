const mongoose = require('mongoose')
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
    password:String ,
    image:String ,
    phoneNumber:Number ,
    birthdate: Date ,
    fullAddress:String,
    borrowOper:[
     {
        book_id:{ 
           type:Number,
           require:true,
           ref:"book"},
           borrow_Date: {type: Date , default: new Date() },
            expire_Date: {
          type: Date,
          required:true
        },
        employee_id:{ 
          type:Number,
          require:true,
          ref:"Emp"}
      }
    ] ,
    readingOper:[
        {   
        book_id:{type:Number,require:true,ref:"book"},
        read_date:{type:Date , default: new Date()}
        }
    ]
},
{ timestamps: true }   // createAT updateAT
);
schema.plugin(AutoIncrement,{id:'member_id',inc_field:"_id"});

//mapping
mongoose.model("member",schema);
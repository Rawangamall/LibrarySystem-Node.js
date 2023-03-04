const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema=new mongoose.Schema({
    _id: Number,
    firstName:String,
    lastName:String,
    email:{type:String, unique:true,
        validate:{
			validator: function(mail_add){
				return /^[a-z]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i.test(mail_add);
			},
			message: function(){
				return "Invalid email";
			}
		}
    },
    password:String,
    birthdate:Date,
    hireDate:{type:Date, default: Date.now()},
    image:String,
    salary:Number  
});
schema.plugin(AutoIncrement,{id:'Emp_id',inc_field:"_id"});
//mapping
mongoose.model("Employees",schema);
const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    _id: Number,
    firstName:String,
    lastName:String,
    email:{type:String,
        validate: {
			validator: function(mail_add) {
				return /^[a-z]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i.test(mail_add);
			},
			message: function() {
				return "Invalid email";
			}
		}
    },
    password:String,
    birthdate:Date,
    hireDate:{type: Date, default: Date.now()},
    image:String,
    salary:Number    
});
//mapping
mongoose.model("Employee",schema);
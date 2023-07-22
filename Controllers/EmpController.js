const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
require("../Models/EmpModel");
require("../Models/BookModel");
require("../Models/member");
const EmpSchema=mongoose.model("Employees");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)


exports.getEmps=(request,response,next)=>{
   
        EmpSchema.find({})
        .then(data => {
            data.forEach(item => {
            console.log("image path:", item.image);
            });
            response.status(200).json(data);
        })
        .catch(error => {
            next(error);
        });
}

exports.searchForEmp = (request, response, next) => {
    const searchKey = request.body.searchKey?.toLowerCase();
    const firstName = request.body.firstName?.toLowerCase();
    const lastName = request.body.lastName?.toLowerCase();
  
    let searchCriteria = {};
  
    if (searchKey && searchKey !== "") {
      searchCriteria = {
        $or: [
           
          { firstName: { $regex: searchKey, $options: "i" } },
          { lastName: { $regex: searchKey, $options: "i" } },
        ],
      };
    } else if (firstName && firstName !== "" ) {
      searchCriteria = { firstName: { $regex: firstName, $options: "i" } };
    } else if (lastName && lastName !== "") {
      searchCriteria = { lastName: { $regex: lastName, $options: "i" } };
    }
  
    EmpSchema.find(searchCriteria)
      .then((data) => {
        if (data.length === 0) {
                    next(new Error("This employee is not found, Invalid Input"));
        } else {
          response.status(200).json({ data });
        }
      })
      .catch((error) => {
        next(error);
      });
  };

//Get a Specific Employee
exports.getOneEmp=(request,response,next)=>{
    EmpSchema.findOne({ _id: request.params._id})
         .then((data)=>{
                 response.status(200).json(data);
             })
         .catch(error=>{next(error);
         })
 }
 
exports.addEmp=async(request,response,next)=>{
    var hash = bcrypt.hashSync("new",salt);
    try
    {
        let data=await new EmpSchema({
                _id:request.body._id,
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                email:request.body.email,
                password:hash,
                birthdate:request.body.birthdate,
                hireDate:request.body.hireDate,
                image:request.body.image,
                salary:request.body.salary
        }).save();
        response.status(201).json({data});
    }catch(error)
    {
        next(error);
    }
}

exports.updateEmp=(request,response,next)=>{

    EmpSchema.updateOne({
        _id:request.params._id
    },{
        $set:{
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            password:request.body.password,
            birthdate:request.body.birthdate,
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("This employee is not found"));
        }
        else
            response.status(200).json(data);
    })
    .catch(error=>next(error));}
 
//Delete an Employee
exports.deleteEmp=(request,response,next)=>{
    EmpSchema.deleteOne({
		_id: request.params._id,
	}).then(data=> {
        if(data.deletedCount==0){
            next(new Error("This Employee is not found!"));
        }
        else{
            response.status(200).json({data:"Deleted!"}),
            next();
        }
        }).catch(error=>next(error));
}

//First Login
exports.updatefirstLogin=(request,response,next)=>{
    strpass=request.body.password
    if((strpass).length > 8 ){
        var hash = bcrypt.hashSync(request.body.password,salt);
    EmpSchema.updateOne({
        _id:request.params._id
    },{
        $set:{
            password:hash,
        }
    }).then((data)=>{
        if(data.modifiedCount != 0)
        {
            response.status(200).json(data);
               console.log(data)
        }
        else
       {response.status(400).json(data);
               console.log(data)
    }

    })
    .catch(error=>next(error));
}else{
    response.status(404).json({data:"Enter the data"});     
}}

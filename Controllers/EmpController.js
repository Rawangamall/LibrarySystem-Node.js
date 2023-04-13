const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
require("../Models/EmpModel");
require("../Models/BookModel");
require("../Models/member");
const EmpSchema=mongoose.model("Employees");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)

//Get all employees
exports.getEmps=(request,response,next)=>{
    // if(request.password != "new"){
        EmpSchema.find({})
            .then((data)=>{
                    response.status(200).json(data);
                })
            .catch(error=>{
                next(error);
        })}
//     else{response.status(404).json({result:"Please update your profile data!! and login again"});}
// }

//Search for Employee
// exports.searchForEmp=(request,response,next)=>{
//     if(request.password != "new"){
//         const searchName = request.body.searchName?.toLowerCase();
//         const firstName = request.body.firstName?.toLowerCase();
//         const lastName = request.body.lastName?.toLowerCase();
//         EmpSchema.find({
//             $or: [
//               { firstName: searchName },
//               { lastName: searchName },
//               { firstName: firstName },
//               { lastName: lastName }
//             ],
//           })
//           .then(data=>{
//                 if(data=="")
//                 {
//                     next(new Error("This employee is not found, Invalid Input"));
//                 }
//                 else
//                     response.status(200).json({data});
//             })
//             .catch(error=>{next(error);
//             })}
//             else{response.status(404).json({result:"Please update your profile data!! and login again"});}
// }
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
    if(request.password != "new"){
    EmpSchema.findOne({ _id: request.params._id})
         .then((data)=>{
                 response.status(200).json(data);
             })
         .catch(error=>{next(error);
         })}
         else{response.status(404).json({result:"Please update your profile data!! and login again"});}
 }
 
//Post(Add) a new Employee
exports.addEmp=async(request,response,next)=>{
    // if(request.password != "new"){
    try
    {
        let data=await new EmpSchema({
                _id:request.body._id,
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                email:request.body.email,
                password:"new",
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
// }
    // else{response.status(404).json({result:"Please update your profile data!! and login again"});}
}

//Update(Put) an Employee
exports.updateEmp=(request,response,next)=>{
    // if(request.password != "new"){
    // if(request.role=="Employee"){
    EmpSchema.updateOne({
        _id:request.params._id
    },{
        $set:{
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            password:request.body.password,
            birthdate:request.body.birthdate,
            // image:request.body.image
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
    // else if (request.role=="Admin"||request.role=="BasicAdmin"){
    //     EmpSchema.updateOne({
    //         _id:request.params._id
    //     },{
    //         $set:{
    //             firstName:request.body.firstName,
    //             lastName:request.body.lastName,
    //             email:request.body.email,
    //             birthdate:request.body.birthdate,
    //             hireDate:request.body.hireDate,
    //             salary:request.body.salary
    //         }
    //     }).then(data=>{
    //         if(data.matchedCount==0)
    //         {
    //             next(new Error("This employee is not found"));
    //         }
    //         else
    //             response.status(200).json({data:"Updated!"});
    //     })
    //    .catch(error=>next(error));
    // }}
    // else{response.status(404).json({result:"Please update your profile data!! and login again"});}
// }

//Delete an Employee
exports.deleteEmp=(request,response,next)=>{
    if(request.password != "new"){
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
        }).catch(error=>next(error));}
        else{response.status(404).json({result:"Please update your profile data!! and login again"});}
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
            image:request.body.image,           
        }
    }).then((data)=>{
        if(data.modifiedCount != 0)
        {
            response.status(200).json(data);
               console.log(data)
        }
        else
       {response.status(200).json(data);
               console.log(data)
    }

    })
    .catch(error=>next(error));
}else{
    response.status(404).json({data:"Enter the data"});     
}}

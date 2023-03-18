const mongoose=require("mongoose");
require("../Models/EmpModel");
require("../Models/BookModel");
require("../Models/member");
const EmpSchema=mongoose.model("Employees");
const MemberSchema=mongoose.model("member");
const BookSchema=mongoose.model("Book");

//Get
exports.getEmps=(request,response,next)=>{
        //Get All Employees
        EmpSchema.find({})
            .then((data)=>{
                    response.status(200).json({data});
                })
            .catch(error=>{
                next(error);
        })
    }

exports.searchForEmp=(request,response,next)=>{
            //Search for Employee
            const searchName = request.body.searchName?.toLowerCase();
            const firstName = request.body.firstName?.toLowerCase();
            const lastName = request.body.lastName?.toLowerCase();
            EmpSchema.find({
                $or: [
                  { firstName: searchName },
                  { lastName: searchName },
                  { firstName: firstName },
                  { lastName: lastName }
                ],
              }
              )
              .then(data=>{
                    if(data=="")
                    {
                        next(new Error("This employee is not found, Invalid Input"));
                    }
                    else
                        response.status(200).json({data});
                })
                .catch(error=>{next(error);
                })
         }
//Get a Specific Employee
exports.getOneEmp=(request,response,next)=>{
    EmpSchema.findOne({ _id: request.params._id})
         .then((data)=>{
                 response.status(200).json({data});
             })
         .catch(error=>{next(error);
         })
 }
 

//Post(Add) a new Employee
exports.addEmp=async(request,response,next)=>{
    try
    {
        let data=await new EmpSchema({
                _id:request.body._id,
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                email:request.body.email,
                password:request.body.password,
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

//Update(Put) an Employee
exports.updateEmp=(request,response,next)=>{
    EmpSchema.updateOne({
        _id:request.params._id
    },{
        $set:{
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            password:request.body.password,
            birthdate:request.body.birthdate,
            image:request.body.image,
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("This employee is not found"));
        }
        else
            response.status(200).json({data:"Updated!"});
    })
    .catch(error=>next(error));
}

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


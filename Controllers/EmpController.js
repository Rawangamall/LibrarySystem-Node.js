const mongoose=require("mongoose");
require("../Models/EmpModel");
const EmpSchema=mongoose.model("Employees");
/////////////////
//Get All Employees
exports.getAllEmps=(request,response,next)=>{
    EmpSchema.find({})
        .then((data)=>{
                response.status(200).json({data});
            })
        .catch(error=>{
            next(error);
                })
}
//Post (Add) a new Member

exports.addEmp=async(request,response,next)=>{
    try
    {
        let data=await new EmpSchema({
                _id:request.body.id,
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
//Update (Put) a Teacher
exports.updateEmp=(request,response,next)=>{
    EmpSchema.updateOne({
        _id:request.body.id
    },{
        $set:{
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            //email:request.body.email,
            password:request.body.password,
            birthdate:request.body.birthdate,
            //hireDate:request.body.hireDate,
            image:request.body.image,
            //salary:request.body.salary
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
/*
//Delete a Teacher
exports.deleteTeacher=(request,response,next)=>{
    TeacherSchema.deleteOne({
		_id: request.body.id,
	}).then(data=> {
        if(data.deletedCount==0){
            next(new Error("Teacher is not found!"));
        }
        else{
            response.status(200).json({data:"deleted"});}
        }).catch(error=>next(error));
}
*/
//Get a Specific Teacher
exports.getOneEmp=(request,response,next)=>{
   EmpSchema.findOne({ _id: request.params.id})
        .then((data)=>{
                response.status(200).json({data});
            })
        .catch(error=>{next(error);
        })
}
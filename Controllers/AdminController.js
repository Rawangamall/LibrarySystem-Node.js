const mongoose=require("mongoose");
require("./../Models/AdminModel");

const AdminSchema =mongoose.model("Admin");



exports.getAllAdmins=(request,response,next)=>{
    if (Object.keys(request.body).length==""){
        AdminSchema.find({})
            .then((data)=>{
                    response.status(200).json({data});
                })
            .catch(error=>{
                next(error);
        })
    }
    else{
        //Search for Admin
            const searchName = request.body.searchName;
            const firstName = request.body.firstName;
            const lastName = request.body.lastName;
            AdminSchema.find({
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
                        next(new Error("This Admin is not found, Invalid Input"));
                    }
                    else
                        response.status(200).json({data});
                })
                .catch(error=>{next(error);
                })
         }
    }







// exports.getAllAdmins=(request,response,next)=>{

            //AdminSchema.find({})
//                     .then((data)=>{
//                             response.status(200).json({data});
//                     })
//                     .catch(error=>{
//                         next(error);
//                     })
// }


exports.addAdmin=async(request,response,next)=>{
    
    try
    {
        console.log(request.body);
        console.log(request.file);
        let data=await new AdminSchema({
            _id:request.body._id,
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            email:request.body.email,
            password:request.body.password,
            // birthdate:request.body.birthdate,
            hireDate:request.body.hireDate,
            image:request.body.image,
            salary:request.body.salary,
            Role:request.body.Role,
               }).save(); 
        response.status(201).json(data);
    
    }catch(error)
    {
        next(error);
    }
}

exports.updateAdmin=(request,response,next)=>{
    AdminSchema.updateOne({
        _id:request.body._id
    },{
        $set:{
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            password:request.body.password,
            image:request.body.image,
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("Admin not found"));
        }
        else
        response.status(200).json({data:"updated"});
    })
    .catch(error=>next(error));
    
}

exports.deleteAdmin = (request, response, next)=>{
	AdminSchema.deleteOne({
		_id: request.params._id,
	}).then(data=>{
        if(data.deletedCount==0)
        {
            next(new Error("Admin not found"));
        }
        else
        response.status(200).json({data:"deleted"}),
        next();
    })
    .catch(error=>next(error));
}
    

exports.getAdmin=(request,response)=>{
    AdminSchema.findOne({
		_id: request.params._id,
	}).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("Admin not found"));
        }
        else
        response.status(200).json({data:"deleted"});
    })
    .catch(error=>next(error));
}


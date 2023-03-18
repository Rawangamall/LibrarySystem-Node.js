const mongoose=require("mongoose");
require("./../Models/AdminModel");
require("../Models/BookOperationModel");
const BookOperationSchema =mongoose.model("BookOperation");
const AdminSchema =mongoose.model("Admin");
require("../Models/EmpModel");
require("../Models/member");
require("../Models/BookModel");
let BookSchema=mongoose.model("Book");
let EmpSchema=mongoose.model("Employees");
let MemberSchema=mongoose.model("member");
const { writeFile } = require('fs');
const path = './Monthly Report.json';

exports.getAllAdmins=(request,response,next)=>{
        AdminSchema.find({})
            .then((data)=>{
                    response.status(200).json({data});
                })
            .catch(error=>{
                next(error);
        })
}

exports.searchForAdmin=(request,response,next)=>{
        //Search for Admin
        const searchName = request.body.searchName?.toLowerCase();
        const firstName = request.body.firstName?.toLowerCase();
        const lastName = request.body.lastName?.toLowerCase();
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
        _id:request.params._id
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
    

exports.getAdmin=(request,response,next)=>{
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

exports.report=(request,response,next)=>{
    //report for the last month
    BookOperationSchema.find({startDate:{$gte: new Date().getTime()-(30*24*60*60*1000)}})
        .then((data)=>{
            EmpSchema.find({hireDate:{$gte: new Date().getTime()-(30*24*60*60*1000)}})
            .then((data2)=>{
                MemberSchema.find({createdAt:{$gte: new Date().getTime()-(30*24*60*60*1000)}})
                        .then((data3)=>{
                            AdminSchema.find({hireDate:{$gte: new Date().getTime()-(30*24*60*60*1000)}})
                                .then((data4)=>{
                                    BookSchema.find({createdAt:{$gte: new Date().getTime()-(30*24*60*60*1000)}})
                                        .then((data5)=>{
                                            writeFile(path, JSON.stringify({"New Employees":data,"New Operations":data2,"New Members":data3,"New Admins":data4,"New Books":data5}, null, 2), (error) => {
                                                if (error) {
                                                  console.log('An error has occurred ', error);
                                                  return;
                                                }
                                                console.log('Data written successfully to disk');
                                              });
                                            response.status(200).send({Section1:"New Employees",data2,Section2:"New Operations",data,Section3:"New Members",data3,Section4:"New Admins",data4,Section5:"New Books",data5});
                                            })
                                        .catch(error=>{
                                            next(error);
                                        })
                                    })
                                .catch(error=>{
                                    next(error);
                                })
                        })
                        .catch(error=>{
                            next(error);
                        })
                })
            .catch(error=>{
                next(error);
            })
            })
        .catch(error=>{
            next(error);
        }) 
}
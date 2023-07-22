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

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)

//Get BasicAdmins
exports.getAllBasicAdmins=(request,response,next)=>{
    AdminSchema.find({"Role":{$eq:"BasicAdmin"}})
        .then((data)=>{
                response.status(200).json(data);
            })
        .catch(error=>{
            next(error);
    })
}
//GetAdmins
exports.getAllAdmins=(request,response,next)=>{
    AdminSchema.find({"Role":{$eq:"Admin"}})
        .then((data)=>{
                response.status(200).json(data);
            })
        .catch(error=>{
            next(error);
    })
}

//Get All Admins(Admin , BasicAdmin, Owner)
exports.getAllKindsAdmins=(request,response,next)=>{
    AdminSchema.find({})
        .then((data)=>{
                response.status(200).json(data);
            })
        .catch(error=>{
            next(error);
    })
}
       
//search
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
                    next(new Error(" not found, Invalid Input"));
                }
                else
                    response.status(200).json({data});
            })
            .catch(error=>{next(error);
            })
     }


//Add
exports.addAdmins=async(request,response,next)=>{
    var hash = bcrypt.hashSync("new",salt);

    try
    {
        console.log(request.body);
        //console.log(request.file);
        let data=await new AdminSchema({
            _id:request.body._id,
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            email:request.body.email,
            password:hash,
            birthdate:request.body.birthdate,
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

//update Owner
exports.updateOwner=(request,response,next)=>{

            AdminSchema.updateOne({ _id:request.params._id ,"Role":{$eq:"Owner"}}
            ,{
               
                $set:{
                    firstName:request.body.firstName,
                    lastName:request.body.lastName,
                    password:request.body.password,
                    image:request.body.image,
                }
            }).then(data=>{
                if(data.matchedCount==0)
                {
                    next(new Error("owner not found"));
                }
                else
                response.status(200).json({data:"updated"});
            })
            .catch(error=>next(error));

}

//Update Basic Admin
exports.updateBasicAdmin=(request,response,next)=>{

   if(request.role=="BasicAdmin"){
            AdminSchema.updateOne({ _id:request.params._id ,"Role":{$eq:"BasicAdmin"}}
            ,{
               
                $set:{
                    firstName:request.body.firstName,
                    lastName:request.body.lastName,
                    password:request.body.password,
                    image:request.body.image,
                }
            }).then(data=>{
                if(data.matchedCount==0)
                {
                    next(new Error("BasicAdmin not found"));
                }
                else
                response.status(200).json({data:"updated"});
            })
            .catch(error=>next(error));
        
    }
   else if (request.role=="Owner"){

    AdminSchema.updateOne({ _id:request.params._id ,"Role":{$eq:"BasicAdmin"}}
    ,{
       
        $set:{
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                email:request.body.email,
                birthdate:request.body.birthdate,
                hireDate:request.body.hireDate,
                image:request.body.image,
                salary:request.body.salary
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("BasicAdmin not found"));
        }
        else
        response.status(200).json({data:"updated"});
    })
    .catch(error=>next(error));
}
}

//update Admin
exports.updateAdmin=(request,response,next)=>{

            AdminSchema.updateOne({ _id:request.params._id ,"Role":{$eq:"Admin"}}
            ,{
               
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


//First Login
exports.updatefirstLogin=(request,response,next)=>{
    strpass=request.body.password
    if((strpass).length > 8 ){
        var hash = bcrypt.hashSync(request.body.password,salt);
    AdminSchema.updateOne({
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
}
}

//Delete Basic Admin
exports.deleteBasicAdmin=(request,response,next)=>{
       if(request.params._id!=0){
    AdminSchema.findOne({_id: request.params._id,"Role":{$eq:"BasicAdmin"}}).then(data=>{
        if(data==null)
        {
            next(new Error("BasicAdmin not found"));
        }
        else
        AdminSchema.deleteOne({
            _id: request.params._id,
        }).then(data=>{
            if(data.deletedCount==0)
            {
                next(new Error("BasicAdmin not found"));
            }
            else
            response.status(200).json({data:"deleted"}),
            next();
        })
        .catch(error=>next(error));
        
    })
    .catch(error=>next(error));
}else{
   response.status(404).json({result:"Premission Denied"})
}
}

//Delete Admin
exports.deleteAdmin=(request,response,next)=>{
    
        if(request.role=="Owner" || request.role=="BasicAdmin"){
    AdminSchema.findOne({_id: request.params._id,"Role":{$eq:"Admin"}}).then(data=>{
        if(data==null)
        {
            next(new Error("Admin not found"));
        }
        else
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
        
    })
    .catch(error=>next(error));
}else{
    response.status(404).json({result:"Premission Denied"})
}

}

//Get one Owner
exports.getOwner=(request,response,next)=>{
    AdminSchema.findOne({_id: request.params._id,"Role":{$eq:"Owner"}}).then(data=>{
        if(data.matchedCount==0)
       {
           next(new Error("owner not found"));
       }
       else{
       
           AdminSchema.findOne({ _id:request.params._id})
           .then(data=>{
           response.status(200).json(data);
           })
           .catch(error=>next(error));
       }
   })
   .catch(error=>next(error));
}





//Get One BasicAdmin
exports.getBasicAdmin=(request,response,next)=>{

    AdminSchema.findOne({_id: request.params._id,"Role":{$eq:"BasicAdmin"}}).then(data=>{
        if(data.matchedCount==0)
       {
           next(new Error("BasicAdmin not found"));
       }
       else{
       
           AdminSchema.findOne({ _id:request.params._id})
           .then(data=>{
           response.status(200).json(data);
           })
           .catch(error=>next(error));
       }
   })
   .catch(error=>next(error));
}

//Get one Admin
exports.getAdmin=(request,response,next)=>{

    AdminSchema.findOne({_id: request.params._id,"Role":{$eq:"Admin"}}).then(data=>{
        if(data.matchedCount==0)
       {
           next(new Error("Admin not found"));
       }
       else{
       
           AdminSchema.findOne({ _id:request.params._id})
           .then(data=>{
           response.status(200).json(data);
           })
           .catch(error=>next(error));
       }
   })
   .catch(error=>next(error));
}



exports.report=(request,response,next)=>{

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
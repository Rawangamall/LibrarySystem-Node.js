const mongoose=require("mongoose");
require("./../Models/member");
const MemberSchema=mongoose.model("member");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)



exports.getAll=(request,response)=>{
    MemberSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}

exports.addMember=(request,response,next)=>{
    if(request.body.password != null){
        var hash = bcrypt.hashSync(request.body.password,salt);
      }
      console.log("hii");
 new MemberSchema({
    _id:request.body.id,
    fullName:request.body.fullName,
    email:request.body.email,
    password:hash,
    image:request.body.image,
    phoneNumber:request.body.phoneNumber,
    birthdate:request.body.birthdate,
    fullAddress:request.body.fullAddress
   }).save()
    .then((data)=>{
        console.log("hii");
        response.status(201).json({data});
    })
    .catch(error=>{
    next(error);
    })
}

exports.updateMember=(request,response,next)=>{
    if(request.body.password != null){
        var hash = bcrypt.hashSync(request.body.password,salt);
      }
    console.log(request.params._id);
    MemberSchema.updateOne({
        _id:request.params._id
    },{
        $set:{
            fullName:request.body.fullName,
            password:hash,
            image:request.body.image,
            phoneNumber:request.body.phoneNumber,
            birthdate:request.body.birthdate,
            fullAddress:request.body.fullAddress
        }
    }).then(data=>{
        if(data.acknowledged==false)
        {
            console.log(request.body._id);
            next(new Error("child not found"));
        }
        else
        response.status(200).json(data);
    })
    .catch(error=>next(error));
}
exports.deleteMember=(request,response)=>{
    MemberSchema
    .deleteOne({_id:request.params._id})
    .then((result)=>{
        if(result.deletedCount !=0 ){
            response.status(200).json({data:"delete"});
        }
        else
        {   response.status(404).json({data:"delete Not Found"});}
    })
    .catch(error=>next(error));
}

exports.getMember=(request,response)=>{
    MemberSchema.findOne({_id:request.params._id})
    .then((result)=>{
        if(result != null)
        {
            response.status(200).json({result});
        }
        else{
            response.status(404).json({data:"Not Found"});
        }
    })
    .catch(error=>{
        next(error);
    })
}
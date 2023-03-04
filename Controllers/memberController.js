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
 new MemberSchema({
    _id:request.body._id,
    fullName:request.body.fullName,
    email:request.body.email,
    password:hash,
    image:request.body.image,
    phoneNumber:request.body.phoneNumber,
    birthdate:request.body.birthdate,
    fullAddress:request.body.fullAddress,
    borrowOper:request.body.borrowOper
   
   }).save()
    .then((data)=>{
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
            fullAddress:request.body.fullAddress,
            borrowOper:request.body.borrowOper
        }
    }).then(data=>{
        if(data.acknowledged==false)
        {
            console.log(request.body._id);
            next(new Error("member not found"));
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
            response.status(200).json({data:"deleted"});
        }
        else
        {   response.status(404).json({data:"delete Not Found"});}
    })
    .catch(error=>next(error));
}

exports.getMember=(request,response,next)=>{
    MemberSchema.findOne({_id:request.params._id})
    .then((result)=>{
        if(result != null)
        {
            console.log(result.borrowOper)
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

exports.addBorrowbook=(request,response,next)=>{
    MemberSchema.findOne({_id:request.params._id})
    .then((result)=>{
        if(result != null)
        {
         
                MemberSchema.updateOne(
              { _id: request.params._id },
              { $push: { borrowOper: request.body } },
              (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(result);
                }
              }
            );
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
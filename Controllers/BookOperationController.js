const mongoose=require("mongoose");
require("./../Models/member");
require("../Models/BookModel");
require("../Models/BookOperationModel");

const MemberSchema=mongoose.model("member");
const BookSchema=mongoose.model("Book");
const BookOperationSchema=mongoose.model("BookOperation");


exports.getAll=(request,response)=>{
    BookOperationSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
                    })
                    .catch(error=>{
                        next(error);
                    })
}


exports.addBookOperation=(request,response,next)=>{
   
 new BookOperationSchema({
    _id:request.body._id,
    operation:request.body.operation,
    memberID:request.body.memberID,
    bookID:request.body.bookID,
    employeeID:request.body.employeeID,
    expireDate:request.body.expireDate,
    returned:request.body.returned,
  
   
   }).save()
    .then((data)=>{
        response.status(201).json({data});
    })
    .catch(error=>{
    next(error);
    })
}

exports.updateBookOperation=(request,response,next)=>{
    
    BookOperationSchema.updateOne({
        _id:request.params._id
    },{
        $set:{
            operation:request.body.operation,
            memberID:request.body.memberID,
            bookID:request.body.bookID,
            employeeID:request.body.employeeID,
            expireDate:request.body.expireDate,
            returned:request.body.returned,         
        }
    }).then(data=>{
        if(data.acknowledged==false)
        {
        
            next(new Error("bookOperation not found"));
        }
        else
        response.status(200).json(data);
    })
    .catch(error=>next(error));
}

exports.deleteBookOperation=(request,response)=>{
    BookOperationSchema.deleteOne({_id:request.params._id})
    .then((result)=>{
        if(result.deletedCount !=0 ){
            response.status(200).json({data:"deleted"});
        }
        else
        {   response.status(404).json({data:"delete Not Found"});}
    })
    .catch(error=>next(error));
}

exports.getBookOperation=(request,response,next)=>{
    BookOperationSchema.findOne({_id:request.params._id})
    .then((result)=>{
        if(result != null)
        {
            response.status(200).json({result});
        }
        else{
            response.status(404).json({result:"Not Found"});
        }
    })
    .catch(error=>{
        next(error);
    })
}
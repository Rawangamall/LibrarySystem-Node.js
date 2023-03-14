const mongoose=require("mongoose");
require("../Models/EmpModel");
require("../Models/BookModel");
require("../Models/member");
require("../Models/BookOperationModel");
const EmpSchema=mongoose.model("Employees");
const MemberSchema=mongoose.model("member");
const BookSchema=mongoose.model("Book");
const BookOperationSchema=mongoose.model("BookOperation");

exports.addBorrowbook=(request,response,next)=>{
    MemberSchema.findOne({_id:request.params._id})
    .then((result)=>{
        if(result != null )
        {
        BookSchema.findOneAndUpdate({_id:request.body.bookID}, {$inc : {'noBorrowed' : 1}}).then((res)=>{
            if(res!=null){
                console.log(res.noBorrowed);
        new BookOperationSchema({
            operation:"borrow",
            returned:false,
            memberID:request.params.memberID,
            employeeID:request.body.employeeID,
            bookID:request.body.bookID,
            startDate:Date(),
            expireDate:request.body.expireDate,   //after 2 weeks
        }).save()
        .then((data)=>{
            response.status(200).json({data});
        })
        .catch(error=>{
        next(error);
        })
        }   
        else{response.status(404).json({data:"This Book is not Found"});}      
    })
    }
    else{
    response.status(404).json({data:"This member is not Found"});
    }
    })
    .catch(error=>{
    next(error);
    })
    }

exports.addReadbook=(request,response,next)=>{
    MemberSchema.findOne({_id:request.params._id})
    .then((result)=>{
        if(result != null )
        {
        BookSchema.findOneAndUpdate({_id:request.body.bookID}, {$inc : {'noReading' : 1}}).then((res)=>{
            if(res!=null){
                console.log(res.noBorrowed);
        new BookOperationSchema({
            operation:"read",
            returned:false,
            memberID:request.params.memberID,
            employeeID:request.body.employeeID,
            bookID:request.body.bookID,
            startDate:Date(),
            expireDate:request.body.expireDate,   //after 24 hours
        }).save()
        .then((data)=>{
            response.status(200).json({data});
        })
        .catch(error=>{
        next(error);
        })
        }   
        else{response.status(404).json({data:"This Book is not Found"});}      
    })
    }
    else{
    response.status(404).json({data:"This member is not Found"});
    }
    })
    .catch(error=>{
    next(error);
    })
    }


exports.returnBook=(request,response,next)=>{
    BookOperationSchema.updateOne({ "_id" : request.params._id} ,{
        $set:{ "returned" : request.body.returned}
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("This borrow operation is not found"));
        }
        else{
            console.log(request.body.returned);
            response.status(200).json({data:"Updated!"});
        }
    })
    .catch(error=>next(error));
}
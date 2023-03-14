const mongoose=require("mongoose");
require("./../Models/member");
require("../Models/BookModel");
require("../Models/EmpModel");
require("../Models/BookOperationModel");

const EmpSchema=mongoose.model("Employees");
const MemberSchema=mongoose.model("member");
const BookSchema=mongoose.model("Book");
const BookOperationSchema=mongoose.model("BookOperation");


exports.getOperations=(request,response,next)=>{
        //Get All Books
        BookOperationSchema.find({})
            .then((data)=>{
                    response.status(200).json({data});
                })
            .catch(error=>{
                next(error);
        })         
    }

exports.getAll=(request,response)=>{
    BookOperationSchema.find({})
                    .then((data)=>{
                            response.status(200).json({data});
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

    exports.borrowBYdate=async(request,response,next)=>{
        date = new Date();
        const searchbyMonth = request.body.searchbyMonth
        const searchbyYear= request.body.searchbyYear
       try{ 
        if(searchbyMonth != null && searchbyYear != null){
        searchDate=new Date(`${searchbyYear}-${searchbyMonth}-2`).toISOString().split('T')[0]
        EndDate=new Date(`${searchbyYear}-${searchbyMonth+1}-2`).toISOString().split('T')[0]
                  
         let BorrowedBooks_ByDate = await BookOperationSchema.find(
            {"startDate":{$gte:searchDate,$lt:EndDate},"operation":{$eq:"borrow"}})
            response.status(200).json({BorrowedBooks_ByDate});
         }else{
        CurrentMonth = new Date().toISOString().split('T')[0]
            let BorrowedBooks_CurrentMonth = await BookOperationSchema.find(
            {"startDate":{$gte:CurrentMonth},"operation":{$eq:"borrow"}})
            response.status(200).json({BorrowedBooks_CurrentMonth});
            }
        }catch(error)
        {
            next(error);
        }
    }

    exports.readingBYdate=async(request,response,next)=>{
        date = new Date();
        const Month = request.body.searchbyMonth
        let searchbyMonth = Number(Month);
        const searchbyYear= request.body.searchbyYear
       try{ 
        if(searchbyMonth != null && searchbyYear != null){
        searchDate=new Date(`${searchbyYear}-${searchbyMonth}-2`).toISOString().split('T')[0]
        EndDate=new Date(`${searchbyYear}-${searchbyMonth+1}-2`).toISOString().split('T')[0]
           
         let ReadBooks_ByDate = await BookOperationSchema.find(
            {"startDate":{$gte:searchDate,$lt:EndDate},"operation":{$eq:"read"}})
            response.status(200).json({ReadBooks_ByDate});
         }else{
        CurrentMonth = new Date().toISOString().split('T')[0]
            let ReadBooks_CurrentMonth = await BookOperationSchema.find(
            {"startDate":{$gte:CurrentMonth},"operation":{$eq:"read"}})
            response.status(200).json({ReadBooks_CurrentMonth});
            }
        }catch(error)
        {
            next(error);
        }
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
        
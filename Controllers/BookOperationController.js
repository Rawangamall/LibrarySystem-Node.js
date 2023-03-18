const mongoose=require("mongoose");
require("./../Models/member");
require("../Models/BookModel");
require("../Models/EmpModel");
require("../Models/BookOperationModel");

const EmpSchema=mongoose.model("Employees");
const MemberSchema=mongoose.model("member");
const BookSchema=mongoose.model("Book");
const BookOperationSchema=mongoose.model("BookOperation");


exports.addBorrowbook=(request,response,next)=>{
    MemberSchema.findOne({_id:request.body.memberID})
    .then((result)=>{
        if(result != null )
        {
            BookSchema.findOne({_id:request.params._id})
            .then((res)=>{
                if(res!=null){
                    if(res.available){
                      BookOperationSchema.find({ memberID:request.body.memberID,bookID:request.params._id,"returned":{$eq:false}}).then((check)=>{
                            console.log(check)
                            if(check == ""){
                                BookSchema.findOneAndUpdate({_id:request.params._id}, {$inc : {'noOfCurrentBorrowed' : 1,'noBorrowed' : 1}})
                                .then((res)=>{
                                    console.log("aaaaaaaaaaaaaaa",request._id);
                                    new BookOperationSchema({
                                    operation:"borrow",
                                    returned:false,
                                    memberID:request.body.memberID,
                                    employeeEmail:request.email,
                                    bookID:request.params._id,
                                    startDate:Date(),
                                    expireDate:new Date(new Date().getTime()+(14*24*60*60*1000)),
                                    late:"Not late"
                            }).save()
                        .then((data)=>{
                                //show if available or not
                                   BookSchema.updateMany({},
                                   [{ $set: { available: { $lt: [{$subtract: [ { $sum: ['$noOfCurrentReading', '$noOfCurrentBorrowed'] },"$noOfCopies" ]},0] } } }])
                                   .then(result=>{response.status(200).json({result})})
                                .catch(error=>next(error))
                       
                            response.status(200).json({data});
                        })
                    })
                            }else{response.status(404).json({data:"This Book is already borrowed!"});}
                        })
}
        else{response.status(404).json({data:"This Book is not Available"});}
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
        MemberSchema.findOne({_id:request.body.memberID})
        .then((result)=>{
            if(result != null )
            {
                BookSchema.findOne({_id:request.params._id})
                .then((res)=>{            
                    if(res!=null){
                        if(res.available){
                            BookSchema.findOneAndUpdate({_id:request.params._id}, {$inc : {'noOfCurrentReading' : 1,'noReading' : 0}})
                            .then((res)=>{
                                new BookOperationSchema({
                                operation:"read",
                                returned:false,
                                memberID:request.body.memberID,
                                employeeEmail:request.email,
                                bookID:request.params._id,
                                startDate:Date(),
                                expireDate:new Date(new Date().getTime()+(1*24*60*60*1000)),
            }).save()
            .then((data)=>{
                    //show if available or not
                       BookSchema.updateMany({},
                       [{ $set: { available: { $lt: [{$subtract: [ { $sum: ['$noOfCurrentReading', '$noOfCurrentBorrowed'] },"$noOfCopies" ]},0] } } }])
                       .then(result=>{response.status(200).json({result})})
                    .catch(error=>next(error))
           
                response.status(200).json({data});
            })
            .catch(error=>{
            next(error);
            })})}
            else{response.status(404).json({data:"This Book is not Avilable"});}
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
                       
exports.getAll=(request,response)=>{
    BookOperationSchema.find({})
                    .then((data)=>{        
                        //member exceeds the return date of borrowed books
                        BookOperationSchema.updateMany({expireDate: { $lt: new Date()},operation:"borrow",returned:false}, [{ $set: { late: "Late: This book isn't returned yet"}}])
                        .then(data=>{console.log("done")}).catch(error=>next(error));  

                        response.status(200).json({data});
                        })
                    .catch(error=>{
                        next(error);
                    })
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


  
   
exports.borrowBYdate=async(request,response,next)=>{
        date = new Date();
        const Month = request.body.searchbyMonth
        let searchbyMonth = Number(Month)
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


//g  borrowedbooks with employee responsible for borrowing
exports.borrowInfo=(request,response,next)=>{
    strID = request.params._id
    NumID=Number(strID)

    BookOperationSchema.aggregate( [
        {$match: {memberID:NumID, operation:"borrow"}},
                 {
          $lookup: {
                      from: 'books',
                      localField: 'bookID',
                      foreignField: '_id',
                      as: 'book'
                    }    
                  }
                  ,
                  {
          $lookup: {
                    from: 'employees',
                    localField: 'employeeEmail',
                    foreignField: 'email',
                    as: 'emp'
                 }    
                }
                  ,  
              {
                $project: { 
                          _id:0,
                          EmployeName: "$emp.firstName",
                          BookTitle: "$book.title"
                 }
              }
      ]).then(borrowedBook=>{
     if(borrowedBook != "")
{       
     response.status(200).json({borrowedBook});
}else{response.status(404).json({borrowedBook:"Borrowed Books Not Found"});}
    })
    .catch(error=>next(error));
}

    
exports.returnBorrowBook=(request,response,next)=>{
    BookOperationSchema.findOneAndUpdate({ "_id" : request.params._id} ,{
        $set:{ "returned" : true}
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("This Borrow operation is not found"));
        }
        else{
            BookSchema.findOneAndUpdate({_id:data.bookID}, {$inc : {'noOfCurrentBorrowed' : -1}}).then((res)=>{
            //show if available or not
            BookSchema.updateMany({},
            [{ $set: { available: { $lt: [{$subtract: [ { $sum: ['$noOfCurrentReading', '$noOfCurrentBorrowed'] },"$noOfCopies" ]},0] } } }])
            .then(result=>{console.log(available),response.status(200).json({result})})
             .catch(error=>next(error))
            console.log(request.body.returned);
            response.status(200).json({data:"Updated!"});
        })}
    })
    .catch(error=>next(error));
}

 exports.returnReadBook=(request,response,next)=>{
        BookOperationSchema.findOneAndUpdate({ "_id" : request.params._id} ,{
            $set:{ "returned" : true}
        }).then(data=>{
            if(data.matchedCount==0)
            {
                next(new Error("This reading operation is not found"));
            }
            else{
                BookSchema.findOneAndUpdate({_id:data.bookID}, {$inc : {'noOfCurrentReading' : -1}}).then((res)=>{
                //show if available or not
                BookSchema.updateMany({},
                [{ $set: { available: { $lt: [{$subtract: [ { $sum: ['$noOfCurrentReading', '$noOfCurrentBorrowed'] },"$noOfCopies" ]},0] } } }])
                .then(result=>{console.log(available),response.status(200).json({result})})
                 .catch(error=>next(error))
                console.log(request.body.returned);
                response.status(200).json({data:"Updated!"});
            })}
        })
        .catch(error=>next(error));
    }
    

exports.mostreadingBooks=(request,response,next)=>{

    const PD = request.body.publishingDate;
    let searchbyYear;
    if(PD==null)
    {
        searchbyYear=new Date().getFullYear();   
    }
    else{ 
        searchbyYear = Number(PD);
    }
   
    BookOperationSchema.aggregate( [
      {$match: { operation:"read"}},
      {
        $lookup: {
                     from: 'books',
                     localField: 'bookID',
                     foreignField: '_id',
                     as: 'book'
                 }
     }, 
     { $unwind: "$book" },
     {
        $project: { 
                        _id:0,       
                        bookID: "$bookID" ,
                        book_title:"$book.title",
                        publishyear:{ $year:"$book.publishingDate"}
              }
     },
     {$match:  {publishyear:searchbyYear}},
              
    { $group: { _id: "$bookID", borrowCount: { $sum: 1 }  ,  book_title: { $push: "$book_title" } } },
    { $sort: { borrowCount: -1 } },
     { $limit: 5 },
     {
       $project: { 
                                     
                 book_title: { $first: "$book_title" },
                 
                }},
             
    ])
    
     .then(result => {
        response.status(200).json({result});
    }) .catch(error=>next(error));
}
         
        
    
    
exports.mostBorrowedBooks=(request,response,next)=>{
    
    const PD = request.body.publishingDate;
    let searchbyYear;
    if(PD==null)
    {
        searchbyYear=new Date().getFullYear();   
    }
    else{ 
        searchbyYear = Number(PD);
    }
    
    
    console.log(PD);
    BookOperationSchema.aggregate( [
      {$match: { operation:"borrow"}},
      {
        $lookup: {
                     from: 'books',
                     localField: 'bookID',
                     foreignField: '_id',
                     as: 'book'
                 }
     }, 
     { $unwind: "$book" },
     {
        $project: { 
                        _id:0,       
                        bookID: "$bookID" ,
                        book_title:"$book.title",
                        publishyear:{ $year:"$book.publishingDate"}
              }
     },
     {$match:  {publishyear:searchbyYear}},
              
    { $group: { _id: "$bookID", borrowCount: { $sum: 1 }  ,  book_title: { $push: "$book_title" } } },
    { $sort: { borrowCount: -1 } },
     { $limit: 5 },
     {
       $project: { 
                                     
                 book_title: { $first: "$book_title" },
                 
                }},
    ])
     .then(result => {
        response.status(200).json({result});
    }) .catch(error=>next(error));
}
     
    
exports.makeSureOfReturnedRead=(request,response,next)=>{
    //make sure that book is returned before the end of the day
    BookOperationSchema.updateMany({
        expireDate: { $lt: new Date()},operation:"read",returned:false}, 
        [{ $set: { returned: true}}])
    .then(data=>{
        if(data.matchedCount!=0)
            response.status(200).json({data:"All read books are returned successfully"});
        else
            response.status(200).json({data:"All read books are already returned!"});
        })
        .catch(error=>next(error));
}

const mongoose=require("mongoose");
require("./../Models/member");
require("../Models/BookModel");
require("../Models/AdminModel")
require("../Models/BookOperationModel");
const MemberSchema=mongoose.model("member");
const BookSchema=mongoose.model("Book");
const BookOperationSchema=mongoose.model("BookOperation");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)

exports.getAll=(request,response)=>{
    MemberSchema.find({})
                    .then((data)=>{
                       response.status(200).json(data);
                    })
                    .catch(error=>{
                        next(error);
                    })}


exports.searchForMember = (request, response, next) => {
    const searchKey = request.body.searchKey?.toLowerCase();
    const fullName = request.body.fullName?.toLowerCase();
    const email = request.body.email?.toLowerCase();
  
    let searchCriteria = {};
  
    if (searchKey && searchKey !== "") {
      searchCriteria = {
        $or: [
          { fullName: { $regex: searchKey, $options: "i" } },
          { email: { $regex: searchKey, $options: "i" } },
        ],
      };
    } else if (fullName && fullName !== "") {
      searchCriteria = { fullName: { $regex: fullName, $options: "i" } };
    } else if (email && email !== "") {
      searchCriteria = { email: { $regex: email, $options: "i" } };
    }
  
    MemberSchema.find(searchCriteria)
      .then((data) => {
        if (data.length === 0) {
          next(new Error("This Member is not found, Invalid Input"));
        } else {
          response.status(200).json({ data });
        }
      })
      .catch((error) => {
        next(error);
      });
  };

 
exports.addMember=(request,response,next)=>{
   
  var hash = bcrypt.hashSync("new",salt);

 new MemberSchema({
    _id:request.body._id,
    fullName:request.body.fullName,
    email:request.body.email,
    password:hash,
    phoneNumber:request.body.phoneNumber,
    birthdate:request.body.birthdate,
    fullAddress:request.body.fullAddress
   }).save()
    .then((data)=>{
        response.status(201).json({data});
    })
    .catch(error=>{
    next(error);
    })}


exports.updatefirstLogin=(request,response,next)=>{
    strpass=request.body.password
    if((strpass).length > 8 ){

  const hash = bcrypt.hashSync(request.body.password,salt);

    MemberSchema.updateOne({
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

exports.updateMember=(request,response,next)=>{

  if(request.role=="Employee" || request.role=="BasicAdmin"){

            MemberSchema.updateOne({
                _id:request.params._id
            },{
                $set:{
                    fullName:request.body.fullName,
                    email:request.body.email,
                    phoneNumber:request.body.phoneNumber,
                    birthdate:request.body.birthdate,
                    fullAddress:request.body.fullAddress  
                }
            }).then((data)=>{
                if(data == null)
                {
                    next(new Error("member not found"));
                }
                else
        {        console.log(data);
        
                response.status(200).json(data);}
            })
            .catch(error=>next(error));
        }else if(request.role=="Member"){

          if(request.body.password != null  ){
        var hash = bcrypt.hashSync(request.body.password,salt);
      }

      MemberSchema.updateOne({
        _id:request.params._id
    },{
        $set:{
            fullName:request.body.fullName,
            password:hash,
            phoneNumber:request.body.phoneNumber,
            birthdate:request.body.birthdate,
            fullAddress:request.body.fullAddress
           
        }
    }).then((data)=>{
        if(data == null)
        {
            next(new Error("member not found"));
        }
        else{
        response.status(200).json(data);}
    })
    .catch(error=>next(error));
   }
}

//delete
exports.deleteMember=(request,response,next)=>{

      var out=[]
MemberSchema.findOne({_id:request.params._id}).then((check)=>{
   if(check != null){  

    //bookids which gonna be returned
    BookOperationSchema.find({memberID:request.params._id ,"returned":{$eq:false}})
    .then((ids)=>{
        ids.forEach(function(data){
            book_id=data.bookID
            out.push(book_id)})   
        })
        
    //returned
    BookOperationSchema.updateMany({memberID:request.params._id ,"returned":{$eq:false},"operation":{$eq:"borrow"}},{
        $set:{ "returned" : true}
          }).then((borrow)=>{
            if(borrow.modifiedCount != 0)
            {           
                JSON.parse(JSON.stringify(out)) 
                console.log(out)

             //increment returned borrowed books
            BookSchema.updateMany({_id:out},{$inc:{'noOfCurrentBorrowed': -1}}).then((increment)=>{
            }).catch(error=>next(error));
           }
        }).catch(error=>next(error));

            //read returned
    BookOperationSchema.updateMany({memberID:request.params._id ,"returned":{$eq:false},"operation":{$eq:"read"}},{
        $set:{ "returned" : true}
          }).then((borrow)=>{
            if(borrow.modifiedCount != 0)
            {           
                JSON.parse(JSON.stringify(out)) 
                console.log(out)
                
             //increment returned borrowed books
            BookSchema.updateMany({_id:out},{$inc:{'noOfCurrentBorrowed': -1}}).then((increment)=>{
            }).catch(error=>next(error));
           }
        }).catch(error=>next(error));

        //delete member
     MemberSchema.deleteOne({_id:request.params._id})
        .then((result)=>{
            if(result.deletedCount !=0 ){
                response.status(200).json({result:"deleted"});
            }
        }).catch(error=>next(error));

   }else{response.status(404).json({data:"Member Not Found"});}
    
});
}


exports.getMember=(request,response,next)=>{

    MemberSchema.findOne({_id:request.params._id})
    .then((result)=>{
        if(result != null)
        {
            response.status(200).json(result);
        }
        else{
            response.status(404).json({result:"Not Found"});
        }
    })
    .catch(error=>{
        next(error);
    })
}


exports.currentBorrowedBooks=(request,response,next)=>{

   strID=request.params._id;
   NumID=Number(strID);

   BookOperationSchema.aggregate( [
      {$match: {memberID:NumID , returned:false , operation:"borrow"}},

      { $group: { _id: "$bookID", 
                 noBorrowedTimes: { $sum: 1 }, 
                 BorrowedDate: { $push: "$startDate" } ,
                 expireDate: { $push: "$expireDate" },
                 currentDate: { $push:  new Date().toISOString()  },
                 } },
      {
        $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                  }
                },  
         { $unwind: "$book" },
            {
              $project: { 
                        _id:0,
                        book_title: "$book.title" ,
                        // expireDate:1,
                        noBorrowedTimes:1,
                        BorrowedDate:1,
                        // currentDate:1,
                        warning: {
                            $cond: {
                              if: {
                                $gt: [
                                  {
                                    $size: {
                                      $filter: {
                                        input: "$expireDate",
                                        as: "date",
                                        cond: { $gte: [ { $subtract: [ "$$date", new Date() ] }, 0 ] }
                                      }
                                    }
                                  },
                                  0
                                ]
                              },
                              then: null,
                              else: "Book is late!"
                            }
                          }
               }
            }
               
    ])
    
     .then(result => {
        response.status(200).json({result});
    }).catch(err => {
        console.log(err.message)
    }); 

}

//g for member => borrowedbooks with employee responsible for borrowing
exports.borrowInfoOneMember=(request,response,next)=>{
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

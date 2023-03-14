const mongoose=require("mongoose");
require("./../Models/member");
require("../Models/BookModel");
require("../Models/BookOperationModel");
const MemberSchema = mongoose.model("member");
const BookOperationSchema = mongoose.model("BookOperation");
const BookSchema = mongoose.model("Book");


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

exports.addOperation=(request,response,next)=>{

     new BookOperationSchema({
        _id:request.body._id,
    operation:request.body.operation,
    memberID:request.body.memberID,
    bookID:request.body.bookID,
    employeeID:request.body.employeeID,
    expireDate:request.body.expireDate,
    returned:request.body.returned   
       }).save()
        .then((data)=>{
            response.status(201).json({data});
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
                  console.log(EndDate)
                  console.log(searchDate)
         let BorrowedBooks_ByDate = await BookOperationSchema.find(
            {"startDate":{$gte:searchDate,$lt:EndDate},"operation":{$eq:"borrow"}})
            response.status(200).json({BorrowedBooks_ByDate});
         }else{
        CurrentMonth = new Date().toISOString().split('T')[0]
                    console.log(CurrentMonth)
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
        const searchbyMonth = request.body.searchbyMonth
        const searchbyYear= request.body.searchbyYear
       try{ 
        if(searchbyMonth != null && searchbyYear != null){
        searchDate=new Date(`${searchbyYear}-${searchbyMonth}-2`).toISOString().split('T')[0]
        EndDate=new Date(`${searchbyYear}-${searchbyMonth+1}-2`).toISOString().split('T')[0]
                  console.log(EndDate)
                  console.log(searchDate)
         let ReadBooks_ByDate = await BookOperationSchema.find(
            {"startDate":{$gte:searchDate,$lt:EndDate},"operation":{$eq:"read"}})
            response.status(200).json({ReadBooks_ByDate});
         }else{
        CurrentMonth = new Date().toISOString().split('T')[0]
                    console.log(CurrentMonth)
            let ReadBooks_CurrentMonth = await BookOperationSchema.find(
            {"startDate":{$gte:CurrentMonth},"operation":{$eq:"read"}})
            response.status(200).json({ReadBooks_CurrentMonth});
            }
        }catch(error)
        {
            next(error);
        }
    }
    
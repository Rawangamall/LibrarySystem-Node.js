const mongoose=require("mongoose");
require("../Models/BookModel");
require("../Models/member");
require("../Models/BookOperationModel");
const BookSchema=mongoose.model("Book");
const MemberSchema=mongoose.model("member");
const BookOperationSchema=mongoose.model("BookOperation");

//Get
exports.getBooks=(request,response,next)=>{
    if(request.password != "new"){
        //Get All Books
        BookSchema.find({})
             .then((data)=>{
                    response.status(200).json({data});
                })
            .catch(error=>{
                next(error);
        })}
        else{response.status(404).json({result:"Please update your profile data!! and login again"});}
    }

exports.searchForBook=(request,response,next)=>{
    if(request.password != "new"){
            //Search for Books
            const searchKey = request.body.searchKey?.toLowerCase();
            const publisher = request.body.publisher?.toLowerCase();
            const author = request.body.author?.toLowerCase();
            const title = request.body.title?.toLowerCase();
            BookSchema.find({
                $or: [
                  { publisher: searchKey },
                  { author: searchKey },
                  { title: searchKey },
                  { publisher: publisher },
                  { author: author },
                  { title: title }
                ],
                'noOfCopies': { $gt: 1 }                ////////////////////
              },{title:1,publisher:1,author:1,available:1,noBorrowed:1,noOfCurrentBorrowed:1,noOfCopies:1,availableCopies: { $subtract: ['$noOfCopies', '$noOfCurrentBorrowed'] } }
              )
              .then(data=>{
                    if(data=="")
                    {
                        next(new Error("This Book is not found, Invalid Input"));
                    }
                    else{
                        response.status(200).json({data})
                    }
                })
                .catch(error=>{next(error);
                })}
                else{response.status(404).json({result:"Please update your profile data!! and login again"});}
         }

//Get a Specific Book
exports.getOneBook=(request,response,next)=>{
    if(request.password != "new"){
    BookSchema.findOne({ _id: request.params.id})
         .then((data)=>{
                 response.status(200).json({data});
             })
         .catch(error=>{next(error);
         })}
         else{response.status(404).json({result:"Please update your profile data!! and login again"});}
 }
 
//Post(Add) a new Book
exports.addBook=async(request,response,next)=>{
    if(request.password != "new"){
    try
    {
        let data=await new BookSchema({
                _id:request.body.id,
                title:request.body.title,
                author:request.body.author,
                publisher:request.body.publisher,
                publishingDate:request.body.publishingDate,
                category:request.body.category,
                edition:request.body.edition,
                pages:request.body.pages,
                noOfCopies:request.body.noOfCopies,
                noOfCopies:request.body.noOfCopies,
                available:true,
                noBorrowed:request.body.noBorrowed,
                noOfCurrentBorrowed:request.body.noOfCurrentBorrowed,
                returned:true,
               }).save(); 
        response.status(201).json({data});
    }catch(error)
    {
        next(error);
    }}
    else{response.status(404).json({result:"Please update your profile data!! and login again"});}
}

//Update(Put) an Book
exports.updateBook=(request,response,next)=>{
    if(request.password != "new"){
    BookSchema.updateOne({
        _id:request.params.id
    },{
        $set:{
            title:request.body.title,
                author:request.body.author,
                publisher:request.body.publisher,
                publishingDate:request.body.publishingDate,
                category:request.body.category,
                edition:request.body.edition,
                pages:request.body.pages,
                noOfCopies:request.body.noOfCopies,
                //available:request.body.available,
                shelfNo:request.body.shelfNo
        }
    }).then(data=>{
        if(data.matchedCount==0)
        {
            next(new Error("This Book is not found"));
        }
        else
        response.status(200).json({data:"Updated!"});
    })
    .catch(error=>next(error));}
    else{response.status(404).json({result:"Please update your profile data!! and login again"});}
}

//Delete an Book
exports.deleteBook=(request,response,next)=>{
    if(request.password != "new"){
    BookSchema.deleteOne({
		_id: request.params.id,
	}).then(data=> {
        if(data.deletedCount==0){
            next(new Error("This Book is not found!"));
        }
        else{
            response.status(200).json({data:"Deleted!"})
        }
        }).catch(error=>next(error));}
        else{response.status(404).json({result:"Please update your profile data!! and login again"});}
}

//most borrowed book
exports.mostBorrowedBook=(request,response,next)=>{
    if(request.password != "new"){
    BookSchema.find().sort({noBorrowed:-1}).limit(1)
                .then(data=>{
                    response.status(200).json({data})
                })}
    else{response.status(404).json({result:"Please update your profile data!! and login again"});}
}

exports.getNewArrivedBooks=(request,response,next)=>{
    if(request.password != "new"){
    const endDate = new Date(); // current date and time
    const startDate = new Date(); 
    startDate.setDate(endDate.getMonth()-1);// one month  ago
      
BookSchema.find({ createdAt: { $gte: startDate, $lte: endDate } }, (err, result) => {

  if (err) {
    response.status(404).json({data:"Not Found"});
  }
  else{
    response.status(200).json({result});
  } 
});}
else{response.status(404).json({result:"Please update your profile data!! and login again"});}
}

//available books
exports.getAvailableBooks=(request,response,next)=>{
    if(request.password != "new"){
    BookSchema.find({"available" : true})
.then(data=>{
            response.status(200).json({data})
        }).catch(error=>next(error));}
        else{response.status(404).json({result:"Please update your profile data!! and login again"});}
}

//member filter books
exports.filteredbooks=(request,response,next)=>{
    if(request.password != "new"){
    if(request.body != null){
    const PD = request.body.publishingDate
    let searchbyYear = Number(PD);
    searchDate=new Date(`${searchbyYear}-1-2`).toISOString().split('T')[0]
    EndDate=new Date(`${searchbyYear+1}-1-2`).toISOString().split('T')[0]

            BookSchema.find({
                $or:[
                    { publisher: request.body.publisher },
                    { author: request.body.author },
                    { category: request.body.category },
                    { availability: request.body.availability },
                    {publishingDate:{$gte:searchDate,$lt:EndDate}}
                ] 
                }).then(Books=>{
                    response.status(200).json({Books});
                }).catch(error=>{next(error);})
            }}
            else{response.status(404).json({result:"Please update your profile data!! and login again"});}
 }

 
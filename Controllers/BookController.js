const mongoose=require("mongoose");
require("../Models/BookModel");
require("../Models/member");
require("../Models/BookOperationModel");
const BookSchema=mongoose.model("Book");

//Get All Books
exports.getBooks=(request,response,next)=>{

    BookSchema.find({})
             .then((data)=>{
                if(data.image){ data.image = 'http://localhost:8080/'+data.image}
                    response.status(200).json(data);
                })
            .catch(error=>{
                next(error);
        })
    }




    exports.searchForBook = (request, response, next) => {
            //Search for Books
            const searchKey = request.body.searchKey?.toLowerCase();
            const publisher = request.body.publisher?.toLowerCase();
            const author = request.body.author?.toLowerCase();
            const title = request.body.title?.toLowerCase();


        let searchCriteria = {};
      
        if (searchKey && searchKey !== "") {
          searchCriteria = {
            $or: [
              { title: { $regex: searchKey, $options: "i" } },
            ],
          };
        } else if (title && title !== "") {
          searchCriteria = { title: { $regex: title, $options: "i" } };
        } else if (publisher && publisher !== "") {
          searchCriteria = { publisher: { $regex: publisher, $options: "i" } };
        }else if (author && author !== "") {
            searchCriteria = { author: { $regex: author, $options: "i" } };
          }
      
          BookSchema.find(searchCriteria,{title:1,publisher:1,author:1,available:1,noBorrowed:1,noOfCurrentBorrowed:1,noOfCopies:1,availableCopies: { $subtract: ['$noOfCopies', '$noOfCurrentBorrowed'] } })
          .then((data) => {
            if (data.length === 0) {
              next(new Error("This Book is not found, Invalid Input"));
            } else {
              response.status(200).json({ data });
            }
          })
          .catch(error=>{next(error);
          })
   }

//Get a Specific Book by ID
exports.getOneBook=(request,response,next)=>{

    BookSchema.findOne({ _id: request.params.id})
         .then((data)=>{
                if(data.image) data.image = 'http://localhost:8000/'+data.image
                 response.status(200).json(data);
             })
         .catch(error=>{next(error);
         })}

 
//Post (Add) a new Book
exports.addBook=async(request,response,next)=>{

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
                // image:imgpath,
                noBorrowed:request.body.noBorrowed,
                noOfCurrentBorrowed:request.body.noOfCurrentBorrowed,
                returned:true,
               }).save(); 
        response.status(201).json(data);
    }catch(error)
    {
        next(error);
    }

}

//Update (Put) a Book
exports.updateBook=(request,response,next)=>{

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
    .catch(error=>next(error));

}

//Delete a Book
exports.deleteBook=(request,response,next)=>{

    BookSchema.deleteOne({
		_id: request.params.id,
	}).then(data=> {
        if(data.deletedCount==0){
            next(new Error("This Book is not found!"));
        }
        else{
            response.status(200).json({data:"Deleted!"})
        }
        }).catch(error=>next(error));
}


exports.getNewArrivedBooks=(request,response,next)=>{

    const endDate = new Date(); // current date and time
    const startDate = new Date(); 
    startDate.setDate(endDate.getDate()-14);// 2 weeks ago
      
BookSchema.find({ createdAt: { $gte: startDate, $lte: endDate } }, (err, result) => {

  if (err) {
    response.status(404).json({data:"Not Found"});
  }
  else{
    response.status(200).json(result);
  } 
})
}


//available books
exports.getAvailableBooks=(request,response,next)=>{
    BookSchema.find({"available" : true})
.then(data=>{
            response.status(200).json({data})
        }).catch(error=>next(error));
}

//member filter books
exports.filteredbooks=(request,response,next)=>{

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
            }
 }
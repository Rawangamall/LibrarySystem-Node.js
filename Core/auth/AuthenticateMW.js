const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
require("./../../Models/member");
const MemberSchema=mongoose.model("member");
require("./../../Models/EmpModel");
const EmpSchema=mongoose.model("Employees");

module.exports=(request,response,next)=>{
  try{
    let token=request.get("authorization").split(" ")[1];
    console.log(token,"yyyyyyyyyy");
    let decodedToken=jwt.verify(token,"OStrack");
    request.email=decodedToken.email;
    request.password=decodedToken.password;
    request.role=decodedToken.role;
    console.log(request.email);
    next();
  }
  catch(error){
        error.status=401;
        error.message="Not Authenticated";
        next(error);
  }
}
module.exports.checkBasicAdmin=(request,response,next)=>{
  if(request.role =="BasicAdmin"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);

  }
}
module.exports.checkBasicAdminAndAdmin=(request,response,next)=>{
  if(request.role =="BasicAdmin"||request.role =="Admin"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
  }
}

module.exports.checkBasicAdminAndEmp=(request,response,next)=>{
  console.log(request.role);
    if(request.role =="BasicAdmin" || request.role =="Employee"){
     
        next();
    }
    else if(request.role =="Employee" ){ // &&( request.params._id==data._id)
      next();
   }
    else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
  }
}
module.exports.checkBaAdminAndAdminAndEmp=(request,response,next)=>{

  if(request.role =="BasicAdmin"||request.role =="Admin" ||request.role =="Employee" ){
          next();
      }
      else{
            let error =new Error("Not Authorized");
            error.status=403;
            next(error);
            
        }

//   EmpSchema.findOne({email:`${request.email}`}).then((data)=>{
//   if(request.role =="BasicAdmin"||request.role =="Admin" ){
//       next();
//   }
//   else if(request.role =="Employee" &&( request.params._id==data._id) ){
//     next();
//  }
//   else{
//     let error =new Error("Not Authorized");
//     error.status=403;
//     next(error);
    
// }
// })
// .catch(error=>{
// next(error);
// })
}
module.exports.checkBaAdminAndMemberAndEmp=(request,response,next)=>{

  MemberSchema.findOne({email:`${request.email}`}).then((data)=>{
  
    if((request.role =="BasicAdmin" || request.role =="Employee")){
  
      next();
   }
   else if(request.role =="Member" &&( request.params._id==data._id) ){
      next();
   }
    else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
      
  }
})
.catch(error=>{
next(error);
})
 
}
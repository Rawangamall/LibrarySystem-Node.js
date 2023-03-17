const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
  try{
    let token=request.get("authorization").split(" ")[1];
    console.log(token);
    let decodedToken=jwt.verify(token,"OStrack");
    request.firstName=decodedToken.firstName;
    request.role=decodedToken.role;
    next();
  }
  catch(error){
        error.status=401;
        error.message="Not Authenticated";
        next(error);
  }
  

}
// module.exports.checkBasicAdmin=(request,response,next)=>{
//   if(request.role =="BasicAdmin"){
//       next();
//   }
//   else{
//       let error =new Error("Not Authorized");
//       error.status=403;
//       next(error);

//   }
// }
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
  if(request.role =="BasicAdmin"||request.role =="Employee"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
  }
}
module.exports.checkBaAdminAndAdminAndEmp=(request,response,next)=>{
  if(request.role =="BasicAdmin"||request.role =="Admin" || request.role =="Employee"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
   
  }
}
module.exports.checkBaAdminAndMemberAndEmp=(request,response,next)=>{
  if(request.role =="BasicAdmin"||request.role =="Member" || request.role =="Employee"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
  }
}
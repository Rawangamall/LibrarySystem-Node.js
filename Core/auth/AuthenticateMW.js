const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
require("./../../Models/member");
require("./../../Models/AdminModel");

const MemberSchema=mongoose.model("member");
const EmpSchema=mongoose.model("Employees");
const AdminSchema =mongoose.model("Admin");

module.exports=(request,response,next)=>{
  try{
    let token=request.get("authorization").split(" ")[1];
    
    let decodedToken=jwt.verify(token,"OStrack");
    request.email=decodedToken.email;
    request.password=decodedToken.password;
    request.role=decodedToken.role;
   
    next();
  }
  catch(error){
        error.status=401;
        error.message="Not Authenticated";
        next(error);
  }
}
module.exports.checkOwn=(request,response,next)=>{
  if(request.role =="Owner"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);

  }
}
module.exports.checkBasicAdmin=(request,response,next)=>{
  if(request.role =="BasicAdmin" || request.role =="Owner"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);

  }
}

module.exports.checkEmp=(request,response,next)=>{

  EmpSchema.findOne({email:`${request.email}`}).then((data)=>{
  
    if((request.role =="Employee" || request.role =="Owner")){
  
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

module.exports.checkBasicAdminAndAdminforAdmin=(request,response,next)=>{ 
  AdminSchema.findOne({email:`${request.email}`}).then((data)=>{
    if(request.role =="BasicAdmin"|| request.role =="Owner" ){
        next();
    }
    else if(request.role =="Admin" &&( request.params._id==data._id) ){
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
module.exports.checkBasicAdminAndAdmin=(request,response,next)=>{
  if(request.role =="BasicAdmin"||request.role =="Admin"|| request.role =="Owner"){
      next();
  }
  else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
  }
}
module.exports.checkMember=(request,response,next)=>{

  MemberSchema.findOne({email:`${request.email}`}).then((data)=>{
  
    if((request.role =="Member" )){
  
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

module.exports.checkBasicAdminAndEmp=(request,response,next)=>{
  console.log(request.role);
    if(request.role =="BasicAdmin" || request.role =="Employee" || request.role =="Owner"){
     
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

module.exports.checkAdmin=(request,response,next)=>{
  console.log(request.role);
    if(request.role =="Admin" ){
     
        next();
    }
    else{
      let error =new Error("Not Authorized");
      error.status=403;
      next(error);
  }
}
module.exports.checkBaAdminAndAdminAndEmpforEmp=(request,response,next)=>{

  EmpSchema.findOne({email:`${request.email}`}).then((data)=>{
  if(request.role =="BasicAdmin"||request.role =="Admin"|| request.role =="Owner" ){
      next();
  }
  else if(request.role =="Employee" &&( request.params._id==data._id) ){
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
module.exports.checkBaAdminAndAdminAndEmpforMember=(request,response,next)=>{

  if(request.role =="BasicAdmin"||request.role =="Admin" ||request.role =="Employee"|| request.role =="Owner" ){
          next();
      }
      else{
            let error =new Error("Not Authorized");
            error.status=403;
            next(error);
            
        }

}

module.exports.checkBaAdminAndMemberAndEmp=(request,response,next)=>{

  MemberSchema.findOne({email:`${request.email}`}).then((data)=>{
  
    if((request.role =="BasicAdmin" || request.role =="Employee" || request.role =="Owner")){
  
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
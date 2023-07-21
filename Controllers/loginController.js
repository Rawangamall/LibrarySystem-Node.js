const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const AdminSchema = mongoose.model("Admin");
const EmpSchema = mongoose.model("Employees");
const MemberSchema = mongoose.model("member");

exports.login = async (request, response, next) => {
  const { email, password } = request.body;


  const owner = await AdminSchema.findOne({ email}).select("+password");
  const admin = await AdminSchema.findOne({ email}).select("+password");
  const employee = await EmpSchema.findOne({ email }).select("+password");
  const member = await MemberSchema.findOne({ email}).select("+password");

  // Constants for role names and token expiration
  const roles = {
    admin: "Admin",
    owner: "Owner",
    basicAdmin: "BasicAdmin",
    employee: "Employee",
    member: "Member",
  };
  const tokenExpiration = "7h";

  const sendAuthToken = (role , _id) => {
    const token = jwt.sign(
      {
        _id,
        email,
        password,
        role,
      },
      "OStrack",
      { expiresIn: tokenExpiration }
    );
    response.status(200).json({ message: "Authenticated", token });
  };

  // Role-based authentication
  if (admin && admin.Role === roles.admin) {
    if(!(await admin.correctPassword(password, admin.password))){
      response.status(401).json({ message: "Incorrect email or password"});
     }else{
    sendAuthToken(roles.admin , admin._id);
     }
  } else if (owner) {
    if(!(await owner.correctPassword(password, owner.password))){
      response.status(401).json({ message: "Incorrect email or password"});
     }else{
    sendAuthToken(roles.owner , owner._id);
     }
  } else if (admin && admin.Role === roles.basicAdmin) {
    if(!(await admin.correctPassword(password, admin.password))){
      response.status(401).json({ message: "Incorrect email or password"});
     }else{
    sendAuthToken(roles.basicAdmin , admin._id);
     }
  } else if (employee) {
    if(!(await employee.correctPassword(password, employee.password))){
      response.status(401).json({ message: "Incorrect email or password"});
     }else{
       sendAuthToken(roles.employee , employee._id);
     }
  } else if (member) {
    if(!(await member.correctPassword(password, member.password))){
      response.status(401).json({ message: "Incorrect email or password"});
     }else{
    sendAuthToken(roles.member , member._id);
     }
  } else {
    response.status(401).json({ message: "Not Authenticated" });
  }
};

//}
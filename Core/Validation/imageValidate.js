const multer=require("multer");
const path=require("path");

module.exports=multer({
    fileFilter: function (req, file, cb) {
        if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg") {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits: { fileSize: 1000*1000 },
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,"..","..","images"));
        },
        filename:(req, file, cb)=>{
                cb(null, file.originalname);
        }
    })
}).single("image")
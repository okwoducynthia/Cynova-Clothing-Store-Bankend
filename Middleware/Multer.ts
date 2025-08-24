const multer = require("multer");


// Setup multer storage
const storage = multer.diskStorage({
  filename:function(req:any,file:any,callback:any){
    callback(null,file.originalname);
  }
});


const upload = multer({storage});

module.exports = upload
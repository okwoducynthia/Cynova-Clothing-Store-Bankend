const jwt = require("jsonwebtoken");


const adminAuth = async (req:any, res:any, next:any) => {
  try {
    
    const { token } = req.headers
    if (!token){
      return res.json({
        success:false, 
        message: "Not Authorized Login Again"})
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Server configuration error"
      });
    }

    if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return res.json({
        success:false, 
        message: "Not Authorized Login Again"})
       }
       next()
    }
    
   catch (error) {
    res.json({ 
      success: false,
      message: "Login error"
    })
  }
}



module.exports = adminAuth
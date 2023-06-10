var jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{

let token=req.headers.authorization
if(token){
 try {
 const decoded= jwt.verify(token.split(" ")[1] , "bmi")

 if(decoded){
    req.body.userId=decoded.userId,
    req.body.name=decoded.name
 next()
}else{
    res.send({msg:"SErver Error! Please Login Again "})
}
    
 } catch (error) {
    res.send({"msg":error.message})
 }
}

}

module.exports={
    auth
}
const express=require("express")
const { UserModel } = require("../Model/user.model")
const registerRouter=express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//registerRouter(express.json())

registerRouter.get("/",async(req,res)=>{
   
   const user=await UserModel.find()
    res.status(200).send({user})
})


registerRouter.post("/register",async(req,res)=>{
    try {
       const {name,email,password}=req.body
       bcrypt.hash(password, 3,async(err,hash)=>{
   if(err) throw new Error("hasing not performed")
    let userPass=new UserModel({name,email,password:hash})
await userPass.save()
res.status(200).send({msg:"user registered",user:userPass})
       })

  } catch (error) {
 res.status(400).send({err:error.message})        

}
})


registerRouter.post("/login",async(req,res)=>{
try {
    const {email,password}=req.body
let userDetails=await UserModel.findOne({email:email})
bcrypt.compare(password, userDetails.password, function(err, result) {
   if(result){
    const token=jwt.sign({ userId:userDetails._id,name:userDetails.name}, 'bmi');
    res.status(200).send({token,"msg":"user Authorized",user:userDetails,time:Date})
   }else{
    res.status(200).send({msg:"Wrong Credentials"})
   } 
});



} catch (error) {
    res.status(400).send({err:error.message})        
}})





module.exports={
    registerRouter
}
const express=require("express")
const { CalculateModel } = require("../Model/calculate.model")
const calculateRouter=express.Router()

//registerRouter(express.json())



calculateRouter.get("/profile",async(req,res)=>{ 
   const user=await CalculateModel.find({userId:req.body.userId})
 
  res.send({user})
})



calculateRouter.get("/emi",async(req,res)=>{ 
   const user=await CalculateModel.find({userId:req.body.userId})
    let {loan,tenure,rate}=user[0]
 

   let r=(rate/12/100).toFixed(6)

let EMI=(loan * r * ( 1 + r ) *tenure / ( ( 1 + r )*tenure - 1 )).toFixed(0) 
let interestPay=EMI*tenure    
let totalPay=interestPay+loan
  res.send({user,EMI,interestPay,totalPay })
})

calculateRouter.post("/add",async(req,res)=>{
let {userId,name}=req.body

 
const newUser=new CalculateModel({...req.body,userId,name})
 await newUser.save()
res.status(200).send({msg:"new data added"})

})

module.exports={
    calculateRouter
}
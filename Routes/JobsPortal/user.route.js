const express=require("express")
const { UserModel } = require("../../Model/JobsPortal/user.model")

const UserRouter=express.Router()

UserRouter.get("/",async(req,res)=>{
let filters={}
 let {page}=req.query
 page=parseInt(page) || 1
 if(req.query.role){
    filters.role=req.query.role
     }
     let valuefoSort;
if(req.query.order=="asc"){
  valuefoSort=1
}else if(req.query.order=="desc"){
    valuefoSort=-1
}else{
    valuefoSort=0
}

try {
   
    const total=await UserModel.find(filters).count()
    const maxPage=Math.ceil(total/10)
    page<1?page=1:page
 let skip=(page-1)*10
 const userList=await UserModel.find(filters).sort({"postedAt":valuefoSort}).skip(skip).limit(10)
 res.status(200).send({user:userList,totalPages:maxPage,page})




} catch (error) {
    res.status(400).send({error:error.message})
}
})

UserRouter.post("/add",async(req,res)=>{

   try {
    let newUser=new UserModel(req.body)
     await newUser.save()
     res.status(200).json({user:newUser})


   } catch (error) {
    res.status(400).send({error:error.message})
   } 


})


UserRouter.get("/search",async(req,res)=>{

    let filters={}
    if(req.query.language){
        filters.language={$regex:req.query.language, $options:"i"}
    }
    try {
     const userList=await UserModel.find(filters).skip(0)
     res.status(200).send({user:userList})
    
    
    
    
    } catch (error) {
        res.status(400).send({error})
    }
    
    
})



module.exports={
    UserRouter
}
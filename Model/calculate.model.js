const mongoose=require("mongoose")

const calculateSchema=mongoose.Schema({
userId:{type:String,require:true},
name:{type:String,require:true},
loan:{type:Number,require:true},
rate:{type:Number,require:true},
tenure:{type:Number,require:true},
},{
    versionKey:false
})

const CalculateModel=mongoose.model("calculates",calculateSchema)

module.exports={
    CalculateModel,calculateSchema
}
import mongoose from "mongoose";

const grpSchema=new mongoose.Schema({
    grp_name:{
        type:String,
        required:true,
        unique:true,
    },
    grp_pass:{
        type:Number,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        default:"",
    },
    abstract:{
        type:String,
        default:"",
    },
    members:[
        {
            username:String,
            email:String,
            id:String,
            UIN:String,
        }
    ],
dept:{
    type:String,
}
},{timestamps:true})

const Group=mongoose.models.Group||mongoose.model("Group",grpSchema)
export default Group;
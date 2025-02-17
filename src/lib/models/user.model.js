import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    dept:{
        type:String,
        required:true,
        default:"computer"
    },
    UIN:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    grpId:{
        type:String,
        default:"",
    },
    
},{timestamps:true});

const User=mongoose.models.User || mongoose.model("User",userSchema);

export default User;
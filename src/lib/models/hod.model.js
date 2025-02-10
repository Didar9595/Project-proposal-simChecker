import mongoose from "mongoose";


const hodSchema=new mongoose.Schema({
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
    UID:{
        type:String,
        required:true,
        unique:true,
    },
    dept:{
        type:String,
        required:true,
        default:"computer"
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
    
},{timestamps:true});

const Hod=mongoose.models.Hod || mongoose.model("Hod",hodSchema);

export default Hod;
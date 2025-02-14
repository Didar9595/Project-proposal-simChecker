import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projects: [
      {
        projectTitle: String,
        category: String,
        abstract: String,
      },
    ],
    dept:{
        type:String,
        required:true,
        default:"computer"
    },
    threshold:{
        type:Number,
        required:true,
        default:50,
    },
    uploadedBy:{
      type:String,
      required:true,
    },

  },{timestamps:true});

  const Project=mongoose.models.Project || mongoose.model("Project",projectSchema);

  export default Project;
import Project from "@/lib/models/projects.model";
import {connect} from '@/lib/mogodb/mongoose'

export const DELETE=async(req)=>{
    try {
      await connect()
      const data=await req.json();
      console.log("Data Ki Post ID",data.projectId)
      await Project.findByIdAndDelete(data.projectId)
      return new Response(JSON.stringify({message:"Success"}),{status:200})
    } catch (error) {
      return new Response(JSON.stringify({message:"Failed Deleting the Projects"}),{status:500})
    }
  }
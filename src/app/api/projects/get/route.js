import Project from "@/lib/models/projects.model";
import {connect} from '@/lib/mogodb/mongoose'

export const POST=async(req)=>{
    await connect()
    const data=await req.json();
    try {
        const project=await Project.findOne({dept:data.dept,uploadedBy:data.name})
        if(project){
            return new Response(JSON.stringify({message:"Success",project}),{status:200})
        }
        else{
            return new Response(JSON.stringify({message: "Unauthorized"}),{status:401})
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }),{status:500})
    }
}
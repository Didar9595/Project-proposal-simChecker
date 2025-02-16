import Group from "@/lib/models/group.model";
import {connect} from "@/lib/mogodb/mongoose"

export const POST=async(req)=>{
    await connect();
    const data=await req.json();
    try {
        if(!data.dept){
            return new Response(JSON.stringify({message:"Department is Required"}),{status:400})
        }
        const groups = await Group.find({ dept: data.dept });
        return new Response(JSON.stringify({message:"Success",groups}),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({message:"Error getting the groups"}),{status:500})
    }

}
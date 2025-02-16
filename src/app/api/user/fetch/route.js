import User from "@/lib/models/user.model";
import {connect} from "@/lib/mogodb/mongoose"

export const POST=async(req)=>{
    await connect()
    const data=await req.json();
    try {
        const students=await User.find({dept:data.dept})
        if(!students){
            return new Response(JSON.stringify({message:"No student found"}),{status:401})
        }
        return new Response(JSON.stringify({message:"Students found",students}),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error getting the users"}), { status: 500 });
    }
}
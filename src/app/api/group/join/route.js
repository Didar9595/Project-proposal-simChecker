import User from "@/lib/models/user.model";
import Group from "@/lib/models/group.model";
import {connect} from '@/lib/mogodb/mongoose'

export const POST=async(req)=>{
    await connect();
    const data=await req.json()
    try {
        const group = await Group.findById(data.grpid);
    if (!group) {
      return new Response(JSON.stringify({ message: "Group not found" }), { status: 404 });
    }
    if (group && group.grp_pass !== parseInt(data.pass)) {
        return new Response(JSON.stringify({ message: "Incorrect password" }), { status: 401 });
    }
    const user = await User.findById(data.userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    if(group && group.grp_pass===parseInt(data.pass)){
        let update=await Group.findByIdAndUpdate(data.grpid, {
            $push: { members: { username: data.name, email: data.email,id: data.userId, UIN: data.UIN } }
          });

        if(update){
            let done=await User.findByIdAndUpdate(data.userId, { grpId: data.grpid });
            if(done){
                return new Response(JSON.stringify({ message: "User successfully joined the group" }), { status: 200 });
            }
            return new Response(JSON.stringify({message:"User is not updated"}),{status:400})
        }
        return new Response(JSON.stringify({message:"Group is not updated"}),{status:400})

    }
    return new Response(JSON.stringify({message:"Something went wrong"}),{status:400})
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
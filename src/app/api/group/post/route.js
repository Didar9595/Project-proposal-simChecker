import Group from "@/lib/models/group.model";
import User from "@/lib/models/user.model";
import { connect } from '@/lib/mogodb/mongoose'

export const POST = async (req) => {
    try {
        await connect();
        const data = await req.json()
        const existingGroup = await Group.findOne({
            grp_name: data.groupName,
            dept: data.dept
        });
        if (existingGroup) {
            return new Response(JSON.stringify({ message: "Group Name Already Exists in the Department..." }), { status: 400 })
        }
        const newGroup = await Group.create({ grp_name: data.groupName, grp_pass: data.groupPass, title: '', abstract: '', members: data.members, dept: data.dept })
        await newGroup.save()

        if (newGroup) {
            let update_user_profile = await User.updateOne({
                _id: data.members[0].id
            }
                , {
                    $set: { grpId: newGroup._id }
                })
            if (update_user_profile) {
                return new Response(JSON.stringify({ message: "Success", newGroup }), { status: 200 })
            }
        }
        
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error creating a group" }), { status: 500 })
    }
}
import Hod from "@/lib/models/hod.model";
import {connect} from '@/lib/mogodb/mongoose'
import jwt from "jsonwebtoken"


export const POST = async (req) => {
    try {
        await connect()
        const data = await req.json();
        const {email,UID}=data;
        const user=await Hod.findOne({email})
        if(!user){
            return new Response(JSON.stringify({message:"HoD does not exists!!!"}),{status:400})
        }
        if(user.UID!=UID){
            return new Response(JSON.stringify({message:"Invalid UID!!!"}),{status:400})
        }

        //if erverything is fine then create a token
        const tokenData={
            id:user._id,
            UID:user.UID,
        }
        const token=jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        const response=new Response(JSON.stringify({message:"Login Successful",token}),{status:200})
        response.headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
        return response
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error Login the HoD", error: error.message }), { status: 500 });
    }
}
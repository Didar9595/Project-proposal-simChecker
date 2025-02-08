import User from "@/lib/models/user.model"
import { connect } from "@/lib/mogodb/mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const POST = async (req) => {
    try {
        await connect()
        const data = await req.json();
        const {email,password}=data;
        const user=await User.findOne({email})
        if(!user){
            return new Response(JSON.stringify({message:"User does not exists!!!"}),{status:400})
        }
        const correctPass=await bcrypt.compare(password,user.password)
        if(!correctPass){
            return new Response(JSON.stringify({message:"Invalid Password!!!"}),{status:400})
        }

        //if erverything is fine then create a token
        const tokenData={
            id:user._id,
            email:user.email,
        }
        const token=jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        const response=new Response(JSON.stringify({message:"Login Successful",token}),{status:200})
        response.headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
        return response
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error Login the user", error: error.message }), { status: 500 });
    }
}
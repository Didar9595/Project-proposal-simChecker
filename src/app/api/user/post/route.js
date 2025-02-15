import User from "@/lib/models/user.model"
import { connect } from "@/lib/mogodb/mongoose"
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    try {
        await connect()
        const data = await req.json();
        const existingUser = await User.findOne({
            $or: [{ username: data.username }, { email: data.email },{UIN:data.UIN}],
        });

        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "Username or Email already exists" }),
                { status: 400 }
            );
        }


        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = await User.create({ username: data.username, email: data.email, password: hashedPassword,dept:data.dept,UIN:data.UIN, isAdmin: false ,grpId:""})
        await newUser.save()
        return new Response(JSON.stringify(newUser), { status: 200 })
    } catch (error) {
       
        return new Response(JSON.stringify({ message: "Error registering the user", error: error.message }), { status: 500 });
    }
}
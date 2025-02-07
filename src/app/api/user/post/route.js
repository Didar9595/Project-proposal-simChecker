import User from "@/lib/models/user.model"
import { connect } from "@/lib/mogodb/mongoose"
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    try {
        await connect()
        const data = await req.json();
        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = await User.create({ username: data.username, email: data.email, password: hashedPassword, isAdmin: false })
        await newUser.save()
        return new Response(JSON.stringify(newUser), { status: 200 })
    } catch (error) {
        return new Response("Error Registering the user", { status: 500 })
    }
}
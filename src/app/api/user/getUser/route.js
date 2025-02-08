import User from "@/lib/models/user.model"
import { connect } from "@/lib/mogodb/mongoose"
import jwt from "jsonwebtoken"

export async function GET(req) {
    const authHeader = req.headers.get("authorization"); // Get the header
    const token = authHeader?.split(" ")[1]; // Split and extract the token
    if (!token) {
        return new Response(JSON.stringify({ message: "Token is not found" }), { status: 401 })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        await connect();
        const user = await User.findById(decoded.id)
        if (!user) {
            return new Response(JSON.stringify({ message: "User Not found" }), { status: 404 })
        }
        user.password = undefined;
        return new Response(JSON.stringify({ message: "Success", user }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error getting the user", error: error.message }), { status: 500 });
    }
}
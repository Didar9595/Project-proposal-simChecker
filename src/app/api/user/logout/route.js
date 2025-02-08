export const GET=async(req)=>{
    try {
        return new Response(JSON.stringify({ message: "Logout Successful" }), {
            status: 200,
            headers: {
                "Set-Cookie": `token=; HttpOnly; Path=/; Expires=${new Date(0).toUTCString()};`,
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return Response(JSON.stringify({ message: "Error Loging out the user", error: error.message }), { status: 500 });  
  }
}
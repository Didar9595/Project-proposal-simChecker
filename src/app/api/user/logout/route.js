export const GET=async(req)=>{
    try {
        return new Response(JSON.stringify({message:"Logout Success"}),{status:200})
    } catch (error) {
        return Response(JSON.stringify({ message: "Error Loging out the user", error: error.message }), { status: 500 });  
  }
}
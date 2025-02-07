import mongoose from 'mongoose'

let initialize=false;
export const connect=async()=>{
    mongoose.set("strictQuery",true);
    if(initialize){
        console.log("Already Connected to Database")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'project-proposal-checker',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connected to MongoDB!!!")
        initialize=true;

    } catch (error) {
        console.log("Error in Connecting toDB",error);
    }
}
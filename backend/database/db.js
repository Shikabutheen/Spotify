import mongoose from "mongoose";

const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"SpotifyClone"

        });
        console.log("Mongo DB Connected");
        
    }
    catch(err){
        console.log(err);
        
    }
}

export default connectdb
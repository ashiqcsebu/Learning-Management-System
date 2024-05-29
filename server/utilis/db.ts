import mongoose from "mongoose";
require('dotenv').config();
const dbUrl = process.env.DB_URL || '' ;

const connectDB =async () =>{
    try {
        await mongoose.connect(dbUrl).then((data:any)=>{
            //console.log(`Database Connected with host ${data.connection.host}`);

        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB,5000)
        
    }
}
export default connectDB;
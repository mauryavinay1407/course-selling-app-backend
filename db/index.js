const mongoose=require('mongoose');
// const dotenv=require('dotenv')
// dotenv.config({path:"./.env"})

const connectDB=async()=>{
 try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("DB is connected");
 } catch (error) {
    console.log("Database connection failed!!!",error);
 }
}

module.exports={connectDB};
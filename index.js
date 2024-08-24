const {app}=require("./app");
const {connectDB}=require('./db/index');
const dotenv=require('dotenv')
dotenv.config({path:"./.env"})

const PORT=process.env.PORT||4001
connectDB()
.then(()=>{
    app.listen(PORT,()=>console.log(`Server is working at http://localhost:${PORT}`));
})
.catch((err)=>{
    console.log("MONGO DB connection is failed!!!",err);
})

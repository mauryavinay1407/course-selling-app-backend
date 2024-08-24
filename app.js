const express=require('express');
const userRouter=require('./routes/user.routes')
const adminRouter=require('./routes/admin.routes')
const courseRouter=require('./routes/course.routes')
const cookieParser=require('cookie-parser')
const app=express();

app.use(express.json());
app.use(cookieParser());



//all routes

app.use('/api/v1/users',userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/course',courseRouter)


module.exports={app};
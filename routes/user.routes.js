const express=require('express');
const router=express.Router();
const {verifyjwt}=require("../middlewares/auth.middleware")
const {signupUser,loginUser,logoutUser}=require('../controllers/user.controller')

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/logout',verifyjwt,logoutUser)



module.exports=router;
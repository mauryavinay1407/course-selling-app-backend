const express=require("express");
const router=express.Router();
const {signupAdmin,signinAdmin}=require("../controllers/admin.controller");

//all routes for admin
router.post('/signup',signupAdmin);
router.post('/signin',signinAdmin);

module.exports= router;
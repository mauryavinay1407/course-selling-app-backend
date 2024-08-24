const {asyncHandler}=require("../utils/asyncHandler");
const {adminFormat}=require("../utils/zodValidation");
const {Admin}=require("../models/admin.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

// Signup route for admin

const signupAdmin = asyncHandler(async (req, res) => {

    //getting data from body

    const {firstName,lastName,email,password}=req.body;
    const obj=req.body;

    // Validate the request body format
    const {success}=adminFormat.safeParse(obj);
    if(!success){
        return res.status(411).json({
            message:"Please enter the data in correct format"
        })
    }

    // Check whether admin have not sent any blank field

    if([firstName,lastName,email,password].some((field) => field?.trim() === ""))
    throw new Error("Please enter all input fields");

    // Check whether admin already exists

    const isAdminExist=await Admin.findOne({email:email});
    if(!isAdminExist)
     throw new Error("Admin already exists")

     // hashing the password
     const encryptedPassword=await bcrypt.hash(password,10);

     //saving the admin in database
     const savedAdmin=await Admin.create({
        firstName,
        lastName,
        email,
        password:encryptedPassword
     })

     savedAdmin.password=undefined;
     res.status(200).json(savedAdmin)

});

const signinAdmin = asyncHandler(async (req, res) => {
    // Getting data from body
    const { email, password } = req.body;
    const obj = req.body;

    // Validate the request body format
    const { success } = adminFormat.safeParse(obj);
    if (!success) {
        return res.status(411).json({
            message: "Please enter the data in the correct format"
        });
    }

    // Check whether both email and password fields are provided
    if ([email, password].some((field) => field?.trim() === ""))
        throw new Error("Please enter both email and password");

    // Check whether the admin exists in the database
    const admin = await Admin.findOne({ email: email });
    if (!admin)
        throw new Error("Admin not found, please sign up first");

    // Check whether the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect)
        throw new Error("Incorrect password");

    // Generating token for session
    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    });

    // Setting the cookie with the token
    const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
    };

    res.status(200).cookie("token", token, options).json({
        msg: "Successfully logged in"
    });
});




module.exports={signupAdmin,signinAdmin};
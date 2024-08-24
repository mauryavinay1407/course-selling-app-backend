const { asyncHandler } = require("../utils/asyncHandler");
const { userFormat } = require("../utils/zodValidation");
const { User } = require("../models/user.model");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


// Signup route for user
const signupUser = asyncHandler(async (req, res) => {

  //getting data from body
  const { email, password, firstName, lastName} = req.body;
  const obj = req.body;

  //validate the request body format
  const validateData =userFormat.safeParse(obj);
  if (!validateData.success) {
    return res.status(411).json({
      message: "Please enter the data in correct format",
      errors:validateData.error
    });
  }
  
  //checking whether user have not sent any blank field
  if (
    [email, password, firstName, lastName].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new Error("Please enter all input fields");
  }
  //checking whether user already registered with this username

  const isUserExist = await User.findOne({ email:email});
  if (isUserExist)
    throw new Error("User with this username already exist, try login");

    // hashing the password
    const encryptedPassword=await bcrypt.hash(password,10);

    // Saving the user's data in database
    const savedUser=await User.create({
      firstName,
      lastName,
      email,
      password:encryptedPassword
    })
    savedUser.password=undefined;
    res.status(200).json(savedUser);
});

const loginUser=asyncHandler(async(req,res)=>{
  //Extracting the data from body
 const {email,password}= req.body;

 //Checking whether both email and password exist or not
 if(!email || !password)
 throw new Error("Email and password both field are required");

 // Finding whether user exist in database or not
 const user=await User.findOne({email:email});
  if(!user)
  throw new Error("User not exists,kindly signup first")
  
  //Checking whether password is correct or not
  const isPasswordCorrect= await bcrypt.compare(password,user.password);
  if(!isPasswordCorrect)
   throw new Error("Incorrect Password!!!")
   
  //Generating token for session
   const token=jwt.sign({id:user._id},process.env.SECRET_KEY);


   // setting the cookies
   // new date(Date.now() + days * hours * minutes * seconds * miliseconds)
   const options={
    expire: new Date(Date.now()+ 1 * 24 * 60 * 60 *1000),
    httpOnly:true,
    secure:true
   }
  res.status(200).cookie("token",token,options);

  res.status(201).json({
    msg:"Successfully logged in"
  })

});

const logoutUser=asyncHandler(async(req,res)=>{

  const options={
    httpOnly:true,
    secure:false
  }

  res.status(201).clearCookie("token",options).json({
    msg:"Logged out"
  });


})




module.exports = { signupUser,loginUser,logoutUser};

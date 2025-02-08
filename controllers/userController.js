const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");
//@desc Register als users
//@route POST /api/users/register
//@acess contacts
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already Available!");
    }
    //Hashed Password to identify user uniquely
    const hPassword=await bcrypt.hash(password,10);
    console.log("Hasshed Password",hPassword);
    const user=await User.create({
        username,
        email,
        password: hPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({ _id:user.id, email:user.email});
    }else{
        res.status(400);
        throw new Error("User is not valid!");
    }
    res.json({message:"Resgister the user"});
});

//@desc login als users
//@route POST /api/users/login
//@acess contacts
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"20m"
        }
    );
    res.status(200).json({accessToken});
    } else{
        res.status(401);
        throw new Error("Email or Password is not valid!");
    }
});

//@desc Current info of all users
//@route POST /api/users/register
//@acess contacts
const currUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});



module.exports= {registerUser,loginUser,currUser} ;
const { timeStamp } = require("console");
const mongoose=require("mongoose");
const { type } = require("os");

const UserSchema=mongoose.Schema({
    username: {
        type:String,
        required: [true,"Please add the username"],
    },
    email: {
        type:String,
        required: [true,"Please add the email"],
        unique:[true,"Email already existes!"],
    },
    password: {
        type:String,
        required: [true,"Please add the password"],
    },
},{
    timeStamps:true
});

module.exports=mongoose.model("User",UserSchema);
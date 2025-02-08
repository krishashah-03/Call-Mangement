const { timeStamp } = require("console");
const mongoose=require("mongoose");
const { type } = require("os");

const contactSchema= mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type:String,
        required: [true,"Please add your contact name"],
    },
    email:{
        type:String,
        required: [true,"Please add your contact mail"],
    },
    phone:{
        type:String,
        required: [true,"Please add your contact no"],
    },
},{
    timeStamps: true,
});

module.exports=mongoose.model("Contact",contactSchema);
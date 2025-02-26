const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModels");
//@desc Get all contacts
//@route GET /api/contacts
//@acess contacts private
const getContact=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({userid:req.user.id});
    res.status(200).json(contacts);
});

//@desc Post all contacts
//@route Post /api/contacts
//@acess contacts private
const postContaccts=asyncHandler(async(req,res)=>{
    console.log("The request body is",req.body);
    const {name,email,phone}= req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are required!");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        userid:req.user.id,
    });
    res.status(201).json(contact);
});

//@desc Get contacts by id
//@route GET /api/contacts/id
//@acess contacts private
const getidContacts=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).json(contact);
});

//@desc update contacts by id
//@route POST /api/contacts/id
//@acess contacts private
const putContacts=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contact.userid.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have prmission to update other person contacts");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delete contacts by id
//@route DELETE /api/contacts/id
//@acess contacts private
const deleteContacts=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contact.userid.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have prmission to update other person contacts");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports={getContact,postContaccts,getidContacts,putContacts,deleteContacts};
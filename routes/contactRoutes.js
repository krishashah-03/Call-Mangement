 const express=require("express");
 const router=express.Router();
const {getContact,postContaccts,getidContacts,putContacts,deleteContacts}=require("../controllers/contactControllers");
const validateToken=require("../middleware/validateToken");

router.use(validateToken);

router.route("/").get(getContact);

router.route("/").post(postContaccts);

router.route("/:id").get(getidContacts);

router.route("/:id").put(putContacts);

router.route("/:id").delete(deleteContacts);

module.exports=router;
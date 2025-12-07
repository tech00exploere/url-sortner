const express=require("express");
const router=express.Router();
const urlController=require("../controller/url");
router.get("/",urlController.home);
router.post("/",urlController.createShort);
router.get("/:shortId",urlController.redirect);
module.exports=router;

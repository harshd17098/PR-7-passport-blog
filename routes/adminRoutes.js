const express=require("express")
const Admin =require("../model/adminModel")
const { addAdminPage, addNewAdmin, homePage } = require("../controller/adminController")
const adminRoutes=express.Router()
const passport = require('passport');


adminRoutes.get("/",passport.validateUser,homePage)
adminRoutes.get("/adminForm",passport.validateUser,addAdminPage);
adminRoutes.post("/addAdmin", Admin.uploadImageAdmin, addNewAdmin);



module.exports = adminRoutes;
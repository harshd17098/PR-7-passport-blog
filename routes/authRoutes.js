const express=require("express")
const Admin =require("../model/adminModel");
const { loginPage, logout, checkedLogin } = require("../controller/authController");
const authroutes=express.Router();
const passport = require('passport');


authroutes.get("/",loginPage)
authroutes.get("/logout", logout);
authroutes.post("/checkedlogin", passport.authenticate('local', {failureRedirect: "/"}),checkedLogin)




module.exports=authroutes;
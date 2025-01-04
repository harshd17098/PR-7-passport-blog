const express=require("express")
const Blog =require("../model/blogModel");
const { addBlogPage,addNewBlog,viewAllBlog,blogDelete,editBlogPage, updateBlog,detailBlogPage } = require("../controller/blogController");
const blogRoutes=express.Router()
const passport = require('passport');



blogRoutes.get("/blogForm",passport.validateUser,addBlogPage);
blogRoutes.post("/addBlog", Blog.uploadImageBlog, addNewBlog);
blogRoutes.get("/viewBlog",passport.validateUser, viewAllBlog);
blogRoutes.get('/delete/:id',blogDelete);
blogRoutes.get("/editBlog/:id",passport.validateUser,editBlogPage)
blogRoutes.post("/updateBlog/:id", Blog.uploadImageBlog, updateBlog);
blogRoutes.get("/detailBlog/:id",passport.validateUser,detailBlogPage)








module.exports = blogRoutes;
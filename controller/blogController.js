const Blog = require('../model/blogModel');
const Admin = require("../model/adminModel")
const path = require('path');
const fs = require('fs');


exports.addBlogPage = async (req, res) => {


        return res.render('blogs/blogForm')
};
exports.addNewBlog = async (req, res) => {


    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/Blog/${req.file.filename}`
        }
        req.body.blogImg = imagePath;
        console.log(req.body);
        
        let fullName = req.user.firstname + " " + req.user.lastname
        req.body.author = fullName
        req.body.authorEmail = req.user.email

        let newBlog = await Blog.create(req.body);
        if (newBlog) {
            console.log("New Blog Added...");
            return res.redirect("back")
        } else {
            console.log("Somthing Went Wrong...");
            return res.redirect("back")
        }

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }

};


exports.viewAllBlog = async (req, res) => {


    let allblog;
    const category = req.query.category;
    if (category && category !== 'All') {
        allblog = await Blog.find({ category })
    }
    else {
        allblog = await Blog.find()
    }

    if (req.isAuthenticated()) {
        return res.render('blogs/viewBlog', { blog: allblog });
    }
    else {
        return res.redirect("/")
    }




};

exports.blogDelete = async (req, res) => {

    try {
        let rec = await Blog.findById(req.params.id);
        console.log(rec);

        if (rec) {
            if (rec.blogImg) {
                let imagepath = path.join(__dirname, "..", rec.blogImg);
                await fs.unlinkSync(imagepath);
                await Blog.findByIdAndDelete(req.params.id);
                return res.redirect('back');
            } else {
                await Blog.findByIdAndDelete(req.params.id);
                console.log("Delete Success");
                return res.redirect('back');
            }
        }

    } catch (error) {
        console.log('Somthing Went Wrong');
        return res.redirect('back');
    }

};

exports.editBlogPage = async (req, res) => {

    try {


        let record = await Blog.findById(req.params.id);
        if (record) {
            if (req.isAuthenticated()) {
                return res.render('blogs/blogEdit', { editBlog: record });
            }
            else {

                return res.redirect("/");
            }
        } else {
            return res.redirect('back');
        }
    }
    catch (error) {
        return res.redirect('back');
    }

};
exports.updateBlog = async (req, res) => {

    try {
        let record = await Blog.findById(req.params.id);
        if (record) {
            if (req.file) {
                let imagePath = record.blogImg;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        await fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Missing....");
                    }
                }
                let newImagepath = `/uploads/blog/${req.file.filename}`;
                req.body.blogImg = newImagepath
            } else {
                req.body.blogImg = record.blogImg
            }
            await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Update Record Success...");
            return res.redirect("/blog/viewBlog")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(err);
        return res.redirect('back');
    }


};

exports.detailBlogPage = async (req, res) => {
    try {

        let record = await Blog.findById(req.params.id);
        if (record) {
          
                return res.render('blogs/detailBlog', { detailBlog: record });
        }
        else {
            return res.redirect('back');
        }
    }
    catch (error) {
        return res.redirect('back');
    }

};
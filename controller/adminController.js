const path = require('path');
const Admin = require('../model/adminModel');
const fs = require('fs');

exports.homePage=async(req,res)=>{
    try {
            return res.render('home')
      
    } catch (error) {
        console.log(err);
            return res.redirect('back');
    }
   

}
exports.addAdminPage = async (req, res) => {
   
        try {
            return res.render('admins/adminForm')
        } catch (error) {
            console.log(err);
            return res.redirect('back');
        }



};

exports.addNewAdmin = async (req, res) => {
  
        try {
            let imagePath = "";
            if (req.file) {
                imagePath = `/uploads/Admins/${req.file.filename}`
            }
            req.body.adminImg = imagePath;
            console.log(req.body);


            let newAdmin = await Admin.create(req.body);
            if (newAdmin) {
                console.log("New Admin Added...");
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
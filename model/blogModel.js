const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const blogSchema = mongoose.Schema({
    category: {
        type: String,
    },
    title: {
        type: String
    },
    depreciation: {
        type: String
    },
    author:{
        type:String
    },
    authorEmail:{
        type:String
    },
    dates: {
        type: String
    },
    times: {
        type: String
    },
    blogImg: {
        type: String
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/blog"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});

blogSchema.statics.uploadImageBlog = multer({storage: storage}).single('blogImg');

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
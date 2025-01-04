const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const adminSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contactnb: {
        type: String
    },
    adminImg: {
        type: String
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/admin"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});

adminSchema.statics.uploadImageAdmin = multer({storage: storage}).single('adminImg');

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
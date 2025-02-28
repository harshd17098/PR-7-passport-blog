const Admin = require('../model/adminModel');



exports.loginPage = (req, res) => {

    if (req.isAuthenticated()) {
        return res.redirect("/admin");
    }
    else{
        return res.render("loginForm");
    }


};

exports.checkedLogin = async (req, res) => {
    try {
        req.flash('success', 'Login Success...')
        return res.redirect("/admin")
    } catch (error) {
        console.log(error);
        return res.redirect("/")
    }
}

exports.logout = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("/");
    })
};

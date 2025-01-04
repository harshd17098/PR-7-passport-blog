const express = require('express');
const port = 2289;
const path = require('path');
const app = express();
const db = require("./config/dbConnection");
const session = require('express-session');
const passport = require("passport");
const localSt = require("./config/passportlocalstrategy");



app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname,)));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/views", express.static(path.join(__dirname, "views")));



app.use(express.urlencoded())

app.use(session({
    name: 'blogPassport',
    secret: "blogPassport",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 5000 * 60 * 60 * 60,
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setLocalUser)



app.use("/", require("./routes/authRoutes"))
app.use("/admin", require("./routes/adminRoutes"))
app.use("/blog", require("./routes/blogRoutes"))



app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
});
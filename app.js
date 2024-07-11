//jshint esversion:6
require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
  });

  userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

  const user = mongoose.model('User', userSchema);

app.get("/", (req, res)=>{
    res.render("home")
});

app.get("/login", (req, res)=>{
    res.render("login")
});

app.get("/register", (req, res)=>{
    res.render("register")
});


app.post("/register", (req, res)=>{

    const newUser = new user({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save();

    res.render("secrets")
})


app.post("/login", (req, res)=>{
const username = req.body.username;
const password = req.body.password;

user.findOne({ email: username })
.then(foundUser =>{
    if(foundUser.password  === password){
        res.render("secrets")
    } else {
        res.send("incorrect password");
    }
})
})


app.listen(3000, ()=>{
    console.log("Server works at 3000")
})
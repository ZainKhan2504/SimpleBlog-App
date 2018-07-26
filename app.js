// Required Packages
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

// Connect to DB
mongoose.connect("mongodb://localhost/simple-blog");

// Uses Express Essentials
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set(express.static("public"));

// build Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

// Compile Schema into Model
var Blog = mongoose.model("Blog", blogSchema);

// =================
// Restfull Routes
// =================

// landing Page
app.get("/", function(req, res){
    res.redirect("/blogs");
})

// blog Page
app.get("/blogs", function(req, res){
    // Get all Blogs from DB
    Blog.find({}, function(err, blogs){
       if (err) {
           console.log("ERROR!");
           console.log(err);
       } else {
            res.render("index",{blogs: blogs});
       } 
    });
})

// Connect to server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("BlogApp has Started!");
});
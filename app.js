// Required Packages
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

// Connect to DB
mongoose.connect("mongodb://localhost/simple-blog");

// App Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

// Index Page
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

// new route
app.get("/blogs/new", function(req, res){
    res.render("new");
})

// create route
app.post("/blogs", function(req, res){
    // create blog
    Blog.create(req.body.blog, function (err, blog) {
        if (err) {
            res.render("new");
        } else {
            // then redirect to index
            res.redirect("/blogs");
        }
    });
});

// Show route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function (err, blog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: blog});
        }     
    });
});

// Edit route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function (err, blog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: blog});
        }     
    });
});

// Update route
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, blog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }     
    });
});

// Connect to server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("BlogApp has Started!");
});
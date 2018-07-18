var express = require("express"),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
 
// APP CONFIG 
mongoose.connect("mongodb://localhost:27017/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// Define Blog Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

// Generate Blog model
var Blog = mongoose.model("Blog", blogSchema);


// Blog.create( {
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1505333365657-364654b0625b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c7c4a36c095af5ff8eb840797155913&auto=format&fit=crop&w=500&q=60",
//     body: "BLOG BLOG BLOG BLOG"
// });

// RESTFUL ROUTES

// "/" route - redirect to INDEX route
app.get("/", function(req, res) {
    res.redirect("/blogs");
});


// INDEX route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
       if (err) {
           console.log("Error!!! : " + err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});

// NEW route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE route
app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW route
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, blog) {
       if (err) {
           res.redirect("/blogs");
       } else
       {
           res.render("show", {blog: blog});
       }
   });
});

// EDIT route
app.get("/blogs/:id/edit", function(req, res) {
   Blog.findById(req.params.id, function(err, blog) {
       if (err) {
           res.redirect("/blogs");
       } else
       {
           res.render("edit", {blog: blog});
       }
   }); 
});


// UPDATE route - usees method-override package to pass put request from ejs page
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
        
    });
});

// DELETE route - uses method override package to pass delete request from ejs page 
app.delete("/blogs/:id", function(req, res) {
   Blog.findByIdAndRemove(req.params.id, function(err){
      if (err) {
          res.redirect("/blogs");
      } else {
           res.redirect("/blogs");
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SERVER IS RUNNING!");
});

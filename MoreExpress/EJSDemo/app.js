var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

// "/"
app.get("/", function(req, res) {
    res.render("home");
});


// "/fallinlovewith/:thing"
app.get("/fallinlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

// "/posts"
app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Rabid Bunnies", author: "Tim the Enchanter"},
        {title: "Holy Grails and the Knights of the Round Table", author: "Arthur"},
    ];
    
    res.render("posts", {posts: posts});
      
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is listening!!!");
});